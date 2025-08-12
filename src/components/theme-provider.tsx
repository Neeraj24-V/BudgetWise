"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const { forcedTheme } = props
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])
  
  const theme = React.useMemo(() => {
    if (forcedTheme) return forcedTheme
    if (mounted) return props.theme
    return undefined
  }, [mounted, forcedTheme, props.theme]);

  return (
    <NextThemesProvider {...props} theme={theme}>
      {children}
    </NextThemesProvider>
  )
}
