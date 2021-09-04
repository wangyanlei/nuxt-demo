<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <!-- <a href="">Have an account?</a> -->
            <nuxt-link v-if="isLogin" to="/register"
              >Need an account?</nuxt-link
            >
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <!-- 表单报错提示 -->
          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="index">
                {{ field }} {{ message }}
              </li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <!-- 登录页面不展示该字段 -->
            <!-- 用户名 -->
            <fieldset v-if="!isLogin" class="form-group">
              <input
                v-model="user.username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                required
              />
            </fieldset>
            <!-- 邮箱 -->
            <fieldset class="form-group">
              <input
                v-model="user.email"
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                required
              />
            </fieldset>
            <!-- 密码 -->
            <fieldset class="form-group">
              <input
                v-model="user.password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                required
              />
            </fieldset>
            <!-- 根据登录和注册展示不同的文本 -->
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user";
// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'notAuthenticated',
  name: "LoginIndex",
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      errors: null,
    };
  },
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },
  methods: {
    async onSubmit() {
      try {
        const { data } = await (this.isLogin
          ? login({
              user: this.user,
            })
          : register({
              user: this.user,
            }));

        // 保存用户的登录状态
        this.$store.commit('setUser', data.user)

        // 防止刷新页面数据丢失，需要把数据持久化
        Cookie.set('user', JSON.stringify(data.user))

        // 注册或登录成功后，跳转到首页
        this.$router.replace({
          path: "/",
        });
      } catch (err) {
        this.errors = err.response.data.errors;
      }
    },
  },
};
</script>

<style>
</style>