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
          <el-form-item label="所属渠道:">
            <el-input v-model="form.Channel" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>
          <el-form-item label="所属区服:">
            <el-input v-model="form.Area" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>
          <el-form-item label="有效期:">
            <el-input v-model="form.Date" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>                                        
        </el-col>
      </el-form>

      <el-form :model="form2" label-position="left" label-width="90px">
        <el-col :span="8">
          <el-form-item label="物品1ID:">
            <el-input v-model.number="form2.Good1Id" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>
          <el-form-item label="物品1数量:">
            <el-input v-model.number="form2.Good1Num" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>
          <el-form-item label="物品2ID:">
            <el-input v-model.number="form2.Good2Id" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>
          <el-form-item label="物品2数量:">
            <el-input v-model.number="form2.Good2Num" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>
          <el-form-item label="物品3ID:">
            <el-input v-model.number="form2.Good3Id" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>          
        </el-col>
        
        <el-col :span="8">
          <el-form-item label="物品3数量:">
            <el-input v-model.number="form2.Good3Num" placeholder="输入" style="width:90%"></el-input>
          </el-form-item> 
          <el-form-item label="物品4ID:">
            <el-input v-model.number="form2.Good4Id" placeholder="输入" style="width:90%"></el-input>
          </el-form-item> 
          <el-form-item label="物品4数量:">
            <el-input v-model.number="form2.Good4Num" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>
          <el-form-item label="描述:">
            <el-input v-model="form2.Comment" placeholder="输入" style="width:90%"></el-input>
          </el-form-item>
          <el-button style="margin-top:5px" @click="addGiftPack"><strong>添加礼包</strong></el-button>          
        </el-col>
      </el-form>
    </div>

    <div class="table">
      <div class="text">数据列表</div>
        <el-table :data="tableData" border height="280" style="width: 100%">
          <el-table-column label="id" width="80" prop=""></el-table-column>
          <el-table-column label="名称" width="100" prop=""></el-table-column>
          <el-table-column label="描述" width="200" prop=""></el-table-column>
          <el-table-column label="所属渠道" width="100" prop=""></el-table-column>
          <el-table-column label="所属区服" width="100" prop=""></el-table-column>
          <el-table-column label="物品1" width="90" prop=""></el-table-column>
          <el-table-column label="数量1" width="90" prop=""></el-table-column>
          <el-table-column label="物品2" width="90" prop=""></el-table-column>
          <el-table-column label="数量2" width="90" prop=""></el-table-column>
          <el-table-column label="物品3" width="90" prop=""></el-table-column>
          <el-table-column label="数量3" width="90" prop=""></el-table-column>
          <el-table-column label="物品4" width="90" prop=""></el-table-column>
          <el-table-column label="数量4" width="90" prop=""></el-table-column>
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
          Channel: '',
          Area: '',
          Date: '',
          Comment: '',
          Item: []
        },
        form2: {
          Good1Id: '',
          Good1Num:'',
          Good2Id:'',
          Good2Num:'',
          Good3Id:'',
          Good3Num:'',
          Good4Id:'',
          Good4Num:'', 
          Comment: '',
        },
        good: {
          Id: '',
          Name: '',
          Count: ''
        },
        tableData:[]
      }
    },
    mounted() {

    },
    methods: {
      addGiftPack() {
        let list = []
        this.good.Id = this.form2.Good1Id
        this.good.Count = this.form2.Good1Num
        list.push(this.good)
        this.good.Id = this.form2.Good2Id
        this.good.Count = this.form2.Good2Num
        list.push(this.good)
        this.good.Id = this.form2.Good3Id
        this.good.Count = this.form2.Good3Num
        list.push(this.good)
        this.form.Item = list
        this.form.Comment = this.form2.Comment
        console.log(this.form)
        axios.get('/addGiftPack',{GiftPack: this.form}).then( res=> {
          console.log(res.data)
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
  padding: 60px;
  background-color: rgb(38, 166, 154);
  height: 280px;
}
.table{
  width: 95%;
}

</style>




