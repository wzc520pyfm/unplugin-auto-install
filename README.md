# unplugin-auto-install

[![NPM version](https://img.shields.io/npm/v/unplugin-auto-install?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-auto-install)

🍣 A universal bundler plugin which automatically installs dependencies that are imported by a bundle, even if not yet in `package.json`.

## Install

```bash
npm i unplugin-auto-install
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import UnpluginAutoInstall from 'unplugin-auto-install/vite'

export default defineConfig({
  plugins: [
    UnpluginAutoInstall({
      /* options */
    }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import UnpluginAutoInstall from 'unplugin-auto-install/rollup'

export default {
  plugins: [
    UnpluginAutoInstall({
      /* options */
    }),
  ],
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-auto-install/webpack')({
      /* options */
    }),
  ],
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default defineNuxtConfig({
  modules: [
    [
      'unplugin-auto-install/nuxt',
      {
        /* options */
      },
    ],
  ],
})
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-auto-install/webpack')({
        /* options */
      }),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import UnpluginAutoInstall from 'unplugin-auto-install/esbuild'

build({
  plugins: [UnpluginAutoInstall()],
})
```

<br></details>

## Usage

### Options

For all options please refer to [docs](https://github.com/rollup/plugins/tree/master/packages/auto-install#options).

This plugin accepts all [@rollup/plugin-auto-install](https://github.com/rollup/plugins/tree/master/packages/auto-install#options) options.
