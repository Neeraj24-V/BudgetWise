
"use client";

import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { AuthContext } from './auth-context';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'INR';
type CurrencySymbol = '$' | '€' | '£' | '¥' | '₹';

interface CurrencyContextType {
    currency: Currency;
    currencySymbol: CurrencySymbol;
    setCurrency: (currency: Currency) => void;
    isLoading: boolean;
}

const currencySymbols: { [key in Currency]: CurrencySymbol } = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    INR: '₹'
};

export const CurrencyContext = createContext<CurrencyContextType>({
    currency: 'USD',
    currencySymbol: '$',
    setCurrency: () => {},
    isLoading: true,
});

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
    const [currency, setCurrency] = useState<Currency>('USD');
    const [isLoading, setIsLoading] = useState(true);
    const { user, isLoading: isAuthLoading } = useContext(AuthContext);

    useEffect(() => {
        if (!isAuthLoading) {
            if (user && user.currency) {
                setCurrency(user.currency as Currency);
            } else {
                // Default for guests or users without a preference set
                setCurrency('USD');
            }
            setIsLoading(false);
        }
    }, [user, isAuthLoading]);
    
    const currencySymbol = currencySymbols[currency] || '$';

    return (
        <CurrencyContext.Provider value={{ currency, currencySymbol, setCurrency, isLoading }}>
            {!isLoading && children}
        </CurrencyContext.Provider>
    );
};
