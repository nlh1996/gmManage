<template>
  <div>
    <div class="head">
      <div class="text">兑换码管理</div>
    </div>

    <div class="form">
      <el-form :model="form" label-position="left" label-width="100px">
        <el-col :span="12">
        <el-form-item label="选择渠道:">
          <el-select v-model="form.Channel" :change="filter1(form.Channel)" placeholder="请选择渠道" class="select">
            <el-option
              v-for="item in channels"
              :key="item.Id"
              :label="item.ChannelName"
              :value="item.ChannelName">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="选择游戏区:">
          <el-select v-model="form.Area"  placeholder="请选择游戏区" class="select">
            <el-option
              v-for="item in areas"
              :key="item.Id"
              :label="item.ServerName"
              :value="item.ServerName">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="选择礼包:">
          <el-select v-model="form.GiftPackName"  placeholder="请选择礼包" class="select">
            <el-option
              v-for="item in gifts"
              :key="item.Id"
              :label="item.GiftPackName"
              :value="item.GiftPackName">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="兑换码数量:">
            <el-input v-model.number="form.Count"  style="width: 220px;"></el-input>
          </el-form-item>  
        </el-col> 

        <el-col :span="12">
        <el-form-item label="有效期:">
          <!-- <el-input v-model="form.Date" placeholder="输入" style="width:90%"></el-input> -->
          <el-date-picker
            style="width: 220px;"
            v-model="form.Start"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
          <el-date-picker
            style="width: 220px;"
            v-model="form.End"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>  
        </el-col>
        <el-col :span="5">
          <el-form-item label="全服使用:" prop="delivery">
            <el-switch v-model="form.FullServiceUse"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="无限使用:" prop="delivery">
            <el-switch v-model="form.UnLimitUse"></el-switch>
          </el-form-item>
        </el-col>
      </el-form>

      <el-col :span="12">
        <el-button style="margin-top:30px;" @click="tianjia"><strong>一键生成</strong></el-button>
      </el-col>
    </div>

    <div class="table">
      <div class="text">
        数据列表 
        <el-select v-model="form2.Channel" placeholder="请选择渠道" :change="filter3(form2.Channel)" class="select">
          <el-option
            v-for="item in channels"
            :key="item.Id"
            :label="item.ChannelName"
            :value="item.ChannelName">
          </el-option>
        </el-select> 
        <el-select v-model="form2.Area" placeholder="请选择游戏区" :change="filter4(form2)" class="select">
          <el-option
            v-for="item in areas2"
            :key="item.Id"
            :label="item.ServerName"
            :value="item.ServerName">
          </el-option>
        </el-select>
      </div>
      <el-table :data="tablelist" border height="350" style="width: 100%" id="out-table">
        <el-table-column label="渠道" width="100" prop="Channel"></el-table-column>
        <el-table-column label="游戏区服" width="100" prop="Area"></el-table-column>
        <el-table-column label="礼包名" width="135" prop="GiftPackName"></el-table-column>
        <el-table-column label="兑换码" width="180" prop="Code"></el-table-column>
        <el-table-column label="使用情况" width="100" prop="Used">
          <template slot-scope="scope">
            <div v-if="scope.row.Used == false">未使用</div>
            <div v-else>已使用</div>
          </template>
        </el-table-column>
        <el-table-column label="开始时间" width="100" prop="Start"></el-table-column>
        <el-table-column label="结束时间" width="100" prop="End"></el-table-column>
      </el-table>
      <el-button style="float:right;" @click="exportExcel">生成excel</el-button>
    </div>
  </div>
</template>

<script>
import axios from '../../http'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
  export default {
    data() {
      return {
        form: {
          Channel: '',
          Area: '',
          GiftPackName: '',
          Count: null,
          Start: '',
          End: '',
          FullServiceUse: false,
          UnLimitUse: false,
        },
        form2: {
          Channel: '',
          Area: '',
        },
        channels: [],
        gifts: [],
        areas: [],
        areas2: [],
        tablelist: [],
        lastChannel: '',
        lastChannel2: '',
        lastArea: '',
        lastArea2: ''
      }
    },
    mounted() {
      axios.get('/getChannels').then(
        res => {
          if(res.status == 200) {
            this.channels = res.data.data
          }
        }
      )
      axios.get('/getGiftPacks').then( res=> {
        this.gifts = res.data.data
      }) 
      this.getRedeemCodes()
    },
    methods: {
      getRedeemCodes() {
        axios.get('/getRedeemCodes').then( res=> {
          this.tablelist = res.data.data
        }) 
      },
      tianjia() {
        if(this.form.GiftPackName == '' || this.form.Start == '' || this.form.Count == null) {
          this.$message({
            message: '请检查填写内容！',
            type: 'error'
          })
          return
        }
        axios.post('/addRedeemCodes', this.form)
        .then( res => {
          if (res.status == 200) {       
            this.$message({
              message: '添加成功！',
              type: 'success'
            })
            this.getRedeemCodes()
          }
        })
      },
      filter1(v) {
        if(v != '' && v != this.lastChannel) {
          this.form.Area = ''
          axios.get('/getAreas', {"ChannelName": v})
          .then( res => {
            if (res.status == 200) {
              this.areas = res.data.data
              this.lastChannel = v
            }
          })
        }
      },
      filter3(v) {
        if(v != '' && v != this.lastChannel2) {
          this.form2.Area = ''
          this.lastChannel2 = v
          axios.get('/getAreas', {"ChannelName": v})
          .then( res => {
            if (res.status == 200) {
              this.areas2 = res.data.data
            }
          })
        }
      },
      filter4(v) {
        if(v.Area != '' && v.Area != this.lastArea2) {
          let data = 'channel='+v.Channel+'&area='+ v.Area
          axios.get('/getRedeemCodes?'+data).then( res=> {
            this.tablelist = res.data.data
            this.lastArea2 = v.Area
          }) 
        }
      },
      exportExcel () {
        /* generate workbook object from table */
        var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
        /* get binary string as output */
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        return wbout
      },
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
  width: 700px;
}

.select{
  margin-bottom: 0px;
}
</style>