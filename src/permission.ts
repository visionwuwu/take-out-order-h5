import router from 'router/index'
import getPageTitle from 'utils/getPageTitle'
import { Toast } from 'vant'
import { useAppStore } from './store'
import { UserActionTypes } from './store/modules/user/action-types'

const whiteList: string[] = ['/login', '/register']

router.beforeEach(async (to, from, next) => {
  const store = useAppStore()
  // token存在
  if (store.state.user.token) {
    if (to.path === '/login' || to.path === '/register') {
      next({ path: '/' })
    } else if (!store.state.user.username) {
      try {
        await store.dispatch(UserActionTypes.ACTION_GET_USER_INFO)

        next({ ...to, replace: true })
      } catch (err) {
        store.dispatch(UserActionTypes.ACTION_RESET_TOKEN, undefined)
        Toast.fail(err || 'Has Error')
        next('/login')
      }
    } else {
      next()
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    // 访问的路由路径在白名单列表，直接跳过
    next()
  } else {
    // 其他没有访问权限的页面将重定向到登录页面
    next(`/login`)
  }
})

router.afterEach(to => {
  document.title = getPageTitle(to)
})
