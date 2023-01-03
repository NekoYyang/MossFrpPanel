<template>
  <el-container class="main-layout">
    <el-aside width="200px">
        <el-menu :default-active="route.path" :router="true">
          <el-menu-item disabled>MossFrp 控制台</el-menu-item>
          <el-menu-item index="/"><el-icon><house/></el-icon>主页</el-menu-item>
          <el-menu-item index="/status"><el-icon><Cpu /></el-icon>节点列表</el-menu-item>
          <el-menu-item index="/code"><el-icon><IconMenu /></el-icon>穿透码列表</el-menu-item>
          <el-menu-item index="/settings"><el-icon><Setting /></el-icon>设置</el-menu-item>
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
          <h2>节点状态</h2>

          <el-table v-loading="isTableLoading" empty-text="你是怎么卡出来的呢？这里不应该是空的。" :data="tableData" style="width:90%;height:100%;margin-left:20px" max-height="100%">
            <el-table-column fixed prop="name" label="节点名称" width="200" />
            <el-table-column prop="band-max-per" label="节点最大带宽" width="140" />
            <el-table-column prop="load" label="实时负载" width="200" />
            <el-table-column prop="price" label="价格" width="150" />
            <el-table-column prop="info" label="备注" width="400" />
          </el-table>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { Menu as IconMenu, House,Setting, Cpu, Shop, Wallet, ArrowDown,ArrowRight } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { GetCookie, RemoveCookie } from '../../modules/CookieHelper';
import { GetStatusCode, isPassedVerifictionInt } from '../../modules/StatusCodeParser';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import router from './../router';
const route = useRoute();
let username = ref('**');
let tableData = ref(null);
let isTableLoading = ref(true);

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

axios.get(`/api?type=allNode&token=${GetCookie('token')}`)
.then(function(Response){
const ResponseCode = GetStatusCode(Response);
  if (isPassedVerifictionInt(ResponseCode,200) == true){
    var nodeList = [];
    for (var i=0;i<Response['data']['nodeList'].length;i++){
        var a = Response['data']['nodeList'][i]
        console.log(Response['data']['nodeData'][a])
        var globalItem = Response['data']['nodeData'][a];
        let apple = ref(globalItem['coin'])
        if (globalItem['coin'] == "mixed"){
          apple.value = "金币或银币"
        }else if(globalItem['coin'] == "gold"){
          apple.value = "金币"
        }
        let banana = ref(globalItem['band-max-per'])
        banana.value = globalItem['band-max-per'] + " " + "Mbps"
        let orange = ref(globalItem['price'])
        orange.value = globalItem['price']  + " " + apple.value
        var data = { "name": globalItem['name'], "band-max-per": banana.value, "load": globalItem['load'], "price": orange.value, "info": globalItem['info']};
        nodeList.push(data)
    }
    console.log(nodeList)
    tableData.value = nodeList;
    isTableLoading = false;
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

.el-table /deep/ .el-table__cell {
  height: 100px;
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
