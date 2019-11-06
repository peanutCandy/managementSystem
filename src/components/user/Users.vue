<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-row :gutter="20">
        <!-- 搜索框 -->
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="14">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 数据表格区域 -->
      <el-table :data="usersList" border stripe align="center" header-align="center">
        <el-table-column label="索引" type="index"></el-table-column>
        <el-table-column label="姓名" prop="username" width="100px"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserById(scope.row.id)"
            ></el-button>
            <el-tooltip
              class="item"
              effect="dark"
              content="角色分配"
              placement="top"
              :enterable="false"
            >
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页栏 -->
      <!-- size-change设置每一页的数据条数 -->
      <!-- current-change设置当前是第几页 -->
      <!-- current-page设置当前是第几页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加用户弹出框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addFormClose">
      <!-- 添加用户表单 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑用户弹出框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="editDialogClose">
      <!-- 修改用户表单 -->
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      var regEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (!regEmail.test(value)) {
        return callback(new Error("邮箱不合法"));
      }
      callback();
    };
    var checkMobile = (rule, value, callback) => {
      var regMobile = /^1(3|4|5|6|7|8|9)\d{9}$/;
      if (!regMobile.test(value)) {
        return callback(new Error("电话号码不合法"));
      }
      callback();
    };
    return {
      queryInfo: {
        query: "", //查询关键字
        pagenum: 1, //页码
        pagesize: 2 //数据条数
      },
      usersList: [], //用户数据列表
      total: 0,
      //控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      //添加用户的表单数据
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      //添加用户校验规则
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 15, message: "长度在3到15之间", trigger: "bulr" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在6到18之间", trigger: "bulr" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validate: checkEmail, trigger: "blur" }
        ],
        moblie: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validate: checkMobile, trigger: "blur" }
        ]
      },
      //控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      //查询到的用户信息对象
      editForm: {},
      //修改表单的验证规则对象
      editFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 15, message: "长度在3到15之间", trigger: "bulr" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: blur }
        ],
        moblie: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: blur }
        ]
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("users", {
        params: this.queryInfo
      });
      if ((res.meta, (status = !200)))
        return this.$message.error("获取数据失败");
      this.usersList = res.data.users;
      this.total = res.data.total;
      console.log(this.usersList);
      console.log(this.total);
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    async userStateChange(userinfo) {
      const { data: res } = await this.$http.put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      );
      if (res.meta.status != 200) return this.$message.error("修改失败");
      this.$message.success("修改成功");
    },
    addFormClose() {
      this.$refs.addFormRef.resetFields();
    },
    //点击添用户确认按钮触发事件
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return console.log("表单校验失败");
        console.log("表单校验成功");
        const { data: res } = await this.$http.post("users", this.addForm);
        if (res.meta.status != 201) return this.$message.error("添加失败");
        this.getUserList();
        this.addDialogVisible = false;
      });
    },
    async showEditDialog(id) {
      const { data: res } = await this.$http.get(`users/${id}`);
      if (res.meta.status != 200)
        return this.$message.error("获取用户信息失败");
      this.editForm = res.data;
      console.log(res);
      this.editDialogVisible = true; //让编辑对话框显示
    },
    //修改用户对话框的关闭事件
    editDialogClose() {
      this.$refs.editFormRef.resetFields();
    },
    //修改用户提交信息
    editUserInfo() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return console.log("验证失败");
        console.log("通过验证");
        const { data: res } = await this.$http.put(
          `users/${this.editForm.id}`,
          {
            email: this.editForm.email,
            mobile: this.editForm.mobile
          }
        );
        if (res.meta.status != 200) return this.$message.error("修改失败");
        this.editDialogVisible = false;
        this.getUserList();
      });
    },
    //根据ID删除对应的用户信息
    removeUserById(id) {
      //弹框询问用户是否删除用户
      const confirmResult = this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(async () => {
          const { data: res } = await this.$http.delete(`users/${id}`);
          if (res.meta.status != 200) return this.$message.error("修改失败");
          this.$message.success("删除成功");
          this.queryInfo.pagenum = 1;//删除完成后跳转到用户列表第一页
          this.getUserList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style scoped lang="less">
</style>