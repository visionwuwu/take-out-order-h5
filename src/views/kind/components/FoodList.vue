<template>
  <div class="kind-foods-list">
    <van-card
      v-for="food in foods"
      :key="food.id"
      :price="food.price.toFixed(2)"
      :desc="food.remarks"
      :title="food.name"
      lazy-load
      :thumb="food.image"
    >
      <template #num>
        <van-stepper
          @plus="handlePlus(food)"
          @minus="handleMinus(food)"
          min="0"
          v-model="food.count"
          theme="round"
          button-size="21"
          disable-input
        />
      </template>
    </van-card>
  </div>
</template>

<script lang="ts">
import { Food } from 'src/apis/kind/model/kindModel'
import useCartModel from '../hooks/useCartModel'
import { defineComponent, PropType, reactive, toRefs } from 'vue'

interface FoodListItem extends Food {
  count: number
}

export default defineComponent({
  name: 'KindFoodsList',
  props: {
    foods: {
      type: Array as PropType<FoodListItem[]>,
      required: true,
      default: () => []
    },
    kindId: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const { commitAddGoods, commitRemoveGoods } = useCartModel()

    const methods = reactive({
      handlePlus: (food: FoodListItem) => {
        const { createTime, ...restProps } = food
        commitAddGoods({ ...restProps, kindId: props.kindId })
      },
      handleMinus: (food: FoodListItem) => {
        commitRemoveGoods(food.id)
      }
    })

    return {
      ...toRefs(methods)
    }
  }
})
</script>

<style scoped lang="less">
.kind-foods-list {
  :deep(.van-card) {
    background: #fff;
    .van-card__thumb {
      width: 75px;
      height: 75px;
    }
    .van-card__content {
      min-height: auto;
    }
  }
}
</style>
