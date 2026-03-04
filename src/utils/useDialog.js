import { ref } from 'vue'

const state = ref({
  visible: false,
  type: 'question',
  message: '',
  title: '',
  buttons: [],
})

let _resolve = null

function open(options) {
  state.value = { ...state.value, buttons: [], ...options, visible: true }
  return new Promise((resolve) => {
    _resolve = resolve
  })
}

function close(value) {
  state.value.visible = false
  _resolve?.(value)
  _resolve = null
}

const dialog = {
  open,
  close,

  confirm(options) {
    return open({
      type: 'question',
      buttons: [
        { text: 'Hủy', class: 'ms-button-secondary', value: false },
        { text: 'Không', class: 'ms-button-secondary', value: false },
        { text: 'Có', class: 'ms-button--primary', value: true },
      ],
      ...options,
    })
  },

  alert(options) {
    return open({
      type: 'info',
      buttons: [{ text: 'Đóng', class: 'ms-button--primary', value: true }],
      ...options,
    })
  },

  warning(options) {
    return open({
      type: 'warning',
      buttons: [
        { text: 'Hủy', class: 'ms-button-secondary ms-button-dialog', value: false },
        { text: 'Có', class: 'ms-button--primary ms-button-dialog text-white ', value: true },
      ],
      ...options,
    })
  },
}

export { state, dialog }
