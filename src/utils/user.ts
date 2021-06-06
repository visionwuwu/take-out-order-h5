import { useAppStore } from 'src/store'

/**
 * 获取当前用户的id
 * @returns
 */
export function getUserId() {
  const store = useAppStore()
  return store.state.user.id
}
