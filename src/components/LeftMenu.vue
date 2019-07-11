<template>
  <div class="left-menu">
    <el-menu
      router
      default-active="/playerManage"
      class="el-menu-vertical-demo"
      active-text-color="#409eff"
    >
      <el-menu-item index="/playerManage">
          <span slot="title">玩家管理</span>
      </el-menu-item>
      <el-menu-item index="/goodsManage">
          <!-- <i class="el-icon-setting"></i> -->
          <span slot="title">物品管理</span>
      </el-menu-item>
      <el-menu-item index="/wayManage">
          <!-- <i class="el-icon-menu"></i> -->
          <span slot="title">渠道管理</span>
      </el-menu-item>
      <el-menu-item index="/openService">
          <!-- <i class="el-icon-document"></i> -->
          <span slot="title">开服管理</span>
      </el-menu-item>
      <el-menu-item index="/giftManage">
          <!-- <i class="el-icon-setting"></i> -->
          <span slot="title">礼包管理</span>
      </el-menu-item>
      <el-menu-item index="/emailManage">
          <!-- <i class="el-icon-setting"></i> -->
          <span slot="title">邮件管理</span>
      </el-menu-item>
      <el-menu-item index="/codeManage">
          <!-- <i class="el-icon-setting"></i> -->
          <span slot="title">兑换码管理</span>
      </el-menu-item>
      <el-menu-item index="/dockerCreate">
          <!-- <i class="el-icon-setting"></i> -->
          <span slot="title">创建游戏区服</span>
      </el-menu-item>
      <el-menu-item index="/dockerStatus">
          <!-- <i class="el-icon-setting"></i> -->
          <span slot="title">游戏区服状态</span>
      </el-menu-item>      
    </el-menu>
  </div>
</template>

<script>
  export default {
    components: {
        
    }
  }
</script>

<style scoped>
.el-menu-vertical-demo{
  height: 100%;
  background-color: #E6E6E6;
}

.el-menu-item{
  font-size: 18px;
  font-weight: bold;
}
</style>