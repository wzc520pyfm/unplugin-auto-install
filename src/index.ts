import * as fs from 'node:fs'
import * as path from 'node:path'
import mod from 'node:module'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import type { Options } from './types'

const execAsync = promisify(exec)

export const unpluginFactory: UnpluginFactory<Options | undefined> = (rawOptions = {}) => {
  const defaults = {
    // intentionally undocumented options. used for tests
    commands: {
      npm: 'npm install',
      pnpm: 'pnpm install',
      yarn: 'yarn add',
    },
    manager: fs.existsSync('yarn.lock') ? 'yarn' : fs.existsSync('pnpm-lock.yaml') ? 'pnpm' : 'npm',
    pkgFile: path.resolve(rawOptions.pkgFile || 'package.json'),
  }

  const options = Object.assign({}, defaults, rawOptions)
  const { manager, pkgFile } = options
  const validManagers = ['npm', 'yarn', 'pnpm']

  if (!validManagers.includes(manager)) {
    throw new RangeError(
      `'${manager}' is not a valid package manager. `
      + `Valid managers include: '${validManagers.join('\', \'')}'.`,
    )
  }

  let pkg: any
  if (fs.existsSync(pkgFile)) {
    pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf-8'))
  }
  else {
    fs.writeFileSync(pkgFile, '{}')
    pkg = {}
  }

  const installed = new Set(Object.keys(pkg.dependencies || {}).concat(mod.builtinModules))
  const cmd = options.commands[manager]

  return {
    name: 'unplugin-auto-install',
    async resolveId(importee, importer) {
      // entry module
      if (!importer)
        return null

      // this function doesn't actually resolve anything, but it provides us with a hook to discover uninstalled deps

      const isExternalPackage
        = importee[0] !== '.' && importee[0] !== '\0' && !path.isAbsolute(importee)

      if (isExternalPackage) {
        // we have a bare import — check it's installed
        const parts = importee.split('/')
        let name = parts.shift()!
        if (name[0] === '@')
          name += `/${parts.shift()}`

        if (!installed.has(name)) {
          // eslint-disable-next-line no-console
          console.log(`installing ${name}...`)
          await execAsync(`${cmd} ${name}`)
        }
      }

      return null
    },
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
