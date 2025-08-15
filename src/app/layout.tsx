
import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { CurrencyProvider } from "@/context/currency-context";
import { AuthProvider } from "@/context/auth-context";
import { MobileDrawer } from "@/components/mobile-drawer";


const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
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
      <body className={cn("min-h-screen bg-background font-sans antialiased", orbitron.variable)}>
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
                  <MobileDrawer />
                </CurrencyProvider>
            </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
