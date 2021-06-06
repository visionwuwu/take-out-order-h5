import { RouteLocationNormalized } from 'vue-router'
import Settings from 'src/config/settings'

export default function getPageTitle(to: RouteLocationNormalized): string {
  let { title } = Settings
  if (to && to.meta && to.meta.title) {
    title += ` - ${to.meta.title}`
  }
  return title
}
