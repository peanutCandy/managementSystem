<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-row>
        <!-- 搜索框 -->
        <el-col :span="12">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 列表区 -->
      <el-table :data="orderList" style="width: 100%">
        <el-table-column label="#" type="index" width="50"></el-table-column>
        <el-table-column label="订单编号" prop="order_number" width="280"></el-table-column>
        <el-table-column label="订单价格" prop="order_price" width="120"></el-table-column>
        <el-table-column label="是否付款" prop="pay_status" width="100">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.pay_status === '0'">未付款</el-tag>
            <el-tag type="success" v-else>已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send" width="150"></el-table-column>
        <el-table-column label="下单时间" width="180">
          <template slot-scope="scope">{{scope.row.create_time | dateFormate}}</template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showBox"></el-button>
            <el-button
              type="success"
              icon="el-icon-location-outline"
              size="mini"
              @click="logisticsBox"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区 -->
      <!-- size-change 每页显示数据条数改变时会触发 -->
      <!-- current-change页码发生变化时触发事件 -->
      <!-- current-page	当前页码值 -->
      <!-- page-sizes 每页显示个数选择器的选项设置 -->
      <!-- page-size 每页显示条目个数 -->
      <!-- layout 组件布局 -->
      <!-- total 总数据数量 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 修改地址对话框 -->
    <el-dialog title="修改地址" :visible.sync="addressDialogVisible" width="50%">
      <!--rules 表单验证规则  model数据 -->
      <el-form
        :model="addressForm"
        :rules="addressRules"
        ref="addressFormRef"
        label-width="100px"
        @close="addressDialogClose"
      >
        <el-form-item label="省市区/县" prop="zone">
          <el-cascader :options="citydata" v-model="selectedArea" :props="{expandTrigger:'hover'}"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="detailedAddaress">
          <el-input v-model="addressRuleForm.detailedAddaress"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addressDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addressDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查看物流对话框 -->
    <el-dialog title="物流信息" :visible.sync="logisticsDialogVisible" width="50%">
      <!--rules 表单验证规则  model数据 -->
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in logisticsList"
          :key="index"
          :timestamp="activity.ftime"
        >{{activity.context}}</el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>
<script>
import citydata from "../../assets/citydata.js";
export default {
  created() {
    this.getOrderList();
  },
  data() {
    return {
      queryInfo: {
        //当前页码
        pagenum: 1,
        //每页显示数据数量
        pagesize: 10
      },
      total: 0,
      orderList: [], //订单数据
      addressDialogVisible: false, //修改地址对话框显示隐藏
      logisticsDialogVisible: false, //物流对话框控制
      addressRuleForm: {
        detailedAddaress: "", //详细地址
        zone: "" //省市区
      },
      addressForm: {
        zone: [],
        detailedAddaress: ""
      },
      citydata, //城市数据
      selectedArea: [],
      addressRules: {
        //表单验证规则
        zone: [{ required: true, message: "请选择省市区县", trigger: "blur" }],
        detailedAddaress: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ]
      },
      logisticsList: [] //物流信息列表
    };
  },
  methods: {
    //获取订单数据
    async getOrderList() {
      const { data: res } = await this.$http.get("orders", {
        params: this.queryInfo
      });
      if (res.meta.status !== 200)
        return this.$message.error("获取订单列表失败");
      this.orderList = res.data.goods;
      this.total = res.data.total;
      console.log(this.orderList);
    },
    //每页数据显示数量发生变化时触发
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getOrderList();
    },
    // 页码值发生变化时触发
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getOrderList();
    },
    //显示修改地址对话框
    showBox() {
      this.addressDialogVisible = true;
    },
    //关闭表单清空内容
    addressDialogClose() {
      this.$refs.addressFormRef.resetFields();
    },
    //单击物理信息按钮触发事件
    async logisticsBox() {
      const { data: res } = await this.$http.get(`/kuaidi/${1106975712662}`);
      console.log(res.data);
      if (res.meta.status !== 200)
        return this.$message.error("获取物流信息失败");
      this.logisticsList = res.data;

      this.logisticsDialogVisible = true;
    }
  }
};
</script>
<style scoped lang="less">
</style>