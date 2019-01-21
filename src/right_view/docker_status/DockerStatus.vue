<template>
  <div>
    <div class="table">
      <div class="text">
        数据列表 
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          align="left"
          width="100">
        </el-table-column>
        <el-table-column
          label="所在服务器"
          align="left"
          width="140">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="游戏区服"
          align="left"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="运行状态"
          align="center"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          align="left"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleStart(scope.$index, scope.row)">启动</el-button>
            <el-button
              size="mini"
              @click="handleStop(scope.$index, scope.row)">关闭</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDel(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from '../../http'
  export default {
    data() {
      return {
        form: {
          Channel: '',
          Area: '',
          GiftPackName: '',
          Len: null,
          Count: null,
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '运行中',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '运行中',
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '运行中',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '运行中',
        }]
      }
    },
    mounted() {

    },
    methods: {
      tianjia() {
        axios.post('/addRedeemCodes', this.form)
        .then( res => {
          if (res.status == 200) {       
            this.tablelist = res.data.data
            this.$message({
              message: '添加成功！',
              type: 'success'
            })
          }
        })
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      tableRowClassName({row, rowIndex}) {
        return 'success-row';
      },
      handleStart(index,v) {
        console.log(index)
      },
      handleStop(index,v) {
        console.log(index)
      },
      handleDel(index,v) {
        console.log(index)
      },
    }
  }
</script>

<style scoped>
.head{
  background-color: rgb(120, 144, 156);
  height: 80px;
}

.text{
  margin: 20px;
  float: left;
  font-size: 24px;
  font-weight: bold;
}
.table{
  margin: 0 auto;
  width: 720px;
}

.select{
  margin-bottom: 0px;
}
</style>