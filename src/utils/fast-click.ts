import { FastClick } from 'fastclick'

export default function attachFastClick() {
  if ('addEventListener' in document) {
    document.addEventListener(
      'DOMContentLoaded',
      () => {
        FastClick.attach(document.body)
      },
      false
    )
  }
}
