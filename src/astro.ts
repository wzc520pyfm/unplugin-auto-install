import type { Options } from './types'

import unplugin from '.'

export default (options: Options) => ({
  name: 'unplugin-auto-install',
  hooks: {
    'astro:config:setup': async (astro: any) => {
      astro.config.vite.plugins ||= []
      astro.config.vite.plugins.push(unplugin.vite(options))
    },
  },
})
