// composables/useColumnCustomizer.js
import { ref, computed } from 'vue'

const STORAGE_KEY = 'employee-columns-config'

export function useColumnCustomizer(rawColumns) {
  /** Đọc config đã lưu từ localStorage, trả về null nếu chưa có hoặc lỗi */
  function loadConfig() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  }
  // lưu vào localstorage
  function saveConfig(config) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  }

  const savedConfig = loadConfig()
  /** Các cột cố định, không cho phép tuỳ chỉnh (ẩn/hiện, kéo thả) */
  const PINNED_KEYS = ['checkbox', 'action']
  /** Lọc ra các cột có thể tuỳ chỉnh (bỏ checkbox và action) */
  const customizableColumns = rawColumns.filter((col) => !PINNED_KEYS.includes(col.key))
  /**
   * State của từng cột: thứ tự, hiển thị, độ rộng, có khóa vị trí không
   * Nếu có config lưu sẵn → merge với rawColumns để không mất cột mới thêm
   * Nếu chưa có → khởi tạo mặc định từ rawColumns
   */
  const columnStates = ref(
    (() => {
      if (savedConfig) {
        // Build map từ config đã lưu để tra cứu nhanh theo key
        const savedMap = Object.fromEntries(savedConfig.map((c, i) => [c.key, { ...c, order: i }]))
        // Merge: ưu tiên giá trị đã lưu, fallback về giá trị mặc định của rawColumns

        const merged = customizableColumns.map((col) => ({
          key: col.key,
          definition: col.title,
          title: savedMap[col.key]?.title ?? col.title,
          visible: savedMap[col.key]?.visible ?? true,
          order: savedMap[col.key]?.order ?? 999,
          width: savedMap[col.key]?.width ?? col.width ?? 150,
          isLock: savedMap[col.key]?.isLock ?? !!col.sticky,
        }))
        // Sắp xếp theo thứ tự đã lưu
        merged.sort((a, b) => a.order - b.order)
        return merged
      }
      // mặc định
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
  /**
   * Danh sách cột thực sự truyền vào ms-table
   * = checkbox (trái) + các cột visible theo thứ tự + action (phải)
   */
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

  /** Snapshot trạng thái mặc định, lưu 1 lần khi khởi tạo, không thay đổi sau đó */
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
