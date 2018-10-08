<template>
  <div class="gift">
    <div class="head">
      <div class="text">礼包管理</div>
    </div>

    <div class="form">
      <el-form :model="form" label-position="left" label-width="90px">
        <el-col :span="8">
          <el-form-item label="礼包ID:">
            <el-input v-model="form.libao_id" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>
          <el-form-item label="礼包名称:">
            <el-input v-model="form.libao_name" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>
          <el-form-item label="所属渠道:">
            <el-input v-model="form.way" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>
          <el-form-item label="所属区服:">
            <el-input v-model="form.area" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>
          <el-form-item label="有效期:">
            <el-input v-model="form.data" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>                                        
        </el-col>

        <el-col :span="8">
          <el-form-item label="物品1ID:">
            <el-input v-model="form.libao_id" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>
          <el-form-item label="物品1数量:">
            <el-input v-model="form.libao_id" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>
          <el-form-item label="物品2ID:">
            <el-input v-model="form.libao_id" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>
          <el-form-item label="物品2数量:">
            <el-input v-model="form.libao_id" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>
          <el-form-item label="物品3ID:">
            <el-input v-model="form.libao_id" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>          
        </el-col>
        
        <el-col :span="8">
          <el-form-item label="物品3数量:">
            <el-input v-model="form.libao_id" placeholder="输入" style="width:90%"></el-input>
          </el-form-item> 
          <el-form-item label="物品4ID:">
            <el-input v-model="form.libao_id" placeholder="输入" style="width:90%"></el-input>
          </el-form-item> 
          <el-form-item label="物品4数量:">
            <el-input v-model="form.libao_id" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>
          <el-form-item label="描述:">
            <el-input v-model="form.comment" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>
          <el-button style="margin-top:5px"><strong>添加礼包</strong></el-button>          
        </el-col>
      </el-form>
    </div>

    <div class="table">
      <div class="text">数据列表</div>
        <el-table :data="tableData" border height="280" style="width: 100%">
          <el-table-column label="id" width="80"></el-table-column>
          <el-table-column label="名称" width="100" prop="name"></el-table-column>
          <el-table-column label="描述" width="200" prop="time"></el-table-column>
          <el-table-column label="所属渠道" width="100" prop="way"></el-table-column>
          <el-table-column label="所属区服" width="100" prop="way"></el-table-column>
          <el-table-column label="物品1" width="90" prop="way"></el-table-column>
          <el-table-column label="数量1" width="90" prop="way"></el-table-column>
          <el-table-column label="物品2" width="90" prop="way"></el-table-column>
          <el-table-column label="数量2" width="90" prop="way"></el-table-column>
          <el-table-column label="物品3" width="90" prop="way"></el-table-column>
          <el-table-column label="数量3" width="90" prop="way"></el-table-column>
          <el-table-column label="物品4" width="90" prop="way"></el-table-column>
          <el-table-column label="数量4" width="90" prop="way"></el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form :{
          libao_id: '',
          libao_name: '',
          way: '',
          area: '',
          data: '',
          goods1_id: '',
          goods1_num:'',
          goods2_id:'',
          goods2_num:'',
          goods3_id:'',
          goods3_num:'',
          goods4_id:'',
          goods4_num:'', 
          comment: ''                   
        },
        tableData:[

        ]
      }
    },
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
.form{
  margin: 0;
  padding: 60px;
  background-color: rgb(38, 166, 154);
  height: 280px;
}
.table{
  width: 95%;
}

</style>




