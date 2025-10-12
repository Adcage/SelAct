import { lightTheme } from '@renderer/composables/theme/light'
import { darkTheme } from '@renderer/composables/theme/dark'

export const themes = {
  light: lightTheme,
  dark: darkTheme
}

export type ThemeName = keyof typeof themes
