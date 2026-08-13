import { ElLoading } from 'element-plus'

let loadingInstance = null
let requestCount = 0

export function showLoading(text = '加载中...') {
  if (requestCount === 0) {
    loadingInstance = ElLoading.service({
      lock: true,
      text,
      background: 'rgba(0, 0, 0, 0.35)',
    })
  }
  requestCount += 1
}

export function hideLoading() {
  requestCount = Math.max(requestCount - 1, 0)
  if (requestCount === 0 && loadingInstance) {
    loadingInstance.close()
    loadingInstance = null
  }
}

export async function withLoading(promise, text) {
  showLoading(text)
  try {
    return await promise
  } finally {
    hideLoading()
  }
}
