<template>
  <div class="common-card" :class="classes" :style="style">
    <div class="common-card__header van-hairline--bottom" v-if="header || slots.header">
      <slot name="header">
        {{ header }}
      </slot>
    </div>

    <div class="common-card__body" :style="bodyStyle">
      <slot name="default"></slot>
    </div>

    <div class="common-card__footer van-hairline--top" v-if="slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { CSSProperties, defineComponent, PropType } from 'vue'

export type ShadowType = 'always' | 'hover' | 'never'

export default defineComponent({
  name: 'CommonCard',
  props: {
    shadow: {
      type: String as PropType<ShadowType>,
      default: 'always'
    },
    header: {
      type: String,
      default: ''
    },
    bodyStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({ padding: '10px 16px' })
    },
    border: {
      type: Boolean,
      default: true
    },
    borderRadius: {
      type: Boolean,
      default: true
    },
    radiusSize: {
      type: Number,
      default: 12
    }
  },
  setup(props, context) {
    const classes = {
      [`is-${props.shadow}-shadow`]: !!props.shadow,
      'has-border': props.border,
      'has-border-radius': props.borderRadius
    }

    const style: CSSProperties = {
      borderRadius: props.borderRadius ? `${props.radiusSize}px` : 0
    }

    return {
      classes,
      style,
      slots: context.slots
    }
  }
})
</script>
<style scoped lang="less">
.common-card {
  width: 351px;
  background: rgba(255, 255, 255, 1);
  margin: 0 auto;
  margin-top: 12px;
  overflow: hidden;
  &.has-border {
    border: 1px solid #ebeef5;
  }
  &.has-border-radius {
    border-radius: 12px;
  }
  &__footer,
  &__header {
    padding: 8px 10px;
  }
  &.is-always-shadow {
    box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.09);
  }
  &.is-hover-shadow:hover {
    box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.09);
  }
  &.is-never-shadow {
    box-shadow: none;
  }
}
</style>
