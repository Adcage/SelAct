import path from 'node:path'
import { app } from 'electron'
import * as fs from 'node:fs'

export function getDataPath() {
  const dataPath = path.join(app.getPath('userData'), 'Data')
  if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath, { recursive: true })
  }
  return dataPath
}
