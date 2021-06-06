<template>
  <div class="comment-list">
    <comment-item v-for="item in commentList" :key="item.id" :item="item"></comment-item>
  </div>
</template>

<script lang="ts">
import { CommentList } from 'src/apis/comment/model/commentModel'
import { defineComponent, PropType } from 'vue'
import CommentItem from './CommentItem.vue'

export default defineComponent({
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    commentList: {
      type: Array as PropType<CommentList>,
      required: true,
      default: () => []
    }
  },
  setup() {}
})
</script>

<style scoped lang="less">
.comment-list {
  height: 100%;
  overflow: auto;
}
</style>
