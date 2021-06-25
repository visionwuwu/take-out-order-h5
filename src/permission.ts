import router from 'router/index'
import getPageTitle from 'utils/getPageTitle'
import { Toast } from 'vant'
import { useAppStore } from './store'
import { UserActionTypes } from './store/modules/user/action-types'

const whiteList: string[] = ['/login', '/register']

router.beforeEach(async (to, from, next) => {
  const store = useAppStore()
  if (to.meta.auth) {
    if (store.state.user.token) {
      if (!store.state.user.username) {
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
    } else {
      Toast.fail({
        duration: 800,
        message: '请先登录！'
      })
      next('/login')
    }
  } else {
    if (store.state.user.token) {
      if (to.path === '/login' || to.path === '/register') {
        next({ path: '/' })
      } else {
        next()
      }
    } else {
      next()
    }
  }
})

router.afterEach(to => {
  document.title = getPageTitle(to)
})
