<template>
  <div class="gift">
    <div class="head">
      <div class="text">礼包管理</div>
    </div>

    <div class="form">
      <el-form :model="form" label-position="left" label-width="90px">
        <el-col :span="8">
          <el-form-item label="礼包ID:">
            <el-input v-model.number="form.GiftPackId" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>
          <el-form-item label="礼包名称:">
            <el-input v-model="form.GiftPackName" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>

          <el-form-item label="有效期:">
            <!-- <el-input v-model="form.Date" placeholder="输入" style="width:90%"></el-input> -->
            <el-date-picker
              style="width:90%"
              v-model="form.Date1"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
            <el-date-picker
              style="width:90%"
              v-model="form.Date2"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>      
          <el-form-item label="描述:">
            <el-input v-model="form.Comment" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>                                  
        </el-col>

        <el-col :span="8">
          <el-form-item label="物品1ID:">
            <el-input v-model.number="form.Items[0].Id" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>
          <el-form-item label="物品1数量:">
            <el-input v-model.number="form.Items[0].Count" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>
          <el-form-item label="物品3ID:">
            <el-input v-model.number="form.Items[2].Id" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>  
          <el-form-item label="物品3数量:">
            <el-input v-model.number="form.Items[2].Count" placeholder="输入" style="width:90%"></el-input>
          </el-form-item> 
        </el-col>

        <el-col :span="8">
          <el-form-item label="物品2ID:">
            <el-input v-model.number="form.Items[1].Id" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>
          <el-form-item label="物品2数量:">
            <el-input v-model.number="form.Items[1].Count" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>  
          <el-form-item label="物品4ID:">
            <el-input v-model.number="form.Items[3].Id" placeholder="输入" style="width:90%"></el-input>
          </el-form-item> 
          <el-form-item label="物品4数量:">
            <el-input v-model.number="form.Items[3].Count" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>

          <el-button style="margin-top:5px" @click="addGiftPack"><strong>添加礼包</strong></el-button>          
        </el-col>
      </el-form>
    </div>

    <div class="table">
      <div class="text">数据列表</div>
        <el-table :data="tableData2" border height="320" style="width: 100%">
          <el-table-column label="id" width="80" prop="GiftPackId" fixed></el-table-column>
          <el-table-column label="名称" width="100" prop="GiftPackName" fixed></el-table-column>
          <el-table-column label="描述" width="200" prop="Comment"></el-table-column>
          <el-table-column label="物品1" width="90" prop="Good1Name"></el-table-column>
          <el-table-column label="数量1" width="90" prop="Good1Num"></el-table-column>
          <el-table-column label="物品2" width="90" prop="Good2Name"></el-table-column>
          <el-table-column label="数量2" width="90" prop="Good2Num"></el-table-column>
          <el-table-column label="物品3" width="90" prop="Good3Name"></el-table-column>
          <el-table-column label="数量3" width="90" prop="Good3Num"></el-table-column>
          <el-table-column label="物品4" width="90" prop="Good4Name"></el-table-column>
          <el-table-column label="数量4" width="90" prop="Good4Num"></el-table-column>
          <el-table-column label="渠道管理" width="100">      
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="medium">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
import axios from '../../http'
  export default {
    data() {
      return {
        form: {
          GiftPackId: '',
          GiftPackName: '',
          Date1: '',
          Date2: '',
          Comment: '',
          Items: [{Id: null,Count: null},{Id: null,Count: null},{Id: null,Count: null},{Id: null,Count: null}]
        },
        tableData2: [],
        goods: [],
      }
    },

    beforeMount() {
      axios.get('/getItems').then( res => {
        if(res.status == 200) {
          this.goods = res.data.data
          this.m = new Map()
          for(let item of this.goods) {
            this.m.set(item.Id, item.Name)
          }
          this.m.set(0, '无')
          this.getGiftPack()
        }
      })
    },

    methods: {
      getGiftPack() {
        axios.get('/getGiftPacks').then( res=> {
          let list = res.data.data
          for(let i=0;i<list.length;i++) {
            let tableData = {GiftPackId:'',GiftPackName:'',Comment:'',Channel:'',Area:'',Good1Name:'',
            Good1Num:'',Good2Name:'',Good2Num:'',Good3Name:'',Good3Num:'',Good4Name:'',Good4Num:''}
            tableData.GiftPackId = list[i].GiftPackId
            tableData.GiftPackName = list[i].GiftPackName
            tableData.Comment = list[i].Comment
            tableData.Good1Name = this.m.get(list[i].Items[0].Id)
            tableData.Good1Num = list[i].Items[0].Count
            tableData.Good2Name = this.m.get(list[i].Items[1].Id)
            tableData.Good2Num = list[i].Items[1].Count
            tableData.Good3Name = this.m.get(list[i].Items[2].Id)
            tableData.Good3Num = list[i].Items[2].Count
            tableData.Good4Name = this.m.get(list[i].Items[3].Id)
            tableData.Good4Num = list[i].Items[3].Count
            this.tableData2.push(tableData)
          }
        })        
      },
      addGiftPack() {
        if(this.form.GiftPackId == '') {
          this.$message.error("请填写礼包id")
          return
        }
        if(this.form.GiftPackName == '') {
          this.$message.error("请填写礼包名称")
          return
        }
        for(let i = 0; i<this.form.Items.length; i++) {
          for(let j = 0; j<this.goods.length; j++) {
            if(this.form.Items[i].Id == '' || this.form.Items[i].Count == '') {
              this.form.Items[i].Id = null
              this.form.Items[i].Count = null
            }
            if(this.form.Items[i].Id == null) {
              this.form.Items[i].Count = null
              break
            }
            if(this.goods[j].Id == this.form.Items[i].Id) {
              break
            }
            if(j == this.goods.length-1) {
              this.$message.error('无效物品id:'+ this.form.Items[i].Id)
              return
            }
          }
        }
        axios.post('/addGiftPack', this.form).then( res=> {
          if (res.status == 200) {
            this.$message({
              message: '添加成功！',
              type: 'success'
            })
            this.tableData2 = []
            this.getGiftPack()
          }else{
            this.$message.error(res.data.msg)
          }
        })
      },
      handleClick(v) {
        axios.post('/delGiftPack', {"GiftPackId": v.GiftPackId})
        .then( res => {
          if (res.status == 200) {
            this.$message({
              message: '删除成功！',
              type: 'success'
            })
            this.tableData2 = []
            this.getGiftPack()
          }else {
            this.$message.error(res.data.msg)
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
.text{
  margin: 20px;
  float: left;
  font-size: 24px;
  font-weight: bold;
}
.form{
  margin: 0;
  padding: 40px;
  background-color: rgb(38, 166, 154);
  height: 320px;
}
.table{
  width: 95%;
  padding: 10px;
}

</style>




