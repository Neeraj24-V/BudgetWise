
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { CurrencyProvider } from "@/context/currency-context";
import { AuthProvider } from "@/context/auth-context";


const anurati = localFont({
  src: '../../public/fonts/anurati.otf',
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "BudgetWise - The Smart Expense Tracker",
  description: "BudgetWise is an intelligent expense tracker that uses AI to help you save smarter, achieve your goals, and build a better financial future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", anurati.variable)}>
        <AuthProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                <CurrencyProvider>
                  <Header />
                  {children}
                </CurrencyProvider>
            </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
