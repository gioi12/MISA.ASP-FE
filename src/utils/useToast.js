import { ref } from 'vue'

export const toasts = ref([])
let idCounter = 0

export function useToast() {
  function toast(message, type = 'info', duration = 3000) {
    const id = ++idCounter
    toasts.value.push({ id, message, type })
    if (duration > 0)
      setTimeout(() => {
        toasts.value = toasts.value.filter((t) => t.id !== id)
      }, duration)
  }

  return {
    toast,
    success: (msg) => toast(msg, 'success'),
    error: (msg) => toast(msg, 'error'),
    warning: (msg) => toast(msg, 'warning'),
    info: (msg) => toast(msg, 'info'),
  }
}
