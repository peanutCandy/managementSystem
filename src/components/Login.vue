<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 表单区 -->
      <el-form
        ref="loginFormRef"
        label-width="0"
        class="login_form"
        :model="loginForm"
        :rules="loginFormRules"
      >
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-3702mima"
            type="password"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { log } from "util";
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456"
      },
      // 验证规则
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度3到10个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度6到16个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    reset() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      //登录按钮验证，验证失败return结束代码，验成功收集表单数据传回服务端处理
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return this.$message.error("验证失败");
        
        const { data: res } = await this.$http.post("login", this.loginForm);
        if (res.meta.status != 200)
          return this.$message.error("用户名或密码错误  ");
        this.$message.success("登录成功");
        //存储token值，跳转首页
        window.sessionStorage.setItem("token", res.data.token);
        this.$router.push("/home");
      })
    }
  }
}
</script>
<style scoped lang="less">
.login_container {
  background: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 540px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    width: 130px;
    heighe: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    background-color: #fff;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .login_form {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>