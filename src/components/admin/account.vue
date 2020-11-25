<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账号设置</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片试图 -->
    <el-card class="box-card">
      <el-form label-width="80px" label-position="top">
        <el-form-item label="用户名">
          <el-input v-model="editiFrom.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="旧密码">
          <el-input v-model="editiFrom.password" type="password" autocomplete="new-password"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="editiFrom.newPassword" type="password" autocomplete="new-password"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="editPassword">确定修改</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.editiFrom.username = window.sessionStorage.getItem("username");
  },
  data() {
    return {
      editiFrom: {
        username: "",
        password: "",
        newPassword: "",
      },
    };
  },
  methods: {
    //修改密码
    async editPassword() {
      const { data: res } = await this.$http.post("admin/passwordChange", this.editiFrom);
      if (res.meta.status != 200) return this.$Message.error(res.meta.msg);
      this.$Message.success(res.meta.msg);
      sessionStorage.removeItem("token");
      setTimeout(() => {
        this.$router.go(0);
      }, 300);
    },
  },
};
</script>

<style lang="less" scoped>
</style>