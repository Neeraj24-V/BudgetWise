
"use client";

import React from "react";

/**
 * This component is kept for structural consistency.
 * It's a good place to compose multiple client-side providers
 * if more are needed in the future. For now, it just passes children through.
 */
export function Providers({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
