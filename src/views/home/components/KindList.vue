<template>
  <van-grid :column-num="3" :icon-size="45" clickable>
    <van-grid-item
      v-for="kind in kindList"
      :key="kind.id"
      :to="{ path: '/kind', query: { name: kind.name } }"
      :icon="kind.image"
      :text="kind.name"
    />
  </van-grid>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { KindList } from 'apis/kind/model/kindModel'

export default defineComponent({
  name: 'KindList',
  props: {
    kindList: {
      type: Array as PropType<KindList>,
      required: true,
      default: () => []
    }
  }
})
</script>

<style scoped></style>
