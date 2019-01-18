<template>
  <section class="goods">
    <el-row>
      <el-col :span="24">
        <!--表单-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="物品ID">
            <el-input v-model="formInline.Id"  style="width: 140px;"></el-input>
          </el-form-item>

          <el-form-item label="物品名称">
            <el-input v-model="formInline.Name"  style="width: 140px;"></el-input>
          </el-form-item>         
          
          <el-button type="success" @click="onSubmit">搜索</el-button>
          
        </el-form>
        
        <div class="table">
        <!--表格-->
        <el-table
          :data="tableData"
          border
          height="600"
          style="width: 100%">

          <el-table-column
            prop="Id"
            label="id"
            width="180">
          </el-table-column>
          <el-table-column
            prop="Name"
            label="名称"
            width="360">
          </el-table-column>
        </el-table>
        </div>

      </el-col>
    </el-row>

  </section>
</template>

<script>
import axios from '../../http'
export default {
  data() {
    return {
      formInline: {
        Id: '',
        Name: '',
      },
      tableData: [],
      tableData2: [],
      options: [],
      places: [],
      dialogFormVisible: false,
      editLoading: false,
      searchList: []
    }
  },
  methods: {
    onSubmit() {
      if(this.formInline.Name || this.formInline.Id) {
        this.searchList = []
        if(this.formInline.Name) {
          for(let i=0;i<this.tableData2.length;i++) {
            //如果字符串中不包含目标字符会返回-1
            if(this.tableData2[i].Name.indexOf(this.formInline.Name)>=0){
              this.searchList.push(this.tableData2[i])
            }
          }
          this.formInline.Name = ''
        }else{
          for(let i=0;i<this.tableData2.length;i++) {
            if(this.tableData2[i].Id == this.formInline.Id){
              this.searchList.push(this.tableData2[i])
              break
            }
          }
          this.formInline.Id = ''
        }
        this.tableData = this.searchList
      }
    }
  },
  mounted() {
    axios.get('/getItems').then( res => {
      if(res.status == 200) {
        this.tableData2 = res.data.data
        this.tableData = this.tableData2
      }
    })
    axios.dockerApi.get('/networks').then( res => {
      console.log(res.data)
    })
  }
}
</script>



<style>
  .goods{
    padding: 40px;
  }
  .el-message-box__btns .cancel {
    float: right;
    margin-left: 10px;
  }
  .table{
    width: 560px;
    margin: 50px auto;
  }
</style>