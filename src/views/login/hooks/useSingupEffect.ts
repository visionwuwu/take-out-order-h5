import { RegisterModel } from 'apis/user/model/userModel'
import { reactive, toRefs } from '@vue/reactivity'
import { reqRegister } from 'src/apis/user/user'
import { ApiStatusCode } from 'src/common/enums/ApiStatusCode.enum'
import { Notify } from 'vant'
import { useRouter } from 'vue-router'

export interface FormType extends RegisterModel {
  loading: boolean
}

export const useSingupEffect = () => {
  const router = useRouter()
  const state = reactive<FormType>({
    username: '',
    password: '',
    mobile: '',
    loading: false
  })

  const onSubmit = (values: RegisterModel) => {
    state.loading = true
    reqRegister(values)
      .then(response => {
        const { code } = response.data
        if (code === ApiStatusCode.OK) {
          Notify({
            type: 'success',
            message: '注册成功，请重新登录',
            duration: 2000,
            onOpened: () => {
              router.push('/login')
            }
          })
        }
      })
      .finally(() => {
        state.loading = false
      })
  }

  return {
    ...toRefs(state),
    onSubmit
  }
}
