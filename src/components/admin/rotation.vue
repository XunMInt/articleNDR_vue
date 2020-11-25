<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>轮播管理</el-breadcrumb-item>
      <el-breadcrumb-item>轮播列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card class="box-card">
      <el-row>
        <el-col>
          <el-button type="primary" @click="addVisible = true">添加轮播</el-button>
        </el-col>
      </el-row>
      <el-table :data="rotationList" style="width: 100%" stripe border>
        <el-table-column prop="id" label="#" width="60"> </el-table-column>
        <el-table-column prop="rotation" label="轮播图"> </el-table-column>
        <el-table-column prop="address" label="操作" width="350">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delRotation(scope.row.rotation)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加轮播图对话框 -->
      <el-dialog title="添加轮播图" :visible.sync="addVisible" width="40%" @close="dialogClose">
        <!-- 对话框内容区 -->
        <el-form ref="form" :model="addForm" label-width="90px">
          <el-form-item label="轮播图名称">
            <el-input v-model="addForm.rotation"></el-input>
          </el-form-item>
          <el-form-item label="图像URL">
            <el-input v-model="addForm.img"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRotation">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.getRotationList();
  },
  data() {
    return {
      addVisible: false,
      rotationList: [],
      addForm: {
        rotation: "",
        img: "",
      },
    };
  },
  methods: {
    //获取轮播图列表
    async getRotationList() {
      const { data: res } = await this.$http.get("rotation");
      if (res.meta.status != 200) return this.$Message.error(res.meta.msg);
      this.rotationList = res.data.list;
      let tmpArr = {};
      this.rotationList.forEach((ele, index) => {
        ele.id = index + 1;
      });
    },
    //关闭对话框事件
    dialogClose() {
      this.addVisible = false;
    },
    //添加轮播图
    async addRotation() {
      const { data: res } = await this.$http.post("/admin/rotation", this.addForm);
      if (res.meta.status != 201) return this.$Message.error(res.meta.msg);
      this.$Message.success(res.meta.msg);
      this.getRotationList();
      this.addForm.rotation = "";
      this.addForm.img = "";
      this.addVisible = false;
    },
    //删除轮播图
    delRotation(rotation) {
      this.$confirm("轮播图删除后且不可恢复, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await this.$http.post("/admin/delRotation", { rotation });
          if (res.meta.status != 204) return this.$Message.error(res.meta.msg);
          this.$Message.success(res.meta.msg);
          this.getRotationList();
        })
        .catch(() => {
          this.$Message.info("已取消删除");
        });
    },
  },
};
</script>