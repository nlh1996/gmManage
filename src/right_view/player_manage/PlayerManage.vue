<template>
  <section class="player">
    <el-row>
        <div class="text">玩家查找</div>
    </el-row>
    <hr>
    <el-row>
        <!--表单-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline" label-position="left">
          <el-row>
            <el-form-item label="输入平台">
                <el-input v-model="formInline.platform"  style="width: 140px;"></el-input>
            </el-form-item>

            <el-form-item label="输入区服">
                <el-input v-model="formInline.area"  style="width: 140px;"></el-input>
            </el-form-item>          
          </el-row>
          
          <el-row>
            <el-col>
              <el-form-item label="用户名称">
                <el-input v-model="formInline.name"  style="width: 140px;"></el-input>     
                <el-button type="success" style="width: 80px;margin-left:140px">搜索</el-button>
              </el-form-item> 
            </el-col>  
                         
          </el-row>

        </el-form>
    </el-row>

    <el-row>  
      <div class="table1">
        <!--表格-->
        <el-table
          :data="tableData_show"
          border
          height="150"
          style="width: 100%">

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
            prop="player_id"
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
            <el-input v-model="control.jinyan"  style="width: 140px;"></el-input>
            <el-button type="warning" size="medium">禁言</el-button> 
          </el-form-item>
          <el-form-item label="输入下线时间:">
            <el-input v-model="control.xiaxian"  style="width: 140px;"></el-input>
            <el-button type="warning" size="medium">下线</el-button> 
          </el-form-item>
          <el-form-item label="输入封号时间:">
            <el-input v-model="control.fenghao"  style="width: 140px;"></el-input>
            <el-button type="warning" size="medium">封号</el-button> 
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
    export default {
        data() {
            return {
                formInline: {
                    platform: '',
                    area: '',
                    name: ''
                },
                control: {

                },
                tableData_show: [

                ],
                tableData_log: [

                ]
            }
        },
    }
</script>
 actions<style scoped>
  .player{
    padding: 40px;
  }
  .text{
      margin-left: 130px;
      float: left;
      font-size: 24px;
      font-weight: bold;
  }
  .table1{
    margin: 20px auto;
    width: 615px;
  }
  .table2{
    margin: 20px auto;
    width: 940px;
  }

  hr {
      width:95%;
      margin:20px auto;border: 0;
      height: 1px;
      background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
  }
  

</style >