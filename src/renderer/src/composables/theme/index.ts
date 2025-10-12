import { ThemeName, themes } from '@renderer/context/type/theme'
import { onMounted, ref } from 'vue' // 当前主题名称

// 当前主题名称
const currentThemeName = ref<ThemeName>('light')
// 主题存储键
const THEME_STORAGE_KEY = 'app-theme'
// 是否初始化
let isInitialized = false

const applyTheme = (themName: ThemeName) => {
  const theme = themes[themName]
  const root = document.documentElement
  console.log(
    'applyTheme',
    themName,
    themes
  )
  Object.keys(theme).forEach((key) => {
    root.style.setProperty(key, theme[key as keyof typeof theme])
  })
  currentThemeName.value = themName
}

const themeComposable = {
  currentThemeName,
  //设置主题
  setTheme: (name: ThemeName): void => {
    applyTheme(name)
    localStorage.setItem(THEME_STORAGE_KEY, name)
  },
  // 初始化主题
  initTheme: (): void => {
    // 防止重复初始化
    if (isInitialized) return
    // 从本地存储中获取保存的主题
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName | null
    if (savedTheme && themes[savedTheme]) {
      applyTheme(savedTheme)
    } else {
      // Fallback to user's system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      applyTheme(prefersDark ? 'dark' : 'light')
    }

    isInitialized = true
  }
}
export function useTheme(): typeof themeComposable {
  // 在组件挂载时初始化主题
  onMounted(() => {
    themeComposable.initTheme()
  })
  return themeComposable
}
