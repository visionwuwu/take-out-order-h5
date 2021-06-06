<template>
  <div class="comment-list-item">
    <div class="comment-list-item__header">
      <van-image
        width="35px"
        height="35px"
        fit="cover"
        lazy-load
        :src="item.user.avatar"
        class="comment-list-item__header-avatar"
      />
      <div class="comment-list-item__header-userinfo">
        <h4>{{ item.user.username }}</h4>
        <p>{{ item.createTime }}</p>
      </div>
    </div>
    <div class="comment-list-item__body">
      <div v-if="item.content" class="comment-list-item__body-content">
        {{ item.content }}
      </div>
      <div class="comment-list-item__body-images" v-if="images.length > 0">
        <div class="img-box" v-for="(img, index) in images" :key="img">
          <van-image
            @click="handleImagePreview(index)"
            radius="4"
            width="100%"
            height="100%"
            lazy-load
            fit="cover"
            :src="img"
          />
        </div>
      </div>
    </div>
    <div class="comment-list-item__shopReply" v-if="item.shopReplyContent">
      <h4>商家回复：</h4>
      <p>{{ item.shopReplyContent }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { CommentListItem } from 'src/apis/comment/model/commentModel'
import { ImagePreview } from 'vant'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'CommentListItem',
  props: {
    item: {
      type: Object as PropType<CommentListItem>,
      required: true
    }
  },
  setup(props) {
    const images = computed<string[]>(() => {
      return props.item.images ? props.item.images.split(',') : []
    })

    // 图片预览
    const handleImagePreview = (index: number) => {
      ImagePreview({
        images: images.value,
        closeable: true,
        startPosition: index
      })
    }

    return {
      images,
      handleImagePreview
    }
  }
})
</script>

<style scoped lang="less">
.comment-list-item {
  padding: 10px;
  &__header {
    padding-bottom: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    &-avatar {
      margin-right: 10px;
    }
    &-userinfo {
      flex: 1;
      h4 {
        font-size: 16px;
        color: #000;
      }
      p {
        font-size: 13px;
        margin: 5px 0;
        color: rgba(69, 90, 100, 0.6);
      }
    }
  }

  &__body {
    &-content {
      font-size: 13px !important;
      color: rgba(69, 90, 100, 0.6);
      line-height: 1.5;
      margin-bottom: 6px;
    }
    &-images {
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      margin: 10px 0;
      .img-box {
        width: 33.333%;
        display: flex;
        align-items: center;
        justify-content: center;
        :deep(.van-image) {
          margin: 8px;
        }
      }
    }
  }

  &__shopReply {
    padding: 10px 8px;
    background: #f7f8fa;
    font-size: 13px !important;
    h4 {
      color: #333;
      margin-bottom: 4px;
    }
    p {
      line-height: 1.5;
      color: #888;
    }
  }
}
</style>
