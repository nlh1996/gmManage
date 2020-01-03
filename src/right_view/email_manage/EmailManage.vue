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
              <el-select v-model="form.Channel" @change="filter(form.Channel)" style="width:90%">
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
              <el-input v-model="form.ReceiverName" placeholder="输入" style="width:90%"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="发件对象id:">
              <el-input v-model="form.ReceiverUid" placeholder="输入" style="width:90%"></el-input>
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
          <el-table-column label="id" width="120" prop="ID"></el-table-column>
          <el-table-column label="邮件标题" width="150" prop="Title"></el-table-column>
          <el-table-column label="内容" width="340" prop="Content"></el-table-column>
          <el-table-column label="定时发放" width="150" prop="Time"></el-table-column>
          <el-table-column label="礼包名" width="100" prop="GiftPackName"></el-table-column>
          <el-table-column label="所属区服" width="120" prop="Channel"></el-table-column>
          <el-table-column label="对象昵称" width="120" prop="ReceiverName"></el-table-column>
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
      axios.get('/getGiftPacks').then( res=> {
        this.giftList = res.data.data
      }) 
      this.getEmails()
    },
    methods: {
      getEmails() {
        axios.get('/getEmails').then( res=> {
          let data = res.data.data
          if (data == null) {
            return
          }
          for (let i=0; i<data.length; i++) {
            data[i].Email.Time = data[i].Email.Date + ' ' + data[i].Email.Time
            data[i].Email.ID = data[i].ID
            data[i].Email.Channel = data[i].Email.Channel + ' ' + data[i].Email.Area
            for (let j=0; j<data[i].Email.Items.length; j++) {
              data[i].Email.Content = data[i].Email.Content + '物品:' +  data[i].Email.Items[j].Id + ',数量:' + data[i].Email.Items[j].Count + ';'
            }
            this.tableData.push(data[i].Email)
          }
        }) 
      },
      filter(v) {
        if(v != '') {
          this.form.Area = null
          axios.get('/getAreas', {"ChannelName": v})
          .then( res => {
            if(res) {
              if (res.status == 200) {
                this.areas = res.data.data
                this.lastname = v
              }
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
            this.getEmails()
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
  width: 90%;
}
</style>