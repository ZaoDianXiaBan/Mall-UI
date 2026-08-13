import request from '../utils/request'

/**
 * 登录：对接 mall-auth /auth/login
 */
export function login(data) {
  return request.post('/auth/login', data).then((res) => ({
    token: res.token,
    profile: {
      id: res.userId,
      username: res.username,
      nickname: res.nickname,
    },
  }))
}

/**
 * 会员分页：对接 mall-user（管理能力预留）
 */
export function fetchMembers(params) {
  return request.get('/user/members', { params })
}
