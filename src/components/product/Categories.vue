<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-button type="primary" @click="addCate">添加分类</el-button>
      <!-- 分类表格 -->
      <tree-table
        :data="catelist"
        :columns="columns"
        :expand-type="false"
        :selection-type="false"
        border
        stripe
        show-index
        index-text="#"
      >
        <template slot="isDeleted" slot-scope="scope">
          <i class="el-icon-success" style="color:green;" v-if="scope.row.cat_deleted == false"></i>
          <i class="el-icon-error" style="color:red;" v-else></i>
        </template>

        <template slot="level" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level == 0">一级</el-tag>
          <el-tag type="success" size="mini" v-else-if="scope.row.cat_level == 1">二级</el-tag>
          <el-tag type="info" size="mini" v-else>三级</el-tag>
        </template>

        <template slot="option" slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
        </template>
      </tree-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加分类对话框 -->
    <el-dialog title="提示" :visible.sync="addCateDialogVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCateDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  created() {
    this.getCateList();
  },
  data() {
    return {
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 2
      },
      //商品分类列表数据，默认为空
      catelist: [],
      total: 0, //数据总条数
      columns: [
        {
          prop: "cat_name",
          label: "分类列表"
        },
        {
          prop: "cat_deleted",
          label: "是否有效",
          type: "template", //表示当前这一列自定义模板列
          template: "isDeleted" //具名slot
        },
        {
          prop: "cat_level",
          label: "排序",
          type: "template",
          template: "level"
        },
        {
          label: "操作",
          type: "template",
          template: "option"
        }
      ],
      //   pagesize:
      addCateDialogVisible: false
    };
  },
  methods: {
    //获取商品分类数据
    async getCateList() {
      const { data: res } = await this.$http.get("categories", {
        params: this.queryInfo
      });
      if (res.meta.status != 200) return this.$message.error("获取列表失败");
      //将分类数据保存到DATA中catelist数组中。
      this.catelist = res.data.result;
      this.total = res.data.total;
    },
    handleSizeChange(pagesize) {
      this.queryInfo.pagesize = pagesize;
      this.getCateList();
    },
    handleCurrentChange() {
      this.queryInfo.pagenum = pagenum;
      this.getCateList();
    },
    addCate() {
      this.addCateDialogVisible = true;
    }
  }
};
</script>
<style scoped lang="less">
</style>