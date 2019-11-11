<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 消息提示框 -->
      <el-alert title="添加商品信息" type="info" center show-icon :closable="false"></el-alert>
      <!-- 步骤条 -->
      <el-steps :space="200" :active="activeIndex-0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="动态属性"></el-step>
        <el-step title="静态属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- tab栏 -->
      <el-form
        :model="addForm"
        :rules="addFormRule"
        ref="addFormRef"
        label-width="100px"
        label-position="top"
      >
        <el-tabs
          v-model="activeIndex"
          tab-position="left"
          style="right: 200px;"
          :before-leave="beforeLeave"
          @tab-click="tabClicked"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <!-- 级联选择器 -->
              <el-cascader
                expand-trigger="hover"
                :options="catelist"
                :props="cateProps"
                @change="handleChange"
                v-model="addForm.goods_cat"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <!-- 动态属性 -->
          <el-tab-pane label="动态属性" name="1">
            <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id">
              <!-- 循环遍历渲染复选框 -->
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox :label="cb" v-for="(cb,i) in item.attr_vals" :key="i" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <!-- 静态属性 -->
          <el-tab-pane label="静态属性" name="2">
            <el-form-item :label="item.attr_name" v-for="item in onlyTableData" :key="item.attr_id">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <!-- 文件上传 -->
          <el-tab-pane label="商品图片" name="3">
            <!-- action表示文件上传的路径 on-preview表示点击文件列表名字触发事件 on-remove表示点击文件列表右上角x触发事件 -->
            <el-upload
              :action="fileURL"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  created() {
    this.getCateList();
  },
  data() {
    return {
      activeIndex: "0", //TAB栏第几栏
      addForm: {
        //添加商品表单数据对象
        goods_name: "", //商品名称
        goods_price: 0, //商品价格
        goods_weight: 0, //商品重量
        goods_number: 0, //商品数量
        goods_cat: [] //选中商品分类
      },
      //表单验证规则
      addFormRule: {
        //
        goods_name: [
          {
            required: true,
            message: "请输入商品名称",
            trigger: "blur"
          },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        goods_price: [
          {
            required: true,
            message: "请输入商品价格",
            trigger: "blur"
          }
        ],
        goods_weight: [
          {
            required: true,
            message: "请输入商品重量",
            trigger: "blur"
          }
        ],
        goods_number: [
          {
            required: true,
            message: "请输入商品数量",
            trigger: "blur"
          }
        ],
        goods_cat: [
          {
            required: true,
            message: "请选择商品分类",
            trigger: "blur"
          }
        ]
      },
      catelist: [], //商品分类数据
      cateProps: {
        //配置级联列表参数
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      manyTableData: [], //动态参数列表
      onlyTableData: [], //静态参数列表
      fileURL: "http://127.0.0.1:8888/api/private/v1/upload" //文件上传路径
    };
  },
  methods: {
    //获取所有商品分类
    async getCateList() {
      const { data: res } = await this.$http.get("categories");
      if (res.meta.status !== 200)
        return this.$message.error("获取商品分类数据失败");
      this.catelist = res.data;
    },
    //当选择器发升变化时触发事件
    handleChange() {
      //判断当前选中的是不时列表第三级元素，如果不是三级元素将级联列表清空
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = [];
      }
    },
    //tab栏切换时触发的钩子函数
    beforeLeave(activeNaem, oldActiveName) {
      //activeNaem表示tab要切换到的面板
      //oldActiveName表示tab栏要离开的面板
      //当tab栏中商品分类未选择阻止tab栏切换
      if (oldActiveName === "0" && this.addForm.goods_cat.length !== 3) {
        this.$message.error("请选择商品分类再进行跳转");
        return false;
      }
    },
    // 当tab栏任意选项被单击时触发事件
    async tabClicked() {
      //当tab切换为动态属性时执行
      if (this.activeIndex === "1") {
        const { data: res } = await this.$http.get(
          `categories/${this.cateID}/attributes`,
          { params: { sel: "many" } }
        );
        if (res.meta.status !== 200)
          return this.$message.error("获取动态参数失败");
        //将动态参数对象中的attr_vals元素分割为数组
        res.data.forEach(item => {
          item.attr_vals =
            item.attr_vals.length === 0 ? [] : item.attr_vals.split(",");
        });
        this.manyTableData = res.data;
      } else if (this.activeIndex === "2") {
        //当tab切换为静态属性时执行
        const { data: res } = await this.$http.get(
          `categories/${this.cateID}/attributes`,
          { params: { sel: "only" } }
        );
        if (res.meta.status !== 200)
          return this.$message.error("获取静态参数失败");
        this.onlyTableData = res.data;
      }
    },
    //表示点击文件列表名字触发事件
    handlePreview() {},
    //表示点击文件列表右上关闭按钮触发事件
    handleRemove() {}
  },
  computed: {
    //用于获取选中分类列表第三级参数ID值
    cateID() {
      if (this.addForm.goods_cat.length === 3) return this.addForm.goods_cat[2];
      return null;
    }
  }
};
</script>
<style scoped lang="less">
.el-checkbox {
  margin: 0 10px 0 0 !important;
}
</style>