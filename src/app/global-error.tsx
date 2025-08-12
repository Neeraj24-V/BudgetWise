
'use client';

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold text-destructive mb-4">Something went wrong!</h1>
            <p className="text-muted-foreground mb-6">
              An unexpected error occurred. We've been notified and are looking into it.
            </p>
            {error?.message && (
                <div className="bg-muted p-4 rounded-md text-left text-sm mb-6">
                    <p className="font-mono">{error.message}</p>
                </div>
            )}
            <Button onClick={() => reset()}>
              Try again
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
