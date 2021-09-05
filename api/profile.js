import { request } from '@/plugins/request'

// 获取用户资料
export const getProfile = username => {
  return request({
    method: 'GET',
    url: `/api/profiles/${username}`
  })
}