<template>
  <div :style="style"></div>
</template>

<script lang="ts">
import { CSSProperties, defineComponent } from 'vue'

export default defineComponent({
  name: 'CommonDivider',
  props: {
    height: {
      type: Number,
      default: 10
    },
    backgroundColor: {
      type: String,
      default: '#F7F8FA'
    }
  },
  setup(props) {
    const style: CSSProperties = {
      height: `${props.height}px`,
      width: '100%',
      backgroundColor: props.backgroundColor
    }

    return {
      style
    }
  }
})
</script>

<style scoped></style>
