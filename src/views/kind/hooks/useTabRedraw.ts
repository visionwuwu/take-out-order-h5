import { onMounted, onUnmounted, Ref } from 'vue'

export default function useTabRedraw(ref: Ref) {
  const handleResize = () => {
    if (ref && ref.value) {
      ref.value.resize()
    }
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
}
