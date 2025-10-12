import { ElectronAPI } from '@electron-toolkit/preload'
import { WindowAPI } from './index'

declare global {
  interface Window {
    electron: ElectronAPI
    api: WindowAPI
  }
}
