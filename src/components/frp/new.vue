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
          <el-scrollbar v-loading="isCreating">
            <el-page-header title="返回" style="margin-left: 20px;" @back="router.push('/code')">
                <template #content>
                <span class="text-large font-600 mr-3"> 新建激活码 </span>
                </template>
            </el-page-header>
            <strong style="margin-left: 20px;margin-top:10px;display:block; color: #FF0000;">禁止使用穿透服务搭建以下服务：爆破、漏洞注入、VPN、游戏私服，发现立即封禁隧道</strong>
            <div style="margin-left:20px;">
              <el-row><span class="ml-3 w-35 text-gray-600 inline-flex items-center">节点  </span><el-select style="margin-left:20px" v-model="a" class="m-2" placeholder="选择节点" size="large" no-data-text="这里不应该没有数据"><el-option v-for="item in listV" :key="item.value" :label="item.label" :value="item.value"/></el-select></el-row>
              <el-row>
                <span class="ml-3 w-35 text-gray-600 inline-flex items-center">带宽（Mbps）</span><el-input min="1" type="number" v-model="band" style="margin-left:20px; width: 7em;" ></el-input>
              </el-row>
              <el-row>
                <span class="ml-3 w-35 text-gray-600 inline-flex items-center"><el-tooltip content="时长不可小于3天，大于360天">时长（天）</el-tooltip></span><el-input min="3" max="360" type="number" v-model="time" style="margin-left:20px; width: 7em;" ></el-input>
              </el-row>
              <el-row><el-button @click="createCode" type="primary" size="large">创建激活码</el-button></el-row>
            </div>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
</template>
  
<script lang="ts" setup>
import { Menu as IconMenu, House,Setting, Cpu, Shop, Wallet, ArrowDown,ArrowRight } from '@element-plus/icons-vue';
import { RouterLink, useRoute } from 'vue-router';
import { ref } from 'vue';
import { GetStatusCode, isPassedVerifictionInt } from '../../modules/StatusCodeParser';
import { GetCookie } from '../../modules/CookieHelper';
import axios from 'axios';
import { ElMessage, ElNotification } from 'element-plus';
import router from '../router';
const route = useRoute();
let username = ref('**');
let email = ref('**')
let a = ref('')
let listV = ref(null)
let band = ref(null)
let time = ref(3)
let isCreating = ref(false)

const logout = () => {
  ElMessageBox.confirm('确认退出登录？','退出登录')
  .then(function(){
    RemoveCookie('token')
    router.push('/login')
    ElMessage.success('您已退出登录')
  })
}

const createCode = () => {
  if (a.value == "" || band.value == ""){
    ElMessage.warning('节点或带宽不能为空')
  }else{
    isCreating.value = ref(true)
    axios.get(`/api?type=createCode&token=${GetCookie('token')}&node=${a.value}&date=${time.value}&band=${band.value}`)
    .then(function(Response){
      const ResponseCode = GetStatusCode(Response);
      if (isPassedVerifictionInt(ResponseCode,200) == true){
          isCreating.value = ref(false)
          ElMessage.success('成功')
          ElNotification.success({
            title: '穿透码创建成功！',
            dangerouslyUseHTMLString: true,
            message: `穿透码已创建，扣除了${Response['data']['coin']}银币。\n创建穿透码需要一定的时间，建议您前往<a href="https://doca.mossfrp.top" target="_blank">MossFrp 使用文档</a>学习软件的使用方法。`
          })
          router.push('/code')
      }else{
        isCreating.value = ref(false)
          if (ResponseCode == 423){
              ElMessage.error("⚡您请求的太快啦！请一分钟后再试噢 ！⚡")
          }
          else if(ResponseCode == 401){
              ElMessage.error("您还没有登录噢！")
              router.push('/login')
          }
          else{
            ElMessage.error(`创建失败：${Response.data['message']}`)
          }
      }
    })
    .catch(function(){
      ElNotification.error({
        title: "后端服务发生错误",
        message: "Error:无法连接后端服务器，请检查网络连接或联系墨守"
      })
    })
  }
}

axios.get(`/api?type=userInfo&token=${GetCookie('token')}`)
.then(function(Response){
    const ResponseCode = GetStatusCode(Response);
    if (isPassedVerifictionInt(ResponseCode,200) == true){
        var userData = Response['data']['userInfo']
        username.value = userData['username']
        email.value = userData['email']
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
          nodeList.push(
            {
              value: Response['data']['nodeList'][i],
              label: Response['data']['nodeData'][a]['address']
            }
          )
      }
      listV.value = nodeList;
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

.card a{
    color:#FFF;
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
  margin-left: 20px;
}

.el-row{
  margin-top: 20px;
}
</style>
  