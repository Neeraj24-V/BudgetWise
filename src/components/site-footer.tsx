
import Link from 'next/link';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/40 bg-background/95 py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-20 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {currentYear}{' '}
          <Link href="/" className="font-medium underline underline-offset-4 hover:text-primary">
            BudgetWise
          </Link>
          . All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
