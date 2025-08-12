
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
    const [currency, setCurrencyState] = useState<Currency>('USD');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        try {
            const storedCurrency = localStorage.getItem('currency') as Currency | null;
            if (storedCurrency && currencySymbols[storedCurrency]) {
                setCurrencyState(storedCurrency);
            }
        } catch (error) {
            console.error("Could not access localStorage:", error);
        }
    }, []);

    const setCurrency = (newCurrency: Currency) => {
        if (currencySymbols[newCurrency]) {
            setCurrencyState(newCurrency);
            try {
                localStorage.setItem('currency', newCurrency);
            } catch (error) {
                 console.error("Could not access localStorage:", error);
            }
        }
    };
    
    // We need to delay rendering of the children until the client-side has mounted
    // and we have had a chance to read the currency from localStorage.
    if (!isMounted) {
        return null;
    }

    const currencySymbol = currencySymbols[currency];

    return (
        <CurrencyContext.Provider value={{ currency, currencySymbol, setCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );
};
