import { createContext } from "react"
import type { ThemeProviderState } from "../types/theme-types"

export const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: "system",
  setTheme: () => null,
})