<template>
  <div>

    <div class="text">
      选择区服
      <el-select v-model="form2.Channel" placeholder="请选择渠道" @change="select1(form2.Channel)" class="select">
        <el-option
          v-for="item in channels"
          :key="item.Id"
          :label="item.ChannelName"
          :value="item.ChannelName">
        </el-option>
      </el-select> 
      <el-select v-model="form2.Area" placeholder="请选择游戏区" @change="select2(form2)" class="select">
        <el-option
          v-for="item in areas2"
          :key="item.Id"
          :label="item.ServerName"
          :value="item.ServerName">
        </el-option>
      </el-select>
    </div>

    <hr>

    <div class="table">
      <div class="text">
        统计数据
      </div>
      <el-table
        id="out-table"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        height="600"
        :row-class-name="tableRowClassName"
        @selection-change="handleSelectionChange">
        <el-table-column
          prop="SerName"
          label="SerName"
          align="left"
          width="100">
        </el-table-column>
        <el-table-column
          prop="Channel"
          label="Channel"
          align="left"
          width="100">
        </el-table-column>
        <el-table-column
          prop="SerId"
          label="SerId"
          align="center"
          width="80"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="Account"
          prop="Account"
          align="center"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="HeroName"
          prop="HeroName"
          align="center"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="性别"
          prop="X性别"
          align="center"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="境界"
          prop="J境界"
          align="center"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="注册日期"
          prop="Z注册日期"
          align="center"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="登陆日期"
          prop="D登陆日期"
          align="center"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="今日充值"
          prop="J今日充值"
          align="center"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="累计充值"
          prop="L累计充值"
          align="center"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="战斗力"
          prop="Z战斗力"
          align="center"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="金币"
          prop="J金币"
          align="center"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="元宝"
          prop="Y元宝"
          align="center"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="活跃值"
          prop="H活跃值"
          align="center"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
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
        tableData: [],
        form2: {
          Channel: '',
          Area: '',
        },
        channels: [],
        areas: [],
        areas2: []
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
    },
    methods: {
      tableRowClassName() {
        
      },
      handleSelectionChange() {
        
      },
      select1(v) {
        if(v != '') {
          this.form2.Area = ''
          axios.get('/getAreas', {"ChannelName": v})
          .then( res => {
            if (res.status == 200) {
              this.areas2 = res.data.data
            }
          })
        }
      },
      select2(v) {
        let url = ''
        for(let i of this.areas2) {
          if(v.Area == i.ServerName) {
            url = 'http://' + i.GmIP
          }
        }
        this.tableData = []
        if(v.Area != '') {
          axios.get(url + '/dayActive').then(
            res => {
              if(res.status == 200) {
                this.tableData = res.data.data
              }
            }
          )
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

.text{
  margin: 30px;
  font-size: 24px;
  font-weight: bold;
  float: left;
}

.table{
  margin-left: 30px;
  width: 900px;
}

.select{
  margin-bottom: 0px;
}

hr{
  width: 95%;
  margin: 20px auto;border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
}
</style>