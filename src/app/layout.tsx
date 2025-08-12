import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "FinFlow - Take Control of Your Finances",
  description: "An elegant solution to track your expenses, manage your budgets, and achieve your financial goals with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", orbitron.variable)}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
