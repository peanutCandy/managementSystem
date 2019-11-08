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
    <el-dialog title="提示" :visible.sync="addCateDialogVisible" width="50%" @close="resetCateForm">
      <!-- 弹框表单区 -->
      <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader
            v-model="selectedKeys"
            :options="parentCateList"
            :props="{expandTrigger:'hover',label:'cat_name',value:'cat_id',checkStrictly:true}"
            clearable
            @change="cascaderChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCate">确 定</el-button>
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
      addCateDialogVisible: false,
      addCateForm: {
        cat_name: "",
        cat_pid: 0,
        cat_level: 0
      },
      addCateFormRules: {
        cat_name: [
          { required: true, message: "分类名称不能为空", trigger: "blur" },
          { min: 3, max: 15, message: "分类名称不能为空", trigger: "blur" }
        ]
      },
      parentCateList: [],
      selectedKeys: []
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
      this.getParentsCateList();
    },
    async getParentsCateList() {
      const { data: res } = await this.$http.get("categories", {
        params: { type: 2 }
      });
      console.log(res);
      if (res.meta.status != 200) return this.$message.error("获取失败");
      this.parentCateList = res.data;
    },
    cascaderChange() {
      if (this.selectedKeys.length == 0) {
        this.addCateForm.cat_pid = 0;
      } else {
        this.addCateForm.cat_pid ==
          this.selectedKeys[this.selectedKeys.length - 1];
      }
      this.addCateForm.cat_level = this.e = selectedKeys.length;
    },
    resetCateForm() {
      this.$refs.addCateFormRef.resetFields();
      this.selectedKeys = [];
      this.addCateForm.cat_pid = 0;
      this.addCateForm.cat_level = 0;
    },
    async saveCate() {
      const { data: res } = await this.$http.post(
        "categories",
        this.addCateForm
      );
      if (res.meta.status != 200) return this.$message.error("添加失败");
      this.getCateList();
      this.addCateDialogVisible = false;
    }
  }
};
</script>
<style scoped lang="less">

</style>