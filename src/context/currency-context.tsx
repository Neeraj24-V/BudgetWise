
"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

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
    const { data: session, status } = useSession();
    const [currency, setCurrency] = useState<Currency>('USD');
    const isLoading = status === 'loading';

    useEffect(() => {
        if (status === 'authenticated' && session?.user) {
            const userCurrency = (session.user as any).currency;
            if (userCurrency && currencySymbols[userCurrency]) {
                setCurrency(userCurrency);
            }
        }
    }, [session, status]);

    const handleSetCurrency = (newCurrency: Currency) => {
        if (currencySymbols[newCurrency]) {
            setCurrency(newCurrency);
            // The actual database update is now handled in the SettingsPage
        }
    };
    
    const currencySymbol = currencySymbols[currency];

    return (
        <CurrencyContext.Provider value={{ currency, currencySymbol, setCurrency: handleSetCurrency, isLoading }}>
            {!isLoading && children}
        </CurrencyContext.Provider>
    );
};
