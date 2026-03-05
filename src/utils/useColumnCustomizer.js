// composables/useColumnCustomizer.js
import { ref, computed } from 'vue'

const STORAGE_KEY = 'employee-columns-config'

export function useColumnCustomizer(rawColumns) {
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

  const savedConfig = loadConfig()
  const PINNED_KEYS = ['checkbox', 'action']
  const customizableColumns = rawColumns.filter((col) => !PINNED_KEYS.includes(col.key))

  const columnStates = ref(
    (() => {
      if (savedConfig) {
        const savedMap = Object.fromEntries(savedConfig.map((c, i) => [c.key, { ...c, order: i }]))
        const merged = customizableColumns.map((col) => ({
          key: col.key,
          definition: col.title,
          title: savedMap[col.key]?.title ?? col.title,
          visible: savedMap[col.key]?.visible ?? true,
          order: savedMap[col.key]?.order ?? 999,
          width: savedMap[col.key]?.width ?? col.width ?? 150,
          isLock: savedMap[col.key]?.isLock ?? !!col.sticky,
        }))
        merged.sort((a, b) => a.order - b.order)
        return merged
      }
      return customizableColumns.map((col, i) => ({
        key: col.key,
        definition: col.title,
        title: col.title,
        visible: true,
        order: i,
        width: col.width ?? 150,
        isLock: !!col.sticky,
      }))
    })(),
  )

  const visibleColumns = computed(() => {
    const visibleStates = columnStates.value.filter((c) => c.visible)

    const pinnedLeft = rawColumns.filter((c) => c.key === 'checkbox')
    const pinnedRight = rawColumns.filter((c) => c.key === 'action')

    const middleCols = visibleStates
      .map((state) => {
        const raw = rawColumns.find((c) => c.key === state.key)
        if (!raw) return null
        return {
          ...raw,
          title: state.title,
          width: state.width,
          sticky: state.isLock ? (raw.sticky ?? 'left') : undefined,
        }
      })
      .filter(Boolean)

    return [...pinnedLeft, ...middleCols, ...pinnedRight]
  })

  // Lưu lại giá trị gốc 1 lần duy nhất khi khởi tạo
  const defaultStates = customizableColumns.map((col, i) => ({
    key: col.key,
    definition: col.title,
    title: col.title,
    visible: true,
    order: i,
    width: col.width ?? 150,
    isLock: !!col.sticky,
  }))
  // cất
  function applyAndSave(newStates) {
    columnStates.value = newStates
    saveConfig(
      newStates.map((c, i) => ({
        key: c.key,
        title: c.title,
        visible: c.visible,
        order: i,
        width: c.width,
        isLock: c.isLock,
      })),
    )
  }

  return { columnStates, visibleColumns, applyAndSave, PINNED_KEYS, defaultStates }
}
