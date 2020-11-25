<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ addArticleFrom.classify }}</el-breadcrumb-item>
      <el-breadcrumb-item>添加文章</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card class="box-card">
      <el-input v-model="addArticleFrom.title" placeholder="请输入标题" class="addtitle"></el-input>
      <ckeditor v-model="addArticleFrom.article"></ckeditor>
      <el-button type="primary" class="addBut" @click="addArticle">添加文章</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.addArticleFrom.classify = this.$route.query.classity;
  },
  data() {
    return {
      addArticleFrom: {
        title: "",
        article: "",
        classify: "",
      },
    };
  },
  //监听get参数
  beforeRouteUpdate(to, from, next) {
    this.addArticleFrom.classify = to.query.classitqqy;
    next();
  },
  methods: {
    async addArticle() {
      const { data: res } = await this.$http.post("admin/article", this.addArticleFrom);
      if (res.meta.status != 201) return this.$Message.error(res.meta.msg);
      this.$notify({
        title: "提示",
        message: res.meta.msg,
        type: "success",
      });
      this.$router.push("/article?classity=" + this.addArticleFrom.classify);
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