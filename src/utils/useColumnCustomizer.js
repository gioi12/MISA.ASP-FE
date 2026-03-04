// composables/useColumnCustomizer.js
import { ref, computed } from 'vue'

const STORAGE_KEY = 'employee-columns-config'

export function useColumnCustomizer(rawColumns) {
  // Lấy config từ localStorage (chỉ lưu key + visible + order)
  function loadConfig() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  }

  function saveConfig(config) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  }

  // Khởi tạo state từ localStorage hoặc default
  const savedConfig = loadConfig()

  // Các cột không được tùy chỉnh (luôn hiện)
  const PINNED_KEYS = ['checkbox', 'action']

  const customizableColumns = rawColumns.filter((col) => !PINNED_KEYS.includes(col.key))

  // Xây dựng danh sách cột tùy chỉnh với trạng thái visible
  const columnStates = ref(
    (() => {
      if (savedConfig) {
        const savedMap = Object.fromEntries(savedConfig.map((c, i) => [c.key, { ...c, order: i }]))
        const merged = customizableColumns.map((col) => ({
          key: col.key,
          title: col.title,
          visible: savedMap[col.key]?.visible ?? true,
          order: savedMap[col.key]?.order ?? 999,
        }))
        merged.sort((a, b) => a.order - b.order)
        return merged
      }
      return customizableColumns.map((col, i) => ({
        key: col.key,
        title: col.title,
        visible: true,
        order: i,
      }))
    })(),
  )

  // Columns hiển thị trong bảng (theo thứ tự + filter visible)
  const visibleColumns = computed(() => {
    const keyOrder = columnStates.value.filter((c) => c.visible).map((c) => c.key)

    const pinnedLeft = rawColumns.filter((c) => c.key === 'checkbox')
    const pinnedRight = rawColumns.filter((c) => c.key === 'action')
    const middleCols = keyOrder.map((key) => rawColumns.find((c) => c.key === key)).filter(Boolean)

    return [...pinnedLeft, ...middleCols, ...pinnedRight]
  })

  function applyAndSave(newStates) {
    columnStates.value = newStates
    saveConfig(newStates.map((c, i) => ({ key: c.key, visible: c.visible, order: i })))
  }

  return { columnStates, visibleColumns, applyAndSave, PINNED_KEYS }
}
