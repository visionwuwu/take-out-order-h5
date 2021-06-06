<template>
  <van-sidebar class="kind-menus" v-model="active" ref="leftMenu" @change="selectLeft">
    <van-sidebar-item v-for="kind in kindMenus" :key="kind.id">
      <template #title>
        <van-badge :show-zero="false" :content="getCountById(kind.id)" max="99">
          {{ kind.name }} {{}}
        </van-badge>
      </template>
    </van-sidebar-item>
  </van-sidebar>
  <div class="kind-foods" ref="rightMenu">
    <section
      class="kind-foods-item"
      v-for="(item, i) in realList"
      :ref="
        el => {
          if (el) {
            rightItems[i] = el
          }
        }
      "
      :key="item.id"
    >
      <h2 :id="item.name" class="kind-foods-item__title van-hairline--bottom">{{ item.name }}</h2>
      <food-list :foods="item.foods" :kind-id="item.id" />
    </section>
  </div>
</template>

<script lang="ts">
import { KindFoodsList as KindFoodsListType, Food, KindList } from 'src/apis/kind/model/kindModel'
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
  ref,
  toRefs,
  watch
} from 'vue'
import FoodList from './FoodList.vue'
import { emitter, UpdateGoodsCount } from '../mitt'

import useCartModel from '../hooks/useCartModel'

import { useAppStore } from 'src/store'

interface FoodListItem extends Food {
  count: number
}

interface DataModel {
  rightTops: number[]
  scrollY: number
  leftScrollY: number
}

export default defineComponent({
  name: 'CascadList',
  components: {
    FoodList
  },
  props: {
    kindMenus: {
      type: Array as PropType<KindList>,
      required: true,
      default: () => []
    },
    kindFoodsList: {
      type: Array as PropType<KindFoodsListType>,
      required: true,
      default: () => []
    }
  },
  setup(props) {
    const store = useAppStore()
    const rightItems = ref<any[]>([])
    const foodList = ref<any[]>([])
    const { goodsList } = useCartModel()
    const active = ref(0)
    const leftMenu = ref()
    const rightMenu = ref()
    const data = reactive<DataModel>({
      rightTops: [],
      scrollY: 0,
      leftScrollY: 0
    })

    const getCountById = (id: number) => {
      return (store.getters.getSelectedFoodCountByKindId as any)(id)
    }

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

    const scrollHeight = (e: any) => {
      const scrollY = Math.abs(Math.round(e.target.scrollTop))
      let index = data.rightTops.findIndex((height, index) => {
        return scrollY >= data.rightTops[index] && scrollY < data.rightTops[index + 1]
      })
      if (scrollY > data.rightTops[index] + 50) {
        index++
      }
      active.value = index
    }

    onMounted(() => {
      rightMenu.value.onscroll = scrollHeight
    })

    onUnmounted(() => {
      rightMenu.value ? (rightMenu.value.onscroll = null) : ''
    })

    const selectLeft = (index: number) => {
      rightMenu.value.scrollTo(0, data.rightTops[index])
    }

    watch(
      () => props.kindFoodsList,
      () => {
        nextTick(() => {
          calculateHeight()
        })
      }
    )

    const calculateHeight = () => {
      const lis = rightItems.value
      let height = 0
      data.rightTops.push(height)
      lis.forEach(li => {
        height += li.clientHeight
        data.rightTops.push(height)
      })
    }

    return {
      ...toRefs(data),
      realList,
      active,
      getCountById,
      rightItems,
      leftMenu,
      rightMenu,
      scrollHeight,
      selectLeft
    }
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
.kind-menus {
  width: 80px;
  height: 100%;
  float: left;
  // overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  :deep(.van-sidebar-item) {
    text-align: center;
    &__text {
      width: 100%;
      .van-badge__wrapper {
        width: 100%;
      }
      font-size: 13px !important;
    }
    &--select::before {
      height: 20px;
    }
  }
}
</style>
