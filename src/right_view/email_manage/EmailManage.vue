<template>
  <div>
    <div class="head">
      <div class="text">邮件管理</div>
    </div>
    <div class="form">
      <el-row class="text" :span="24">
        邮件生产
      </el-row>

      <el-row></el-row>
      <el-form :model="form" label-position="left" label-width="90px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="邮件ID:">
              <el-input v-model="form.email_id" placeholder="输入" style="width:90%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮件名称:">
              <el-input v-model="form.email_name" placeholder="输入" style="width:90%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="礼包ID:">
              <el-input v-model="form.libao_id" placeholder="输入" style="width:90%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="所属平台:">
              <el-input v-model="form.plantform" placeholder="输入" style="width:90%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属区服:">
              <el-input v-model="form.area" placeholder="输入" style="width:90%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发件对象:">
              <el-input v-model="form.player" placeholder="输入" style="width:90%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
              <el-form-item label="定时发送:">
                <el-date-picker
                    style="width:180px"
                    v-model="form.data"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
                
                <el-time-select
                    style="width:180px;"
                    v-model="form.time"
                    :picker-options="{
                        start: '08:30',
                        step: '00:15',
                        end: '18:30'
                    }"
                placeholder="选择时间">
                </el-time-select>
              </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="邮件内容:">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="textarea">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button style="margin-top:30px;margin-left:80px"><strong>生成邮件</strong></el-button>
          </el-col>
        </el-row>       
      </el-form>
    </div>
    <div class="table">
      <div class="text">数据列表</div>
        <el-table :data="tableData" border height="280" style="width: 100%">
          <el-table-column label="id" width="80"></el-table-column>
          <el-table-column label="名称" width="150" prop="name"></el-table-column>
          <el-table-column label="内容" width="300" prop="time"></el-table-column>
          <el-table-column label="定时发放" width="150" prop="way"></el-table-column>
          <el-table-column label="礼包id" width="100" prop="way"></el-table-column>
          <el-table-column label="所属区服" width="120" prop="way"></el-table-column>
          <el-table-column label="对象id" width="120" prop="way"></el-table-column>
        </el-table>      
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        textarea: '',
        form: {
          email_id: '',
          email_name: '',
          libao_id: '',
          plantform: '',
          area: '',
          player: '',
          date: '',
          time: '',
          comment: ''
        },
        tableData: [

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
  padding: 10px;
  background-color: rgb(38, 166, 154);
  height: 280px;
}
.table{
  margin: 50px auto;
  width: 80%;
}
</style>