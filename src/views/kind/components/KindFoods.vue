<template>
  <div class="kind-foods" ref="rightMenu">
    <section class="kind-foods-item" v-for="item in realList" :key="item.id">
      <h2 :id="item.name" class="kind-foods-item__title van-hairline--bottom">{{ item.name }}</h2>
      <food-list :foods="item.foods" :kind-id="item.id" />
    </section>
  </div>
</template>

<script lang="ts">
import { KindFoodsList as KindFoodsListType, Food } from 'src/apis/kind/model/kindModel'
import { computed, defineComponent, onUnmounted, PropType, ref, watch } from 'vue'
import FoodList from './FoodList.vue'
import { emitter, UpdateGoodsCount } from '../mitt'

import useCartModel from '../hooks/useCartModel'

interface FoodListItem extends Food {
  count: number
}

export default defineComponent({
  name: 'KindFoods',
  components: {
    FoodList
  },
  props: {
    kindFoodsList: {
      type: Array as PropType<KindFoodsListType>,
      required: true,
      default: () => []
    }
  },
  setup(props) {
    const foodList = ref<any[]>([])
    const { goodsList } = useCartModel()

    // 异步获取到的数据用watch监听
    watch(
      () => props.kindFoodsList,
      newValue => {
        foodList.value = newValue.map(item => {
          item.foods = item.foods.map(v => {
            const goods = goodsList.value.find(f => {
              return f.id === v.id
            })
            return {
              ...v,
              count: goods ? goods.count : 0
            } as FoodListItem
          })
          return item
        })
      }
    )

    // 用户返回到模板中真正渲染的列表
    const realList = computed<any[]>({
      get() {
        return foodList.value
      },
      set(val) {
        foodList.value = val
      }
    })

    // 此函数用户处理监听购物车商品数量变化，并同步到点餐的食物
    const callback = (data?: UpdateGoodsCount) => {
      // 无数据发送，直接返回
      if (!data) return

      // 解构出数据
      const { type, value } = data

      foodList.value = foodList.value.map(item => {
        // 找到当前更新的食物数量
        const currentItem = item.foods.find((item: any) => item.id === value.id) as any

        // 匹配要进行的操作
        switch (type) {
          // 购物车数量增加，进行同步
          case 'increment':
            if (currentItem) {
              currentItem.count += 1
            }
            break
          case 'decrement':
            // 购物车数量减少，进行同步
            if (currentItem) {
              currentItem.count -= 1
            }
            break
          case 'empty':
            // 清空购物车，将所有的数量清零
            item.foods.forEach((item: any) => {
              item.count = 0
            })
            break
        }
        return item
      })
      console.log('接受到了')
    }

    // 用emitter监听更新购物车商品数量
    emitter.on('update-goods-count', callback)

    // 当页面卸载时，移除监听
    onUnmounted(() => {
      emitter.off('update-goods-count', callback)
    })

    return { realList }
  }
})
</script>

<style scoped lang="less">
.kind-foods {
  float: left;
  width: calc(100vw - 81px);
  height: 100%;
  overflow-y: auto;
  &-item {
    &__title {
      padding: 10px 0;
      background: #fbfbfb;
    }
  }
}
</style>
