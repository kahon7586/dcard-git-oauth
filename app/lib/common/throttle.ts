export function throttle(callbackFn: () => void, delay = 500) {
  let timer: ReturnType<typeof setTimeout> | null = null
  return () => {
    if (timer !== null) return
    timer = setTimeout(() => {
      callbackFn()
      timer = null
    }, delay)
  }
}
