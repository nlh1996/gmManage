<template>
  <div>
    <div class="head">
      <div class="text">开服管理</div>
    </div>
    <div class="form">
      <el-row>
        <el-select v-model="form.channel" placeholder="请选择渠道" class="select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-row>
      <el-col :span="14">
      <el-form :model="form" label-position="left" label-width="100px">
        <el-form-item label="服务器ID:">
          <el-input v-model.number="form.id" placeholder="输入"></el-input>
        </el-form-item>
        <el-form-item label="服务器名称:">
          <el-input v-model="form.name" placeholder="输入"></el-input>
        </el-form-item>
        <el-form-item label="开服时间:">
          <el-date-picker
            v-model="form.data"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
          
          <el-time-select
            v-model="form.time"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30'
            }"
            placeholder="选择时间">
          </el-time-select>
        </el-form-item>           
 
      </el-form>
      </el-col>
      <el-col :span="10">
        <el-button style="margin-top:90px" @click="tianjia"><strong>添加服务器</strong></el-button>
      </el-col>
    </div>

    <div class="table">
      <div class="text">数据列表   
      </div>
      <el-table :data="tableData" border height="250" style="width: 100%">
        <el-table-column label="id" width="80"></el-table-column>
        <el-table-column label="服务器名称" width="140" prop="name"></el-table-column>
        <el-table-column label="开服时间" width="180" prop="time"></el-table-column>
        <el-table-column label="渠道管理" width="100" prop="channel"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from '../../http'
  export default {
    data() {
      return {
        form :{
          id: '',
          name: '',
          time: '',
          data: '',
          channel: '',
        },
        tableData: [

        ],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        serverList: []
      }
    },
    methods: {
      tianjia() {
        axios.post('/addArea', this.form)
        .then( res => {
          if (res.status == 200) {
            console.log(res.data)
            serverList.push()
          }
        })
      }
    }
  }
</script>

<style scoped>
.head{
  background-color: rgb(120, 144, 156);
  height: 80px;
}
.form{
  margin: 0;
  padding: 40px;
  background-color: rgb(38, 166, 154);
  height: 260px;
}
.text{
  margin: 20px;
  float: left;
  font-size: 24px;
  font-weight: bold;
}
.table{
  margin: 0 auto;
  width: 520px;
}

.select{

  margin-bottom: 30px;
}
</style>