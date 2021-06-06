export type EnvName = 'development' | 'beta' | 'production' | 'preview'

interface BaseConfig {
  cdn?: string
  apiBaseUrl?: string
}

type Config = {
  [key in EnvName]?: BaseConfig
}

const config: Config = {
  // 开发环境配置
  development: {
    cdn: './',
    apiBaseUrl: 'http://192.168.1.102:3000'
  },
  // 测试环境配置
  beta: {
    cdn: './',
    apiBaseUrl: 'http://192.168.1.102:3000'
  },
  // 生产环境配置
  production: {
    cdn: './',
    apiBaseUrl: 'http://take-out-order.visionwu.top/'
  },
  // 预览环境配置
  preview: {
    cdn: './',
    apiBaseUrl: 'http://localhost:3000/api'
  }
}

export default config
