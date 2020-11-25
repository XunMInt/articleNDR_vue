<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img class="logo" src="" alt />
        <span>防疫网后台管理系统</span>
        <el-button type="info" @click="logout">退出登录</el-button>
      </div>
    </el-header>  
    <!-- 身体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu :default-active="activeItem" class="el-menu-vertical-demo" background-color="#333744" text-color="#fff" active-text-color="#409eff" unique-opened router>
          <el-menu-item index="classity" @click="setActiveItem('classity')">
            <i class="el-icon-menu"></i>
            <span slot="title">分类管理</span>
          </el-menu-item>
          <el-submenu index="article" @click="setActiveItem('article')">
            <template slot="title">
              <i class="el-icon-s-management"></i>
              <span>文章管理</span>
            </template>

            <el-menu-item @click="setActiveItem('article' + '?classity=' + item)" :index="'article' + '?classity=' + item" v-for="(item, index) in classityList" :key="index">{{ item }}</el-menu-item>
          </el-submenu>

          <el-menu-item index="rotation" @click="setActiveItem('rotation')">
            <i class="el-icon-picture"></i>
            <span slot="title">轮播管理</span>
          </el-menu-item>

          <el-menu-item index="account" @click="setActiveItem('account')">
            <i class="el-icon-setting"></i>
            <span slot="title">账号设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 主体区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created() {
    this.activeItem = window.sessionStorage.getItem("activeItem");
    this.getClassityList();
  },
  data() {
    return {
      activeItem: "",
      classityList: [],
    };
  },
  methods: {
    //退出登录
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
      this.$Message("你已退出登录");
    },
    setActiveItem(name) {
      window.sessionStorage.setItem("activeItem", name);
      this.activeItem = name;
    },
    //获取分类数据
    async getClassityList() {
      const { data: res } = await this.$http.get("calssifyList", this.loginForm);
      if (res.meta.status != 200) return this.$Message.error(res.meta.msg);
      this.classityList = res.data.list;
    },
  },
};
</script>

<style lang="less" scoped>
.el-container {
  min-height: 100%;
}

.el-header {
  background-color: #373b41;
  .logo {
    margin-top: 8px;
    width: 45px;
    margin-right: 15px;
  }
  span {
    font-size: 20px;
    color: #fff;
    vertical-align: top;
    line-height: 60px;
  }
  .el-button {
    margin-top: 10px;
    float: right;
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
  .toggle_button {
    font-size: 26px;
    background-color: #4a5064;
    color: #fff;
    text-align: center;
    cursor: pointer;
    i {
      margin-top: 5px;
    }
  }
}

.el-main {
  background-color: #eaedf1;
}
</style>