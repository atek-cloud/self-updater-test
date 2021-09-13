import isInstalledGlobally from 'is-installed-globally'
import * as path from 'path'
import { fileURLToPath } from 'url'
import * as fs from 'fs'
import { selfupdate } from '@mishguru/selfupdate'

const HERE_PATH = path.dirname(fileURLToPath(import.meta.url))
const PKG_PATH = path.join(HERE_PATH, 'package.json')

export async function start () {
  let packageJson
  try {
    packageJson = JSON.parse(fs.readFileSync(PKG_PATH, 'utf8'))
  } catch (e) {
    console.log('Failed to read package.json, unable to run auto-updater')
    console.log('  Attempted to read:',PKG_PATH)
    console.log('  Error:', e)
  }
  if (!packageJson || !isInstalledGlobally) {
    console.log('Skipping auto-update as this app is not running as a global NPM module.')
  } else {
    await selfupdate(packageJson)
  }

  console.log('Running version', packageJson.version)
}