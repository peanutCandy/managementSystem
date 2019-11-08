<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <el-button type="primary">添加角色</el-button>
      <!-- 角色列表区域 -->
      <el-table :data="rolesList" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row v-for="item1 in scope.row.children" :key="item1.id" class="level_one">
              <!-- 一级标题 -->
              <el-col :span="5">
                <el-tag>{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row v-for="item2 in item1.children" :key="item2.id">
                  <!-- 二级标题 -->
                  <el-col :span="5">
                    <el-tag type="success">{{item1.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级标题 -->
                  <el-col :span="19">
                    <el-tag
                      closable
                      @close="removeRightsById(scope.row.id,item3.id)"
                      type="danger"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>

        <el-table-column type="index" label="编号"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="showSetDialog(scope.row)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限对话框 -->
    <el-dialog title="分配权限" :visible.sync="rightDialogVisible" width="50%">
      <!-- 树形控件 -->
      <el-tree
        :data="rightList"
        :props="defaultProps"
        node-key="id"
        :default-checked-keys="defKeys"
        show-checkbox
        degault-expand-all
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="rightDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  created() {
    this.getRolesList();
  },
  data() {
    return {
      rolesList: [], //所有角色列表数据
      rightDialogVisible: false, //控制对话框的显示隐藏
      rightList: [], //所有权限的数据
      //树形控件的属性绑定控件
      defaultProps: {
        children: "children",
        label: "authName"
      },
      defKeys: [] //默认被选中的节点ID值
    };
  },
  methods: {
    //获取角色列表
    async getRolesList() {
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status != 200)
        return this.$message.error("获取橘色列表失败");
      //将数据保存到data数据列表中
      this.rolesList = res.data;
    },
    //根据ID删除分类
    removeRightsById(roleId, rightId) {
      this.$confirm("此操作将删除该用户权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { data: res } = await this.$http.delete(
            `roles/${roleId}/rights/${rightId}`
          );
          if (res.meta.status != 200) return this.$message.error("删除失败");
          this.getRolesList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //展示分配权限对话框
    async showSetDialog(role) {
      //获取所有权限数据
      const { data: res } = await this.$http.get(`rights/tree`);
      console.log(res.data);
      if (res.meta.status != 200)
        return this.$message.error("请求权限数据失败");
      //获取到的权限数据保存到Data中
      this.rightList = res.data;
      //通过递归形式，获取角色下所有的三级权限的ID，并保存到defKeys数组中。
      var keys = [];
      function getId(obj) {
        obj.children.forEach(item => {
          if (item.children) {
            getId(item);
          } else {
            keys.push(item.id);
          }
        });
        getId(role);
      }
      this.defKeys = keys;
      this.rightDialogVisible = true;
    }
  }
};
</script>
<style scoped lang="less">
.el-row {
  margin-bottom: 10px;
}
.level_one {
  border-bottom: 1px solid #ccc;
}
</style>