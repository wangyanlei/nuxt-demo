<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <!-- 文章标题 -->
        <h1>{{ article.title }}</h1>
        <article-meta :article="article"></article-meta>
      </div>
    </div>

    <div class="container page">
      <!-- 文章内容 -->
      <div class="row article-content">
        <div class="col-md-12">
          {{ article.body }}
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article"></article-meta>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comments :article="article"></article-comments>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import ArticleMeta from './components/article-meta.vue'
import articleMeta from './components/article-meta.vue';
import ArticleComments from './components/article-comments.vue';

export default {
  components: { articleMeta, ArticleComments },
  name: "articleIndex",
  async asyncData ({ params }) {
    const { data } = await getArticle(params.slug)

    return {
      article: data.article
    }
  },
  comments: {
    ArticleMeta
  },
  head () {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        { hid: 'description', name: 'description', content: this.article.description }
      ]
    }
  }
};
</script>

<style>
</style>