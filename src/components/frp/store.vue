<template>
    <el-container class="main-layout">
      <el-aside width="200px">
          <el-menu :default-active="route.path" :router="true">
            <el-menu-item disabled>MossFrp 控制台</el-menu-item>
            <el-menu-item index="/"><el-icon><house/></el-icon>主页</el-menu-item>
            <el-menu-item index="/status"><el-icon><Cpu /></el-icon>节点状态</el-menu-item>
            <el-menu-item index="/code"><el-icon><IconMenu /></el-icon>穿透码列表</el-menu-item>
            <el-menu-item index="/store"><el-icon><Shop /></el-icon>商店</el-menu-item>
            <el-menu-item index="/settings"><el-icon><Setting /></el-icon>个人设置</el-menu-item>
          </el-menu>
      </el-aside>
  
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <div class="toolbar">
            <el-dropdown>
              <el-icon style="margin-right: 8px; margin-top: 1px"
                ><setting
              /></el-icon>
              <template #dropdown>
              </template>
            </el-dropdown>
            <el-dropdown><span class="el-dropdown-link"><span id="userName">欢迎您，{{username}}</span><el-icon class="el-icon--right"><arrow-down /></el-icon></span><template #dropdown><el-dropdown-menu><a href="https://afdian.net/@HeyCrab" target="_blank"><el-dropdown-item>打赏螃蟹</el-dropdown-item></a><el-dropdown-item @click="logout">退出登录</el-dropdown-item></el-dropdown-menu></template></el-dropdown>
        </div>
        </el-header>
        <el-main>
          <el-scrollbar>
            <h2>商店 <el-button type="primary" @click="dialogVisible = true">如何激活卡密？</el-button></h2>
            <iframe style="margin-left:10px; width:100%;height:1000px;border:0" src="https://www.mcrmb.com/fk/24184"></iframe>
          </el-scrollbar>
        </el-main>
      </el-container>
      <el-dialog v-model="dialogVisible" title="如何激活卡密" width="30%"><span>请在群内输入 #卡密 &lt;你购买的卡密> 来充值</span><template #footer><span class="dialog-footer"><el-button type="primary" size="large" @click="dialogVisible = false">好</el-button></span></template></el-dialog>
    </el-container>
</template>
  
<script lang="ts" setup>
import { Menu as IconMenu, House,Setting, Cpu, Shop, Wallet, ArrowDown,ArrowRight } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { GetStatusCode, isPassedVerifictionInt } from '../../modules/StatusCodeParser';
import { GetCookie, RemoveCookie } from '../../modules/CookieHelper';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import router from './../router';
const route = useRoute();
var dialogVisible = ref(false)
let username = ref('**');

const logout = () => {
  ElMessageBox.confirm('确认退出登录？','退出登录')
  .then(function(){
    RemoveCookie('token')
    router.push('/login')
    ElMessage.success('您已退出登录')
  })
}

axios.get(`/api?type=userInfo&token=${GetCookie('token')}`)
.then(function(Response){
    const ResponseCode = GetStatusCode(Response);
    if (isPassedVerifictionInt(ResponseCode,200) == true){
        var userData = Response['data']['userInfo']
        username.value = userData['username']
        var email = userData['email']
        document.getElementById('userName').innerHTML = `欢迎您，${email}`;
    }else{
        if (ResponseCode == 423){
            ElMessage.error("⚡您请求的太快啦！请一分钟后再试噢 ！⚡")
        }else{
            ElMessage.error("您还没有登录噢！")
            router.push('/login')
        }
    }
})
</script>
  
<style scoped>
.el-button{
    margin-left: 75%;
    margin-top: -0.1%;
}
.main-layout .el-header {
  position: relative;
}
.main-layout{
    height: 100%;
}
.main-layout .el-menu{
    height: 100%;
}

.card{
    width:300px;
    margin-left:20px;
    margin-top:10px;
    border:0;
    border-radius:10px;
    background: linear-gradient(135deg,#02dd2a,#1ae78b);
    color: #FFF;
    display: inline-block
}

.card a{
    color:#FFF;
    font-size:1.2em
}

.main-layout .el-main {
  padding: 0;
}
.main-layout .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  right: 20px;
  height:100%;
}

.main-layout h2{
    margin-left: 20px
}
</style>
  