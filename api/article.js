import { request } from '@/plugins/request'

/**
 * 发表新文章
 * @param {object} data
 * @param data.title
 * @param data.description
 * @param data. body
 * @param data.tagList
 * @returns 
 */
export const createArticle = data => {
  return request({
    method: 'POST',
    url: '/api/articles',
    data
  })
}

export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

export const getArticleTags = () => {
  return request({
    method: 'GET',
    url: '/api/tags'
  })
}

export const getFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })
}

// 点赞
export const addFavorite = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

// 取消点赞
export const deleteFavorite = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}

// 获取文章详情
export const getArticle = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

// 获取评论列表
export const getComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}

// 添加评论
export const addComment = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`
  })
}
