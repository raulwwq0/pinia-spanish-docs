import es from './es.js'
import en from './en.js'
import zh from './zh.js'

export default {
  vitepressConfig: {
    '/en/': en.vitepressConfig, // It'll be '/' on prod
    '/': es.vitepressConfig,    // It'll be '/es/' on prod
    '/zh/': zh.vitepressConfig,
  },
  themeConfig: {
    '/en/': en.themeConfig,     // It'll be '/' on prod
    '/': es.themeConfig,        // It'll be '/es/' on prod
    '/zh/': zh.themeConfig
  },
}
