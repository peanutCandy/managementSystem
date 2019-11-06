<template>
  <el-container class="home_container">
    <el-header>
      <div class="left">
        <img src="../assets/heima.png" alt />
        <h3>电商后台管理系统</h3>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse?'64px':'200px'">
        <!-- 左侧导航栏 -->
        <div class="toggle-btn" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="skyblue"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router

        >
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i class="iconfont" :class="iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item
              :index="'/'+subitem.path"
              v-for="subitem in item.children"
              :key="subitem.id"
            >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{subitem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容区 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: "home",
  created() {
    this.getMenuList();
    // this.activePath = window.sessionStorage.getItem('activePath')
  },
  data() {
    return {
      menuList: [],
      iconsObj: {
        125: "icon-users",
        103: "icon-tijikongjian", 
        101: "icon-3702mima",
        102: "icon-danju",
        145: "icon-baobiao"
      },
      isCollapse: false
    };
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    async getMenuList() {
      // 获取左侧导航栏数据
      const { data: res } = await this.$http.get("menus");
      //判断数据是否接受成功
      if (res.meta.status != 200) return this.$message.error("获取数据失败");
      //   将数据加载到本地数据中
      this.menuList = res.data;
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>
<style scoped lang="less">
.home_container {
  height: 100%;
  .el-aside {
    background: #333744;
  }
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0;
    .left {
      color: #fff;
      font-size: 20px;
      display: flex;
      align-items: center;
      img {
        margin-right: 10px;
      }
      h3 {
        font-weight: normal;
      }
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
}
</style>