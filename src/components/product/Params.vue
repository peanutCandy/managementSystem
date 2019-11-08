<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 警示框 -->
      <el-alert title="注意只允许为第三级分类设置相关参数！" type="warning" effect="dark"></el-alert>
      <!-- 级联选择框 -->
      <span class="demonstration">请选择商品分类:</span>
      <el-cascader
        v-model="selectedKeys"
        :options="cateList"
        :props="{ expandTrigger: 'hover',label:'cat_name',value:'cat_id',children:'children'}"
        @change="handleChange"
      ></el-cascader>
      <!-- tab栏切换模块 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态属性" name="many">
          <el-button type="primary" :disabled="isDisable" @click="showAddDialog">添加属性</el-button>
          <!-- 表格数据展示区 -->
          <el-table :data="manyTableData" style="width: 100%" border strips>
            <el-table-column type="expand"></el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog">修改</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" :disabled="isDisable" @click="showAddDialog">添加属性</el-button>

          <!-- 表格数据展示区 -->
          <el-table :data="onlyTableData" style="width: 100%" border strips>
            <el-table-column type="expand"></el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog">修改</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加属性按钮对话框 -->
    <el-dialog
      :title="'添加'+currentTitle"
      :visible.sync="addAttrDialogVisible"
      width="30%"
      @close="resetForm"
    >
      <el-form :model="attrForm" :rules="attrFormRules" ref="attrFormRef" label-width="100px">
        <el-form-item :label="currentTitle" prop="attr_name">
          <el-input v-model="attrForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addAttrDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAttrs">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改属性按钮对话框 -->
    <el-dialog
      :title="'修改'+currentTitle"
      :visible.sync="editAttrDialogVisible"
      width="30%"
      @close="resetEditForm"
    >
      <el-form
        :model="editAttrForm"
        :rules="attrFormRules"
        ref="editAttrFormRef"
        label-width="100px"
      >
        <el-form-item :label="currentTitle" prop="attr_name">
          <el-input v-model="editAttrForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editAttrDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEditAttrs">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  created() {
    //获取所有商品分类
    this.getCateList();
  },
  data() {
    return {
      cateList: [], //商品分类数据存储
      selectedKeys: [], //级联选项框双向绑定数组
      activeName: "many", //被激活的tab栏名称
      onlyTableData: [], //静态数据
      manyTableData: [], //动态数据
      addAttrDialogVisible: false, //控制对话框显示隐藏
      attrForm: {
        attr_name:''
      },
      attrFormRules: {
        attr_name: [
          { required: true, message: "属性名不能为空", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度需要在2到15个字符之间",
            trigger: "blur"
          }
        ]
      },
      editAttrDialogVisible: false,
      editAttrForm: {
        attr_name: ""
      }
    };
  },
  methods: {
    async getCateList() {
      //获取商品分类数据
      const { data: res } = await this.$http.get("categories");
      if (res.meta.status != 200) return this.$message.error("获取数据失败");
      this.cateList = res.data;
    },
    //级联框发生变化时触发事件
    handleChange() {
      this.getParamsData();
    },
    //tab栏切换时触发事件
    handleClick() {
      this.getParamsData();
    },
    async getParamsData() {
      if (this.selectedKeys.length != 3) return (this.selectedKeys = []);
      //如果用户选的时三级分类，我们需要区请求选中的三级分类对应的参数
      const { data: res } = await this.$http.get(
        `categories/${this.cateID}/attributes`,
        {
          params: { sel: this.activeName }
        }
      );
      if (this.activeName == "only") {
        this.onlyTableData = res.data; //赋值静态属性
      } else {
        this.manyTableData = res.data; //赋值动态属性
      }
    },
    //动态属性添加按钮触发事件
    showAddDialog() {
      this.addAttrDialogVisible = true;
    },
    //清空弹出框数据
    resetForm() {
      this.$refs.attrFormRef.resetFields();
    },
    saveAttrs() {
      this.$refs.attrFormRef.validate(async valid => {
        const { data: res } = await this.$http.post(
          `categoties/${this.cateID}/attributes`,
          { attr_name: this.attrForm.attr_name, attr_sel: this.activeName }
        );
        console.log(res)
        if (res.meta.status != 200) return this.$message.error("添加属性失败");
        this.addAttrDialogVisible = false;
        this.getParamsData(); //重新获取数据列表
      });
    },
    showEditDialog() {
      this.editAttrDialogVisible = true;
    },
    resetEditForm() {
      this.$refs.editAttrFormRef.resetFields();
    },
    saveEditAttrs() {}
  },
  computed: {
    isDisable: function() {
      return this.selectedKeys.length != 3;
    },
    cateID: function() {
      if (this.selectedKeys.length == 3) {
        return this.selectedKeys[2];
      } else {
        return null;
      }
    },
    currentTitle: function() {
      if (this.activeName == "only") {
        return "静态属性";
      } else {
        return "动态属性";
      }
    }
  }
};
</script>

<style scope lang="less">
</style>