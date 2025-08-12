
"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'INR';
type CurrencySymbol = '$' | '€' | '£' | '¥' | '₹';

interface CurrencyContextType {
    currency: Currency;
    currencySymbol: CurrencySymbol;
    setCurrency: (currency: Currency) => void;
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
});

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
    const [currency, setCurrency] = useState<Currency>('USD');
    const [currencySymbol, setCurrencySymbol] = useState<CurrencySymbol>('$');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const storedCurrency = localStorage.getItem('currency') as Currency | null;
        if (storedCurrency && currencySymbols[storedCurrency]) {
            setCurrency(storedCurrency);
            setCurrencySymbol(currencySymbols[storedCurrency]);
        }
    }, []);

    const handleSetCurrency = (newCurrency: Currency) => {
        if (currencySymbols[newCurrency]) {
            setCurrency(newCurrency);
            setCurrencySymbol(currencySymbols[newCurrency]);
            localStorage.setItem('currency', newCurrency);
        }
    };

    if (!isMounted) {
        return null;
    }

    return (
        <CurrencyContext.Provider value={{ currency, currencySymbol, setCurrency: handleSetCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );
};
