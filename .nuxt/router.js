import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _480559ae = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _f0adb73a = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _6db3b065 = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _aea008b6 = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _02e0ecb2 = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _3c367ff1 = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _e10b821c = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _480559ae,
    children: [{
      path: "",
      component: _f0adb73a,
      name: "home"
    }, {
      path: "/login",
      component: _6db3b065,
      name: "login"
    }, {
      path: "/register",
      component: _6db3b065,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _aea008b6,
      name: "profile"
    }, {
      path: "/settings",
      component: _02e0ecb2,
      name: "setting"
    }, {
      path: "/editor",
      component: _3c367ff1,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _e10b821c,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
