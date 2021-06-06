import { reactive, ref } from '@vue/reactivity'
import { reqCommentList } from 'apis/comment/comment'
import { CommentList } from 'src/apis/comment/model/commentModel'
import { PageModel } from 'src/common/model/pageModel'

export interface StateModel {
  commentList: CommentList
  loading: boolean
  finished: boolean
  listQuery: PageModel
}

export const useCommentEffect = () => {
  const tabRef = ref()
  const state = reactive<StateModel>({
    commentList: [],
    loading: false,
    finished: false,
    listQuery: {
      page: 1,
      limit: 10
    }
  })

  const getCommentList = () => {
    reqCommentList(state.listQuery)
      .then(res => {
        const list = res.data.data
        if (!list) return
        state.commentList = list.length === 0 ? state.commentList : [...state.commentList, ...list]
        state.listQuery = {
          page: state.listQuery.page + 1,
          limit: state.listQuery.limit
        }
        if (list && list.length < 10) {
          state.finished = true
        }
      })
      .finally(() => {
        state.loading = false
      })
  }

  return {
    state,
    tabRef,
    getCommentList
  }
}
