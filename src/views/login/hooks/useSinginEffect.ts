import { reactive, toRefs } from 'vue'
import { useAppStore } from 'store/index'
import { Notify } from 'vant'
import { useRouter } from 'vue-router'
import { UserActionTypes } from 'src/store/modules/user/action-types'
import { LoginModel } from 'src/apis/user/model/userModel'
import { useCurrentRoute } from './useCurrentRoute'

export interface FormType {
  username: string
  password: string
  loading: boolean
}

export const useSigninEffect = () => {
  const store = useAppStore()
  const router = useRouter()

  const { redirect } = useCurrentRoute()
  const form = reactive<FormType>({
    username: 'editor',
    password: '123456',
    loading: false
  })
  const onSubmit = (values: LoginModel) => {
    form.loading = true
    store
      .dispatch(UserActionTypes.ACTION_LOGIN, values)
      .then(() => {
        Notify({
          type: 'success',
          message: '登录成功',
          duration: 2000
        })
        form.loading = false
        router.push({ path: redirect.value })
      })
      .catch(() => {
        form.loading = false
      })
  }
  return { ...toRefs(form), onSubmit }
}
