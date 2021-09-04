/**
 * 已经是登录态，不需要再登录的中间件
 */
 export default function ({ store, redirect }) {
  if (store.state.user) {
    return redirect('/')
  }
}