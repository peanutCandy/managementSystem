<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加商品 -->
      <el-row :gutter="20">
        <!-- 搜索框 -->
        <el-col :span="10">
          <el-input
            placeholder="请输入内容"
            @keyup.enter.native="getGoodsList"
            v-model="queryInfo.query"
            clearable
            @clear="getGoodsList"
          >
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="14">
          <el-button type="primary" @click="addGoods">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 商品数据列表区S -->
      <el-table :data="goodsList" border stripe align="center" header-align="center">
        <el-table-column label="索引" type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name" width="500px"></el-table-column>
        <el-table-column label="商品价格（元）" prop="goods_price" width="100px"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight" width="80px"></el-table-column>
        <el-table-column label="创建时间" prop="add_time" width="170px">
          <template slot-scope="scope">{{scope.row.add_time | dateFormate}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeById(scope.row.goods_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 商品数据列表区E -->
      <!-- 分页区S -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
      <!-- 分页区E -->
    </el-card>
  </div>
</template>
<script>
export default {
  created() {
    this.getGoodsList(); //   获取商品列表参数
  },
  data() {
    return {
      goodsList: [], //商品列表数据
      //查询列表参数
      queryInfo: {
        query: "", //查询参数
        pagenum: 1, //当前页码
        pagesize: 10 //显示数据数量
      },
      total: 0 //总数据条数
    };
  },
  methods: {
    //根据分页获取商品列表参数
    async getGoodsList() {
      //发送请求获取列表参数
      const { data: res } = await this.$http.get("goods", {
        params: this.queryInfo
      });
      console.log(res);
      if (res.meta.status != 200)
        return this.$message.error("获取商品列表失败");
      this.goodsList = res.data.goods;
      this.total = res.data.total;
    },
    // 当列表显示数量发生变化触发事件
    handleSizeChange(newPageSize) {
      this.queryInfo.pagesize = newPageSize;
      //刷新数据列表
      this.getGoodsList();
    },
    //当页码发生变化时触发事件
    handleCurrentChange(newPageNum) {
      this.queryInfo.pagenum = newPageNum;
      //刷新数据列表
      this.getGoodsList();
    },
    //点击删除按钮出发事件
    async removeById(id) {
      //询问是否删除商品
      const confirmResult = await this.$confirm(
        "此操作将永久删除该商品, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      //如果取消删除商品弹出提示
      if (confirmResult != "confirm") return this.$message.error("已取消删除");
      //如果确认删除商品发送请求
      const { data: res } = await this.$http.delete(`goods/${id}`);
      if (res.meta.status !== 200) return this.$message.error("删除失败");
      this.$message.success("删除陈功");
      //删除成功重新获取商品列表
      this.getGoodsList();
    },
    //点击添加商品按钮触发事件
    addGoods() {
      //点击添加按钮跳转到添加页面
      this.$router.push("/goods/add");
    }
  }
};
</script>
<style scoped lang="less">
</style>