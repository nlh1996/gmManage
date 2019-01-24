<template>
  <section class="player">
    <el-row>
        <div class="text aa">玩家查找</div>
    </el-row>
    <hr>
      <!--表单-->
      <div class="form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">

        <el-form-item label="选择渠道:">
          <el-select v-model="formInline.Channel" placeholder="请选择渠道" style="width: 140px;">
            <el-option
              v-for="item in channels"
              :key="item.Id"
              :label="item.ChannelName"
              :value="item.ChannelName">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="选择区服:">
          <el-select v-model="formInline.Area" placeholder="请选择游戏区" style="width: 140px;">
            <el-option
              v-for="item in areas"
              :key="item.Id"
              :label="item.ServerName"
              :value="item.ServerName">
            </el-option>
          </el-select>
        </el-form-item>         

          <el-form-item label="玩家昵称:">
            <el-input v-model="formInline.NickName" style="width: 140px;"></el-input>     
          </el-form-item> 

          <el-form-item label="玩家id:">
            <el-input v-model="formInline.Uid"  style="width: 140px;margin-left:20px;"></el-input>     
          </el-form-item> 
        </el-form>
        <el-button type="success" @click="search">搜索</el-button>
      </div>

    <el-row>  
      <div class="table1">
        <!--表格-->
        <el-table
          :data="tableData_show"
          border
          height="150"
          style="width: 100%">

          <el-table-column
            prop="Channel"
            label="渠道"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Area"
            label="区服"
            width="120">
          </el-table-column>
          <el-table-column
            prop="NickName"
            label="玩家昵称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="Uid"
            label="玩家id"
            width="120">
          </el-table-column>
          <el-table-column
            prop="vip"
            label="vip等级"
            width="100">
          </el-table-column>
        </el-table>
      </div>
    </el-row>

    <el-row>
      <el-row>
        <div class="text">操作</div>
      </el-row>
      <hr>
      <el-col :span="24">
        <el-form :inline="true" :model="control" class="demo-form-inline">
          <el-form-item label="输入禁言时间:">
            <el-input v-model.number="control.jinyan" style="width: 140px;"></el-input>
            <el-button type="warning" size="medium" @click="submit(control.jinyan,'禁言')">禁言</el-button> 
          </el-form-item>
          <el-form-item label="输入下线时间:">
            <el-input v-model.number="control.xiaxian" style="width: 140px;"></el-input>
            <el-button type="warning" size="medium" @click="submit(control.xiaxian,'下线')">下线</el-button> 
          </el-form-item>
          <el-form-item label="输入封号时间:">
            <el-input v-model.number="control.fenghao" style="width: 140px;"></el-input>
            <el-button type="warning" size="medium" @click="submit(control.fenghao,'封号')">封号</el-button> 
          </el-form-item>   
        </el-form>      
      </el-col>
    </el-row>

    <el-row>
        <div class="text">操作记录</div>
    </el-row>
    <hr>
    <el-row>  
        <div class="table2">
        <!--表格-->
        <el-table
          :data="tableData_log"
          border
          height="220"
          style="width: 100%">

          <el-table-column
            prop="id"
            label="编号"
            width="60">
          </el-table-column>
          <el-table-column
            prop="way"
            label="渠道"
            width="120">
          </el-table-column>
          <el-table-column
            prop="area"
            label="区服"
            width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            label="玩家昵称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="control_type"
            label="操作"
            width="120">
          </el-table-column>
          <el-table-column
            prop="time"
            label="时效"
            width="120">
          </el-table-column>
          <el-table-column
            prop="control_time"
            label="操作时间"
            width="240">
          </el-table-column>
        </el-table>
        </div>
    </el-row>

  </section>
</template>

<script>
import axios from '../../http'
  export default {
    data() {
      return {
        formInline: {
          Channel: '',
          Area: '',
          NickName: '',
          Uid: ''
        },
        control: {},
        tableData_show: [],
        tableData_log: [],
        channels: [],
        areas: []
      }
    },
    methods: {
      search() {
        axios.post('/findPlayer',this.formInline).then(
          res => {
            if(res.status==200) {
              this.tableData_show.push(res.data.data)
            }
          }
        )
      },
      submit(time,v) {
        this.tableData_show[0].SurplusHour = time
        this.tableData_show[0].StateStr = v

        axios.post('/managePlayer',this.tableData_show[0]).then(
          res => {
            console.log(res.data)
          }
        )
      }
    }
  }
  
</script>

<style scoped>
.player{
  padding: 30px;
}

.text{
  margin-left: 130px;
  float: left;
  font-size: 24px;
  font-weight: bold;
}

.table1{
  margin: 10px auto;
  width: 615px;
}

.table2{
  margin: 10px auto;
  width: 80%;
}

hr{
  width: 95%;
  margin: 20px auto;border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
}

.form{
  width: 600px;
  margin: 0 auto;
}
</style >