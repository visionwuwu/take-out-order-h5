import { ref } from '@vue/reactivity'
import { reqKindList } from 'src/apis/kind/kind'
import { KindList } from 'src/apis/kind/model/kindModel'

/* eslint-disable */
export const useKindEffect = () => {
  const kindList = ref<KindList>([])

  const getKindList = async () => {
    const res = await reqKindList()
    kindList.value = res.data.data
  }

  return {
    kindList,
    getKindList
  }
}
