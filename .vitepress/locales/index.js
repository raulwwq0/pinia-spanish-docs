import en from './en.js'
import zh from './zh.js'
import es from './es.js'

export default {
  vitepressConfig: {
    '/': en.vitepressConfig,
    '/zh/': zh.vitepressConfig,
    '/es/': es.vitepressConfig,
  },
  themeConfig: {
    '/': en.themeConfig,
    '/zh/': zh.themeConfig,
    '/es/': es.themeConfig,
  },
}
