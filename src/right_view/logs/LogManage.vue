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
          prop="LogName"
          label="操作记录"
          align="left"
          width="140">
        </el-table-column>

        <el-table-column
          prop="Msg"
          label="操作内容"
          align="left"
          width="260">
        </el-table-column>
        <el-table-column
          prop="Time"
          label="操作时间"
          align="center"
          width="200"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作用户"
          prop="User"
          align="center"
          width="100"
          show-overflow-tooltip>
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
        tableData: []
      }
    },
    mounted() {
      axios.get('/getLogs').then(
        res => {
          if(res.status == 200) {
            this.tableData = res.data.data
          }
        }
      )
    },
    methods: {
 
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