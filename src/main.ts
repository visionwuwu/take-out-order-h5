import { createApp, Directive } from 'vue'
import Vant from 'plugins/vant3'
import attachFastClick from 'utils/fast-click'
import App from './App.vue'
import router from './router'
import store from './store'
import * as directives from 'directives/index'
import MyUI from 'comps/index'
import './permission'
import 'styles/index.less'
import 'normalize.css'

const app = createApp(App)

// 注册全局自定义指令
Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string]: Directive })[key])
})

// fast-click
attachFastClick()

app.use(Vant).use(MyUI).use(router).use(store).mount('#app')
