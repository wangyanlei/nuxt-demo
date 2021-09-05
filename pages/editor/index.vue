<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset :disabled="pending">
              <fieldset class="form-group">
                <!-- 标题 -->
                <input
                  v-model="title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <!-- 描述 -->
              <fieldset class="form-group">
                <input
                  v-model="description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <!-- 内容 -->
              <fieldset class="form-group">
                <textarea
                  v-model="body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <!-- 标签 -->
              <fieldset class="form-group">
                <input
                  v-model="tags"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                @click="onPublish"
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle } from "@/api/article";

export default {
  middleware: "authenticated",
  name: "editorIndex",
  data() {
    return {
      pending: false,
      title: "",
      description: "",
      body: "",
      tags: "",
    };
  },
  methods: {
    async onPublish() {
      this.pending = true
      try {
        await this.createArticle();
      } catch(err) {
        this.pending = false
        console.error(err)
      }
    },
    async createArticle() {
      const { title, description, body, tagList } = this
      if (!title || !description || !body) {
        return Promise.reject('参数不正确')
      }
      const params = {
        article: {
          title: this.title,
          description: this.description,
          body: this.body,
          tagList: this.tags.split(/\s+/),
        },
      };
      const { data } = await createArticle(params);
      this.$router.push ({
        name: 'article',
        params: {
          slug: data.article.slug
        }
      })
    },
  },
};
</script>

<style>
</style>