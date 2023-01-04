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
<el-row>
  <el-card class="box-card" >
    <template #header>
      <div class="card-header">
        <span>用户信息</span>
        <el-tooltip content="临时密钥相当于请求token，绑定IP与userID，半个小时会刷新一次！" placement="top">
        <el-button @click="open" class="button" text>查看临时密钥</el-button>
      </el-tooltip>
      </div>
    </template>
    <div  style="white-space: nowrap;">
    <el-scrollbar height="80px" width="30px">
      <el-row>
    <div class="item"  >
      <span class="text" style="color:rgb(118, 124, 130)">UID</span>
      <span class="text2" style="margin-top:10px;">{{userId}}</span>
    </div>
    <div class="item">
      <span class="text" style="color:rgb(118, 124, 130);margin-left: 54px;">用户组</span>
      <span class="text2" style="margin-top:10px;margin-left: 54px;">{{level}}</span>
    </div>
    <div class="item">
      <span class="text" style="color:rgb(118, 124, 130);margin-left: 54px;">所有银币</span>
      <span class="text2" style="margin-top:10px;margin-left: 54px;">{{silver}}</span>
    </div>
    <div class="item">
      <span class="text" style="color:rgb(118, 124, 130);margin-left: 54px;">所有金币</span>
      <span class="text2" style="margin-top:10px;margin-left: 54px;">{{gold}}</span>
    </div>
    <div class="item">
      <span class="text" style="color:rgb(118, 124, 130);margin-left: 54px;">在线隧道</span>
      <span class="text2" style="margin-top:10px;margin-left: 54px;">{{usercode}}</span>
    </div>
  </el-row>
  </el-scrollbar>
</div>
  </el-card>
  <el-card class="qiandao" height >
    <template #header>
      <div class="card-header">
        <span>签到</span>
      </div>
    </template>
    <span class="qiandao-text">签到可获得银币，连续签到可获得更多银币！</span>
    <el-button type="success"  style="margin-top: 11px;" @click="signin" ref="tet" id="tet" :disabled="issigned" >点我签到！</el-button>
    <el-button plain  style="margin-top: 11px;" @click="jrrp">今日人品</el-button>
  </el-card>
</el-row>
<el-row>
  <el-card class="announcement" >
    <template #header>
      <div class="card-header">
        <span>公告</span>
      </div>
    </template>     
    <el-scrollbar height="220px">
      <el-alert title="使用须知" type="warning" description="Web端注册用户通过群内绑定QQ ！" show-icon style="width: 100%;" :closable="false"/>
    <el-collapse  style="width: 100%;margin-top: 20px;white-space: pre-wrap;" >
      <el-collapse-item title="节点价格调整通知" name="1" >
        <div>
          <p style="width: 90%;"> 经过一段时间的观察，目前MossFrp的节点价格在设置上有一定的不合理性。</p>
          <p style="width: 90%;"> 故经过管理组讨论，我们决定于暂于2023.1.4对所有节点价格进行一次大改，整体方向为降低费用，价格变动会比较大。</p>
        </div>
        <div>
          <p style="width: 90%;"> 请资金敏感用户考虑提前退币，价格下调后退币将按照当时价格计算，可能会有穿透码贬值的情况。我们已在此对可预见的问题作提前通知，后续不再另作补偿。</p>
          <p style="width: 90%;"> 具体价格调整方案待定，部分节点会有较大价格变化幅度。</p>
        </div>
      </el-collapse-item>
      <el-collapse-item title="节点变动通知" name="2">
        <div>
          <p style="width: 90%;"> xg5节点下架，xg5用户迁移至sg1节点</p>
          <p style="width: 90%;"> 新上架sg1-新加坡AWS-1000M节点</p>
          <p style="width: 90%;"> 新上架sq4-宿迁BGP多线-10M节点</p>
        </div>
      </el-collapse-item>
    </el-collapse>
  </el-scrollbar>
  </el-card>
  <el-card class="userknow" >
    <template #header>
      <div class="card-header">
        <span>用户须知</span>
        <el-divider direction="vertical" />
        <span>使用帮助</span>
      </div>
    </template>
    <div style="float:left" >
    <p style="width: 100%;line-height: 15px;">欢迎使用MossFrp！</p>
    <p style="width: 100%;line-height: 15px;">一个新生、优秀、且流畅的内网穿透服务~</p>
    <p style="width: 100%;line-height: 15px;">参考汇率：1RMB=1000金币</p>
    <p style="width: 100%;line-height: 15px;">金币能给节点提供者带来一定的收益</p>
    <p style="width: 100%;line-height: 15px;">带宽为上下行各自独立限速不限流量</p>
    <p style="width: 100%;line-height: 15px;">请勿搭建任何违法服务，建站请提供备案！</p>
</div>

<div  style="float:right;" >
    <p style="width: 100%;line-height: 15px;">MossFrp 帮助文档，里头啥教程都有：</p>
    <p style="width: 100%;line-height: 15px;">docs.mossfrp.top</p>
    <p style="width: 100%;line-height: 15px;">如果出现了教程内未提及的问题或者BUG</p>
    <p style="width: 100%;line-height: 15px;">请尝试群内提问！</p>
    <p style="width: 100%;line-height: 15px;">或在未得到解决的情况下私信群主！</p>
    <p style="width: 100%;line-height: 15px;">教程真的已经很详细了！！</p>
</div>
  </el-card>
</el-row>
        </el-main>
      </el-container>
    </el-container>
</template>
  
<script lang="ts" setup>
import { Menu as IconMenu, House,Setting, Cpu, Shop, Wallet, ArrowDown,ArrowRight } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { GetStatusCode, isPassedVerifictionInt } from '../modules/StatusCodeParser';
import { GetCookie, RemoveCookie } from '../modules/CookieHelper';
import axios from 'axios';
import { ElMessage, ElMessageBox, ElScrollbar, ElNotification, breadcrumbItemProps, ElAlert, ElAside, ElButton, ElCard, ElCollapse, ElCollapseItem, ElContainer, ElDivider, ElDropdown, ElDropdownItem, ElDropdownMenu, ElHeader, ElIcon, ElMain, ElMenu, ElMenuItem, ElRow, ElTooltip } from 'element-plus';
import router from './router';

const route = useRoute();
let username = ref('**');
let gold = ref('--');
let silver = ref('--')
let userId = ref('0')
let email = ref('**')
let apple = ref('**')
let level = ref('**')
let usercode = ref('0')
let issigned = ref(false)
let ifsign = ref('--')
const logout = () => {
  ElMessageBox.confirm('确认退出登录？','退出登录')
  .then(function(){
    RemoveCookie('token')
    router.push('/login')
    ElMessage.success('您已退出登录')
  })
}
const open = () => {
  ElMessageBox.alert(`${GetCookie('token')}`, '临时密钥', {
    confirmButtonText: 'OK',
  })
}
const jrrp = () => {
  axios.get(`/api?type=luck&token=${GetCookie('token')}`)
  .then(function(Response){
    const ResponseCode = GetStatusCode(Response);
    if (isPassedVerifictionInt(ResponseCode,200) == true){
        ElMessage.success('获取成功！')
        ElNotification.success({
          title: '今日人品',
          dangerouslyUseHTMLString: true,
          message: `你今日的人品值为：${Response['data']['luck']}${Response['data']['luckMessage']}`
        })
    }else{
        if (ResponseCode == 423){
            ElMessage.error("⚡您请求的太快啦！请一分钟后再试噢 ！⚡")
        }
        else if(ResponseCode == 401){
            ElMessage.error("您还没有登录噢！")
            router.push('/login')
        }
        else{
          ElMessage.error(`获取失败：${Response.data['message']}`)
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
const signin = () => {
  issigned.value = true
  axios.get(`/api?type=signIn&token=${GetCookie('token')}`)
  .then(function(Response){
    const ResponseCode = GetStatusCode(Response);
    if (isPassedVerifictionInt(ResponseCode,200) == true){
        ElMessage.success('成功')
        ElNotification.success({
          title: '签到成功！',
          dangerouslyUseHTMLString: true,
          message: `你今日的人品值为：${Response['data']['luck']}${Response['data']['luckMessage']}\n${Response['data']['signInMessage']}`
        })
    }else{
        if (ResponseCode == 423){
            ElMessage.error("⚡您请求的太快啦！请一分钟后再试噢 ！⚡")
            issigned.value = false
        }
        else if(ResponseCode == 401){
            ElMessage.error("您还没有登录噢！")
            router.push('/login')
            issigned.value = false
        }
        else{
          ElMessage.error(`签到失败：${Response.data['message']}`)
          issigned.value = false
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
axios.get(`/api?type=userInfo&token=${GetCookie('token')}`)
.then(function(Response){
    const ResponseCode = GetStatusCode(Response);
    if (isPassedVerifictionInt(ResponseCode,200) == true){
        var userData = Response['data']['userInfo']
        var globalItem = Response['data']['userInfo'];
        let apple = ref(globalItem['level'])
        if (globalItem['level'] == "staff"){
          apple.value = "管理员"
        }else if(globalItem['level'] == "owner"){
          apple.value = "铸币"
        }else if(globalItem['level'] == "provider"){
          apple.value = "节点提供者"
        }else if(globalItem['level'] == "default"){
          apple.value = "普通用户"
        }else if(globalItem['level'] == "banned"){
          apple.value = "封禁"
        }
        level.value = apple.value
        username.value = userData['username']
        gold.value = userData['gold']
        silver.value = userData['silver']
        userId.value = userData['userID']
        email.value = userData['email']
        ifsign.value = userData['signIn']
        if (globalItem['signIn'] == true){
          console.log("已签到")
          issigned.value = true;
        }else if (globalItem['signIn'] == false){
          console.log("未签到")
          issigned.value = false;
        }
    }else{
        if (ResponseCode == 423){
            ElMessage.error("⚡您请求的太快啦！请一分钟后再试噢 ！⚡")
        }else{
            ElMessage.error("您还没有登录噢！")
            router.push('/login')
        }
    }
})
axios.get(`/api?type=statistic&token=${GetCookie('token')}`)
.then(function(Response){
    const ResponseCode = GetStatusCode(Response);
    if (isPassedVerifictionInt(ResponseCode,200) == true){
        var statisticData = Response['data']
        usercode.value = statisticData['userCodeCount']
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
.announcement {
  width: 360px;
  height: 300px;
  margin: 24px;
  max-width: 100%;
}
.userknow{
  height: 300px;
  margin-left: 20px;
  width: 700px !important;
  max-width: 100%;
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
.main-layout .el-menu{
    height: 100%;
}
.qiandao-text{
    font-size: 15px;
    display: block;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
}
.text {
  font-size: 15px;
  display: block;
  line-height: 30px;
}
.text2{
  font-size: 27px;
}
.item {
  margin-bottom: 18px;
  display: inline-block;
}

.box-card {
  width: 758px !important;
  max-width: 100%;
  margin: 24px;
  height: 180px;
  margin-top: 25px;
}

.qiandao {
  width: 300px !important;
  max-width: 100%;
  margin: 20px;
  height: 180px;
  margin-top: 25px;
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
</style>
  