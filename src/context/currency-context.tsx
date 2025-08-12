
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
    isLoading: true,
});

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
    const [currency, setCurrency] = useState<Currency>('USD');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // This code now runs only on the client
        try {
            const savedCurrency = localStorage.getItem('currency') as Currency;
            if (savedCurrency && currencySymbols[savedCurrency]) {
                setCurrency(savedCurrency);
            }
        } catch (error) {
            console.error("Could not access localStorage. Defaulting to USD.");
        }
        setIsLoading(false);
    }, []);

    const handleSetCurrency = (newCurrency: Currency) => {
        if (currencySymbols[newCurrency]) {
            setCurrency(newCurrency);
             try {
                localStorage.setItem('currency', newCurrency);
            } catch (error) {
                console.error("Could not access localStorage to save currency preference.");
            }
        }
    };
    
    const currencySymbol = currencySymbols[currency];

    return (
        <CurrencyContext.Provider value={{ currency, currencySymbol, setCurrency: handleSetCurrency, isLoading }}>
            {!isLoading && children}
        </CurrencyContext.Provider>
    );
};
