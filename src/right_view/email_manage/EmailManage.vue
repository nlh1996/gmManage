<template>
  <div>
    <div class="head">
      <div class="text">邮件管理</div>
    </div>
    <div class="form">
      <el-form :model="form" label-position="left" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="邮件标题:">
              <el-input v-model="form.Title" placeholder="输入" style="width:90%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="选择渠道:">
              <el-select v-model="form.Channel" :change="filter(form.Channel)" style="width:90%">
                <el-option
                  v-for="item in channels"
                  :key="item.Id"
                  :label="item.ChannelName"
                  :value="item.ChannelName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="选择区服:">
              <el-select v-model="form.Area" style="width:90%">
                <el-option
                  v-for="item in areas"
                  :key="item.Id"
                  :label="item.ServerName"
                  :value="item.ServerName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="发件对象昵称:">
              <el-input v-model="form.ReceiverName " placeholder="输入" style="width:90%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发件对象id:">
              <el-input v-model="form.ReceiverUid " placeholder="输入" style="width:90%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="选择礼包:">
              <el-select v-model="form.GiftPackName" style="width:90%">
                <el-option
                  v-for="(item,id) in giftList"
                  :key="id"
                  :label="item.GiftPackName"
                  :value="item.GiftPackName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="物品一id:">
              <el-input v-model.number="form.Items[0].Id" placeholder="输入" style="width:90%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="物品一数量:">
              <el-input v-model.number="form.Items[0].Count" placeholder="输入" style="width:90%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="物品二id:">
              <el-input v-model.number="form.Items[1].Id" placeholder="输入" style="width:90%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="物品二数量:">
              <el-input v-model.number="form.Items[1].Count" placeholder="输入" style="width:90%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="全服邮件" prop="delivery">
              <el-switch v-model="form.FullService"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="定时发送:">
              <el-date-picker
                style="width:180px"
                v-model="form.Date"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
              
              <el-time-select
                style="width:180px;"
                v-model="form.Time"
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
                v-model="form.Content">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button style="margin-top:30px;margin-left:80px" @click="submit"><strong>生成邮件</strong></el-button>
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
import axios from '../../http'
  export default {
    data() {
      return {
        textarea: '',
        form: {
          Title: '',
          Content: '',
          ReceiverName: '',
          ReceiverUid: '',
          GiftPackName: '',
          Channel: '',
          Area: '',
          Items: [{Id:null,Count:null},{Id:null,Count:null}],
          FullService: false,
          Date: '',
          Time: ''
        },
        tableData: [],
        giftList: [],
        channels: [],
        areas: [],
        lastname: ''
      }
    },  
    mounted() {
      axios.get('/getChannels').then(
        res => {
          if(res.status == 200) {
            this.channels = res.data.data
          }
        }
      ),
      axios.get('/getGiftPack').then( res=> {
        this.giftList = res.data.data
      }) 
    },
    methods: {
      filter(v) {
        if(v != '' && v != this.lastname) {
          this.form.Area = ''
          axios.get('/getAreas', {"ChannelName": v})
          .then( res => {
            if (res.status == 200) {
              this.areas = res.data.data
              this.lastname = v
            }
          })
        }
      },
      submit() {
        axios.post('/sendEmail',this.form)
        .then( res=>{
          if(res.status == 200) {
            this.$message({
              message: '邮件发送成功！',
              type: 'success'
            })
          }else {
            this.$message.error(res.data.msg);
          }
        })
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
  height: 350px;
}
.table{
  margin: 50px auto;
  width: 80%;
}
</style>