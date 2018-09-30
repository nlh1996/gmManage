<template>
  <section class="goods">
    <el-row>
      <el-col :span="24">
        <!--表单-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="物品ID">
            <el-input v-model="formInline.id"  style="width: 140px;"></el-input>
          </el-form-item>

          <el-form-item label="物品名称">
            <el-input v-model="formInline.name"  style="width: 140px;"></el-input>
          </el-form-item>         
          
          <el-button type="success" @click="onSubmit">搜索</el-button>
          
        </el-form>
        
        <div class="table">
        <!--表格-->
        <el-table
          :data="tableData"
          border
          height="250"
          style="width: 100%">

          <el-table-column
              prop="id"
              label="id"
              width="180">
          </el-table-column>
          <el-table-column
              prop="name"
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
export default {
    data() {
        return {
            formInline: {
                id: '',
                name: '',
            },
            tableData: [
                {id: '1', name: '小刀'},
                {id: '1', name: '小刀'},
                {id: '1', name: '小刀'},
                {id: '1', name: '小刀'},
                {id: '1', name: '小刀'},
                {id: '1', name: '小刀'},
                {id: '1', name: '小刀'},
                {id: '1', name: '小刀'},
                {id: '1', name: '小刀'},
                {id: '1', name: '小刀'},
                {id: '1', name: '小刀'},
                {id: '1', name: '小刀'},
            ],
            options: [],
            places: [],
            dialogFormVisible: false,
            editLoading: false,

        }
    },
    methods: {
        onSubmit() {
            
        }
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