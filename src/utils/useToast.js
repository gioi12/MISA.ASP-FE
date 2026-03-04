// src/composables/useToast.js
import { ref } from 'vue'

const toastRef = ref(null)

export function useToast() {
  function toast(message, type = 'info', duration = 3000) {
    toastRef.value?.add(message, type, duration)
  }

  return {
    toastRef,
    toast,
    success: (msg) => toast(msg, 'success'),
    error: (msg) => toast(msg, 'error'),
    warning: (msg) => toast(msg, 'warning'),
    info: (msg) => toast(msg, 'info'),
  }
}
