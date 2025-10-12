import { BrowserWindow } from 'electron'
import { MIN_WINDOW_HEIGHT, MIN_WINDOW_WIDTH } from '@share/config/constant'
import windowStateKeeper from 'electron-window-state'
import { isLinux, isMac } from '../constant'
import { titleBarOverlayDark, titleBarOverlayLight } from '@main/config'
import icon from '../../../build/icon.png?asset'
import { join } from 'path'
import nativeTheme = Electron.nativeTheme

export class WindowService {
  private static instance: WindowService | null = null
  private mainWindow: BrowserWindow | null = null
  private miniWindow: BrowserWindow | null = null
  // private isPinnedMiniWindow: boolean = false

  /**
   * 获取单例
   */
  public static getInstance(): WindowService {
    if (!WindowService.instance) {
      WindowService.instance = new WindowService()
    }
    return WindowService.instance
  }

  /**
   * 创建主窗口
   */
  public createMainWindow(): BrowserWindow {
    // 当主窗口存在时，则显示
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      this.mainWindow.show()
      this.mainWindow.focus()
      return this.mainWindow
    }

    const mainWindowState = windowStateKeeper({
      defaultWidth: MIN_WINDOW_WIDTH,
      defaultHeight: MIN_WINDOW_HEIGHT,
      fullScreen: false,
      maximize: false,
      file: 'main-window-state.json'
    })
    this.mainWindow = new BrowserWindow({
      x: mainWindowState.x,
      y: mainWindowState.y,
      width: mainWindowState.width,
      height: mainWindowState.height,
      minWidth: MIN_WINDOW_WIDTH,
      minHeight: MIN_WINDOW_HEIGHT,
      show: false,
      autoHideMenuBar: true,
      transparent: false,
      vibrancy: 'sidebar',
      visualEffectState: 'active',
      // 在 Windows 和 Linux 系统中，我们使用带有自定义控件的无边框窗口
      // 在 Mac 系统中，我们保留原生标题栏样式
      ...(isMac
        ? {
            titleBarStyle: 'hidden',
            // TODO 学习了解这一属性
            titleBarOverlay: nativeTheme.shouldUseDarkColors ? titleBarOverlayDark : titleBarOverlayLight,
            trafficLightPosition: { x: 8, y: 13 }
          }
        : {
            frame: false // Frameless window for Windows and Linux
          }),
      backgroundColor: isMac ? undefined : nativeTheme.shouldUseDarkColors ? '#181818' : '#FFFFFF',
      darkTheme: nativeTheme.shouldUseDarkColors,
      ...(isLinux ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: true,
        webSecurity: true,
        webviewTag: true,
        allowRunningInsecureContent: true,
        // zoomFactor: configManager.getZoomFactor(),
        backgroundThrottling: false
      }
    })

    this.setupMainWindow(this.mainWindow, mainWindowState)

    return this.mainWindow
  }

  /**
   * 设置主窗口
   * @param mainWindow
   * @param mainWindowState
   * @private
   */
  private setupMainWindow(mainWindow: BrowserWindow, mainWindowState) {
    mainWindowState.manage(mainWindow)
    // 后续添加更多加载逻辑
  }

  /**
   * 创建小窗口
   */
  public createMiniWindow(): BrowserWindow {
    if (this.miniWindow && !this.miniWindow.isDestroyed()) {
      return this.miniWindow
    }
    this.miniWindow = new BrowserWindow({
      width: 300,
      //TODO 完善内容
    })

    return this.miniWindow;
  }
}
