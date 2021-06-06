<template>
  <div class="address-card coloured-ribbon" @click="handleClick">
    <div class="address-card__left">
      <van-icon v-if="type === 'add'" class="icon-plus" name="plus" />
      <van-icon v-else class="icon-location" name="location-o" />
    </div>
    <div class="address-card__content">
      <template v-if="type === 'edit'">
        <p class="address_card_name van-ellipsis" v-if="addressInfo.mobile">
          姓名：{{ addressInfo.name }}
        </p>
        <p class="address_card_mobile van-ellipsis" v-if="addressInfo.mobile">
          手机：{{ addressInfo.mobile }}
        </p>
        <p class="address_card_address van-ellipsis" v-if="addressInfo.address">
          地址：{{ addressInfo.address }}
        </p>
      </template>
      <div v-else>填写收货地址</div>
    </div>
    <div class="address-card__right">
      <van-icon name="arrow" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from 'vue'

export type AddressCardType = 'edit' | 'add'

export interface AddressInfo {
  name: string
  mobile: string
  address: string
}

export default defineComponent({
  name: 'AddressCard',
  emits: ['click'],
  props: {
    addressInfo: {
      type: Object as PropType<AddressInfo>,
      default: () => {}
    },
    type: {
      type: String as PropType<AddressCardType>,
      default: 'add'
    }
  },
  setup(props, { emit }) {
    const methods = reactive({
      handleClick: () => {
        emit('click')
      }
    })

    return {
      ...toRefs(methods)
    }
  }
})
</script>

<style scoped lang="less">
.address-card {
  position: relative;
  padding: 13px 20px;
  line-height: 1.45;
  cursor: pointer;
  &:active {
    background: #f2f3f5;
  }
  &__left {
    flex-shrink: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 8px;
    .icon-plus {
      font-size: 20px;
      color: #fff;
      background: #1989fa;
      padding: 5px;
    }
    .icon-location {
      font-size: 20px;
      color: #969799;
    }
  }

  &__content {
    margin: 0 13px;
    font-size: 14px;
    > p,
    > div {
      width: 100%;
      color: #323233;
    }
    div {
      margin-left: 15px;
    }
  }

  &__right {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    .van-icon {
      font-size: 18px;
      color: #969799;
    }
  }
}
</style>
