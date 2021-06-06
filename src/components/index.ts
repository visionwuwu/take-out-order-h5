import { App } from '@vue/runtime-core'
import CommonDivider from './CommonDivider/index.vue'
import CommonCard from './CommonCard/index.vue'

const MyUI: any = {}

const componets = {
  CommonDivider,
  CommonCard
}

MyUI.install = function (app: App) {
  // 完整注册组件
  Object.keys(componets).forEach(name => {
    const component = (componets as any)[name]
    app.component(component.name, component)
  })
}

export default MyUI
