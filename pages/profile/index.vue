<template>
  <div class="profile-page">
    <div v-if="user" class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="user.image" class="user-img" />
            <h4>{{ user.username }}</h4>
            <p>
              {{ user.bio }}
            </p>
            <!-- 当前用户的个人中心，展示编辑资料按钮 -->
            <nuxt-link
              v-if="user.username === $store.state.user.username"
              class="btn btn-sm btn-outline-secondary action-btn"
              to="/settings"
            >
              <i class="ion-gear-a"></i> Edit Profile Settings</nuxt-link
            >
            <!-- 其他用户的个人中心，展示关注按钮 -->
            <button v-else class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp; Follow {{ user.username }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <!-- 切换文章类型 -->
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :to="{
                    name: 'profile',
                    params: {
                      username: user.username,
                    },
                  }"
                >
                  My Articles
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :to="{
                    name: 'profile',
                    params: {
                      username: user.username,
                      articletype: 'favorites',
                    },
                  }"
                >
                  Favorited Articles
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div
            v-for="(article, index) in articles"
            :key="index"
            class="article-list"
          >
            <div class="article-preview">
              <div class="article-meta">
                <nuxt-link
                  class="author"
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                ></nuxt-link>
                <div class="info">
                  <nuxt-link
                    class="author"
                    :to="{
                      name: 'profile',
                      params: {
                        username: article.author.username,
                      },
                    }"
                  ></nuxt-link>
                  <span class="date"
                    >{{ article.createdAt | date("MMM DD") }}th</span
                  >
                </div>
                <button
                  class="btn btn-outline-primary btn-sm pull-xs-right"
                  :class="{ active: article.favorited }"
                  @click="onFavorite(article)"
                >
                  <i class="ion-heart"></i> {{ article.favoritesCount }}
                </button>
              </div>
              <nuxt-link
                class="preview-link"
                :to="{
                  name: 'article',
                  params: {
                    slug: article.slug,
                  },
                }"
              >
                <h1>{{ article.title }}</h1>
                <p>{{ article.description }}</p>
                <span>Read more...</span>
                <ul class="tag-list">
                  <li
                    v-for="tag in article.tagList"
                    :key="tag"
                    class="tag-default tag-pill tag-outline"
                  >
                    {{ tag }}
                  </li>
                </ul>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfile } from "@/api/profile";
import { getArticles, addFavorite, deleteFavorite } from "@/api/article";

export default {
  middleware: "authenticated",
  name: "profileIndex",
  async asyncData({ params }) {
    const { data } = await getProfile(params.username);
    const { data: articlesData } = await getArticles({
      author: params.username,
    });

    const { articles } = articlesData;
    articles.forEach((article) => {
      article.favoriteDisabled;
      article.tagList.filter((item) => !!item);
    });

    return {
      user: data.profile,
      articles: articles,
    };
  },
  methods: {
    async onFavorite(article) {
      if (article.favoriteDisabled) return;

      try {
        article.favoriteDisabled = true;
        if (article.favorited) {
          await deleteFavorite(article.slug);
          article.favorited = false;
          article.favoritesCount -= 1;
        } else {
          await addFavorite(article.slug);
          article.favorited = true;
          article.favoritesCount += 1;
        }
      } finally {
        article.favoriteDisabled = false;
      }
    },
  },
};
</script>

<style>
</style>