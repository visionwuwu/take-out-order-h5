import { reactive, toRefs } from '@vue/reactivity'
import { reqkindAndFoodsList } from 'src/apis/kind/kind'
import { KindFoodsList } from 'src/apis/kind/model/kindModel'
import { useKindEffect } from 'views/home/hooks/useKindEffect'

export interface StateModel {
  kindFoodsList: KindFoodsList
}

export const useOrderEffect = () => {
  const { kindList, getKindList } = useKindEffect()
  const state = reactive<StateModel>({
    kindFoodsList: []
  })

  const getKindFoodsList = async () => {
    const res = await reqkindAndFoodsList()
    state.kindFoodsList = res.data.data
  }

  return {
    kindList,
    getKindList,
    getKindFoodsList,
    ...toRefs(state)
  }
}
