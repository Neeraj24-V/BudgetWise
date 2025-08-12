
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
        // @ts-ignore
        const userCurrency = session?.user?.currency;
        if (userCurrency && currencySymbols[userCurrency]) {
            setCurrency(userCurrency);
        }
    }, [session]);
    
    const currencySymbol = currencySymbols[currency] || '$';

    return (
        <CurrencyContext.Provider value={{ currency, currencySymbol, setCurrency, isLoading }}>
            {!isLoading && children}
        </CurrencyContext.Provider>
    );
};
