
"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';

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
    isLoading: false,
});

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
    const [currency, setCurrency] = useState<Currency>('USD');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // In a real app, you might load this from localStorage or an API
        setCurrency('USD');
        setIsLoading(false);
    }, []);
    
    const currencySymbol = currencySymbols[currency] || '$';

    return (
        <CurrencyContext.Provider value={{ currency, currencySymbol, setCurrency, isLoading }}>
            {!isLoading && children}
        </CurrencyContext.Provider>
    );
};
