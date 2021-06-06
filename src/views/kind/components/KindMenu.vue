<template>
  <van-sidebar class="kind-menus" v-model="active">
    <van-sidebar-item v-for="kind in kindMenus" :key="kind.id">
      <template #title>
        <van-badge :show-zero="false" :content="getCountById(kind.id)" max="99">
          {{ kind.name }}
        </van-badge>
      </template>
    </van-sidebar-item>
  </van-sidebar>
</template>

<script lang="ts">
import { KindList } from 'src/apis/kind/model/kindModel'
import { useAppStore } from 'src/store'
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  name: 'KindMenu',
  props: {
    kindMenus: {
      type: Array as PropType<KindList>,
      required: true,
      default: () => []
    }
  },
  setup() {
    const active = ref(0)
    const store = useAppStore()

    const getCountById = (id: number) => {
      return (store.getters.getSelectedFoodCountByKindId as any)(id)
    }

    return {
      active,
      getCountById
    }
  }
})
</script>

<style scoped lang="less">
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
