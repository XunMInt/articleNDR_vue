<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ aritcleQuery.classity }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card class="box-card">
      <el-row>
        <el-col>
          <el-button type="primary" @click="addArticle">添加文章</el-button>
        </el-col>
      </el-row>
      <!-- 文章列表 -->
      <template>
        <el-table :data="articleLsit" style="width: 100%" stripe border>
          <el-table-column prop="id" label="#" width="60"> </el-table-column>
          <el-table-column prop="name" label="文章"> </el-table-column>
          <el-table-column prop="address" label="操作" width="350">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="editorArticle(scope.row.name)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="delArticle(scope.row.name)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="aritcleQuery.pagenum" :page-sizes="[1, 2, 5, 8]" :page-size="aritcleQuery.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total" background> </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.aritcleQuery.classity = this.$route.query.classity;
    window.sessionStorage.setItem("activeItem", "article?classity=" + this.aritcleQuery.classity);
    this.getArticleList();
  },
  //监听get参数
  beforeRouteUpdate(to, from, next) {
    this.aritcleQuery.classity = to.query.classity;
    this.articleLsit = [];
    this.getArticleList();
    next();
  },
  data() {
    return {
      articleLsit: [],
      //查询数据
      aritcleQuery: {
        classity: "",
        pagesize: 8,
        pagenum: 1,
      },
      total: 0,
      size: "",
    };
  },
  methods: {
    async getArticleList() {
      const { data: res } = await this.$http.get(`articleList?classify=${this.aritcleQuery.classity}&pagesize=${this.aritcleQuery.pagesize}&pagenum=${this.aritcleQuery.pagenum}`);
      if (res.meta.status != 200) return this.$Message.error(res.meta.msg);
      this.total = res.data.total;
      this.size = res.data.size;
      let tmpArr = {};
      this.articleLsit = [];
      res.data.list.forEach((ele, index) => {
        tmpArr.id = index + 1;
        tmpArr.name = ele;
        this.articleLsit.push(tmpArr);
        tmpArr = {};
      });
    },
    //设置每页多少条数据
    handleSizeChange(newSize) {
      this.aritcleQuery.pagesize = newSize;
      this.articleLsit = [];
      this.getArticleList();
    },
    //设置页码
    handleCurrentChange(newPage) {
      this.aritcleQuery.pagenum = newPage;
      this.articleLsit = [];
      this.getArticleList();
    },
    //删除文章
    delArticle(title) {
      this.$confirm("文章删除后且不可恢复, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await this.$http.post("admin/delArticle", { classify: this.aritcleQuery.classity, title });
          if (res.meta.status != 204) return this.$Message.error(res.meta.msg);
          this.$Message.success(res.meta.msg);
          setTimeout(() => {
            this.$router.go(0);
          }, 300);
        })
        .catch(() => {
          this.$Message.info("已取消删除");
        });
    },
    //添加文章
    addArticle() {
      this.$router.push("/addArticle?classity=" + this.aritcleQuery.classity);
    },
    //修改文章
    editorArticle(title) {
      this.$router.push("/editorArticle?classity=" + this.aritcleQuery.classity + "&title=" + title);
    },
  },
};
</script>


