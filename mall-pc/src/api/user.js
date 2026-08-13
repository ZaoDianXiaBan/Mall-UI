import request from '../utils/request'
import { withLoading } from '../utils/loading'

/**
 * 模拟登录接口（后续可替换为真实后端）
 * 任意非空账号密码即可登录
 */
export function login(data) {
  return withLoading(
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const username = data?.username?.trim()
        const password = data?.password?.trim()
        if (!username || !password) {
          reject(new Error('请输入账号和密码'))
          return
        }
        resolve({
          token: `mock-token-${Date.now()}`,
          profile: {
            id: 1,
            username,
          },
        })
      }, 400)
    }),
  )
}

/** 预留真实接口调用示例 */
export function fetchProfile() {
  return request.get('/user/profile')
}
