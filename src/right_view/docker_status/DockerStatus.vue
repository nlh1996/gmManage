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
          <template slot-scope="scope">{{ scope.row.Id }}</template>
        </el-table-column>
        <el-table-column
          prop="Names"
          label="游戏区服"
          align="left"
          width="140">
        </el-table-column>
        <el-table-column
          prop="State"
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
        tableData: []
      }
    },
    mounted() {
      this.getStatus()
    },
    methods: {
      getStatus() {
        axios.dockerApi.get('/containers/json?all=true').then( res => {
          this.tableData = res.data
        }) 
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      tableRowClassName({row, rowIndex}) {
        return 'success-row'
      },
      handleStart(index,v) {
        let api = '/containers'+v.Names+'/start'
        axios.dockerApi.post(api).then( res => {
          if(res.status==204) {
            this.getStatus()
            this.$message({
              message: '容器启动成功！',
              type: 'success'
            })
          }
        })  
      },
      handleStop(index,v) {
        let api = '/containers'+v.Names+'/stop'
        axios.dockerApi.post(api).then( res => {
          if(res.status==204) {
            this.getStatus()
            this.$message({
              message: '容器关闭成功！',
              type: 'success'
            })
          } 
        }).catch(err => { 
          this.$message({
            message: '容器出现异常！',
            type: 'warning'
          })  
        })        
      },
      handleDel(index,v) {
        let api = '/containers'+v.Names
        axios.dockerApi.delete(api).then( res => {
          if(res.status==204) {
            this.getStatus()
            this.$message({
              message: '删除容器成功！',
              type: 'success'                
            })
          }           
        }).catch( err => {
          this.$message({
            message: '容器仍在运行！',
            type: 'warning'
          })
        })   
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