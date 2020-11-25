<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ editorArticleFrom.classify }}</el-breadcrumb-item>
      <el-breadcrumb-item>修改文章</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card class="box-card">
      <el-input v-model="editorArticleFrom.title" placeholder="请输入标题" class="addtitle" disabled></el-input>

      <ckeditor v-model="editorArticleFrom.article"></ckeditor>
      <el-button type="primary" class="addBut" @click="addArticle">修改文章</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.editorArticleFrom.classify = this.$route.query.classity;
    this.editorArticleFrom.title = this.$route.query.title;
    this.getArticle();
    this.$notify.info({
      title: "提示",
      message: "如果文章没有内容，刷新即可恢复",
    });
  },
  data() {
    return {
      editorArticleFrom: {
        title: "",
        article: "",
        classify: "",
      },
    };
  },
  //监听get参数
  beforeRouteUpdate(to, from, next) {
    this.editorArticleFrom.classify = to.query.classitqqy;
    this.editorArticleFrom.title = to.query.title;
    next();
  },
  methods: {
    //获取文章内容
    async getArticle() {
      const { data: res } = await this.$http.get(`article?article=${this.editorArticleFrom.title}&classify=${this.editorArticleFrom.classify}`);
      if (res.meta.status != 200) return this.$Message.error(res.meta.msg);
      this.editorArticleFrom.article = res.data.content;
    },
    //修改文章
    async addArticle() {
      const { data: res } = await this.$http.put("admin/article", this.editorArticleFrom);
      if (res.meta.status != 200) return this.$Message.error(res.meta.msg);
      this.$notify({
        title: "提示",
        message: res.meta.msg,
        type: "success",
      });
      this.$router.push("/article?classity=" + this.editorArticleFrom.classify);
    },
  },
};
</script>

<style lang="less" scoped>
.addBut {
  margin-top: 15px;
}
.addtitle {
  margin-bottom: 15px;
}
</style>