export interface Options {
  /**
   * Specifies the location on disk of the target `package.json` file.
   * If the file doesn't exist, it will be created by the plugin,
   * as package managers need to populate the `dependencies` property.
   * @default '{cwd}/package.json'
   */
  pkgFile?: string

  /**
   * Specifies the package manager to use; `npm` or `yarn`.
   * If not specified, the plugin will default to `yarn` if `yarn.lock` exists, or `npm` otherwise.
   */
  manager?: 'npm' | 'yarn'
}
