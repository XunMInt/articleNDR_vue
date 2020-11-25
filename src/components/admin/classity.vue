<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card class="box-card">
      <el-row>
        <el-col>
          <el-button type="primary" @click="addClassityVisible = true">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 分类列表 -->
      <template>
        <el-table :data="classityList" style="width: 100%" stripe border>
          <el-table-column prop="id" label="#" width="60"> </el-table-column>
          <el-table-column prop="name" label="分类名称"> </el-table-column>
          <el-table-column prop="address" label="操作" width="350">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="visibleClassity(scope.row.name)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="delClassity(scope.row.name)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>

    <!-- 修改分类对话框 -->
    <el-dialog title="修改分类" :visible.sync="editClassityVisible" width="40%" @close="editClassityVisible = false">
      <!-- 对话框内容区 -->
      <el-form ref="form" :model="editForm" label-width="90px">
        <el-form-item label="新分类名称">
          <el-input v-model="editForm.newClassify"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editClassityVisible = false">取 消</el-button>
        <el-button type="primary" @click="editorClassity">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类" :visible.sync="addClassityVisible" width="40%" @close="dialogClose">
      <!-- 对话框内容区 -->
      <el-form ref="form" :model="addForm" label-width="90px">
        <el-form-item label="分类名称">
          <el-input v-model="addForm.classify"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addClassityVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClassity">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
    window.sessionStorage.setItem("activeItem", "classity");
    this.getClassityList();
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      classityList: [],
      editClassityVisible: false,
      addClassityVisible: false,
      editForm: {
        classify: "",
        newClassify: "",
      },
      addForm: {
        classify: "",
      },
    };
  },
  methods: {
    //获取分类数据
    async getClassityList() {
      const { data: res } = await this.$http.get("calssifyList");
      if (res.meta.status != 200) return this.$Message.error(res.meta.msg);
      let tmpArr = {};
      res.data.list.forEach((ele, index) => {
        tmpArr.id = index + 1;
        tmpArr.name = ele;
        this.classityList.push(tmpArr);
        tmpArr = {};
      });
    },
    visibleClassity(name) {
      this.editClassityVisible = true;
      this.editForm.classify = name;
      this.editForm.newClassify = name;
    },
    //编辑分类名称
    async editorClassity() {
      const { data: res } = await this.$http.put("admin/classify", this.editForm);
      if (res.meta.status != 200) return this.$Message.error(res.meta.msg);
      this.$Message.success(res.meta.msg);
      this.editClassityVisible = false;
      setTimeout(() => {
        this.$router.go(0);
      }, 300);
    },
    //添加分类
    async addClassity() {
      if(this.classityList.length>=5) return this.$Message.error("分类最多为5个");
      const { data: res } = await this.$http.post("admin/classify", this.addForm);
      if (res.meta.status != 201) return this.$Message.error(res.meta.msg);
      this.$Message.success(res.meta.msg);
      this.addClassityVisible = false;
      setTimeout(() => {
        this.$router.go(0);
      }, 300);
    },
    //对话框关闭
    dialogClose() {
      this.addClassityVisible = false;
      this.addForm.classify = "";
    },
    //删除分类
    delClassity(classify) {
      this.$confirm("分类下的文章将会被清空, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await this.$http.post("admin/delClassify", { classify });
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
  },
};
</script>