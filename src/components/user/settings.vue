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
            <el-row>
            <el-card class="box-card">
    <el-avatar :src="avatar"  :size="40"  shape="square" @error="errorHandler" style="margin-left: 5px;vertical-align: middle;"/>
            <span style="margin-left: 15px;vertical-align: middle;font-size: 22px;">{{username}}</span>
    <el-row style="margin-top:20px">
    <div class="item">
      <span class="text" style="margin-left: 5px;color:rgb(118, 124, 130)">UID</span>
      <span class="text2" style="margin-left: 5px;margin-top:10px">{{userId}}</span>
    </div>
    <div class="item">
      <span class="text" style="margin-left: 5px;color:rgb(118, 124, 130);margin-left: 100px;">用户组</span>
      <span class="text2" style="margin-left: 5px;margin-top:10px;margin-left: 100px;">{{level}}</span>
    </div>
    <div class="item">
      <span class="text" style="margin-left: 5px;color:rgb(118, 124, 130);margin-left: 100px;">隧道</span>
      <span class="text2" style="margin-left: 5px;margin-top:10px;margin-left: 100px;">{{usercode}}</span>
    </div>
  </el-row>
  <el-button plain style="margin-left: 5px;margin-top:10px" :icon="User" @click="changeusernameVisible = true">修改用户名</el-button>
  <el-dialog v-model="changeusernameVisible" title="修改用户名" width="30%" destroy-on-close align-center >
<el-form style="margin-left:20px;">
  <el-row>
    <span style="margin-top:7px;" class="ml-3 w-35 text-gray-600 inline-flex items-center">用户名</span>
    <el-input v-model="usernamechange" style="margin-left:20px; width: 70%;" />
  </el-row>
  <el-row style="margin-top:20px">
    <span style="margin-top:7px;" class="ml-3 w-35 text-gray-600 inline-flex items-center">验证码</span>
    <el-input v-model="verificationcode" style="margin-left:20px; width: 38%;" />
    <el-button plain @click="getcode" style="width:100px;margin-left:12px" :disabled="isSended" :loading="isSending">{{ButtonData}}</el-button>
  </el-row>
  </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="changeusernameVisible = false">取消</el-button>
        <el-button type="primary" @click="changeusernameVisible = false;changeusername()">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <el-button plain style="margin-left: 10px;margin-top:10px" :icon="Message" @click="changeuseremailVisible = true">修改邮箱</el-button>
  <el-dialog v-model="changeuseremailVisible" title="修改邮箱" width="30%" destroy-on-close align-center >
<el-form style="margin-left:20px;">
  <el-row>
    <span style="margin-top:7px;" class="ml-3 w-35 text-gray-600 inline-flex items-center">新邮箱</span>
    <el-input v-model="useremailchange" style="margin-left:20px; width: 70%;" />
  </el-row>
  <el-row style="margin-top:20px">
    <span style="margin-top:7px;" class="ml-3 w-35 text-gray-600 inline-flex items-center"  placeholder="旧邮箱">验证码</span>
    <el-input v-model="verificationcode" style="margin-left:20px; width: 38%;" />
    <el-button plain @click="getcode" style="width:100px;margin-left:12px" :disabled="isSended" :loading="isSending">{{ButtonData}}</el-button>
  </el-row>
  <el-row style="margin-top:20px">
    <span style="margin-top:7px;" class="ml-3 w-35 text-gray-600 inline-flex items-center" placeholder="新邮箱">验证码</span>
    <el-input v-model="verificationcodenew" style="margin-left:20px; width: 38%;" />
    <el-button plain @click="getcodenew" style="width:100px;margin-left:12px" :disabled="isSended2" :loading="isSending2">{{ButtonData2}}</el-button>
  </el-row>
  </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="changeuseremailVisible = false">取消</el-button>
        <el-button type="primary" @click="changeuseremailVisible = false;changeuseremail()">确定</el-button>
      </span>
    </template>
  </el-dialog>
    <el-button plain style="margin-left: 10px;margin-top:10px" :icon="EditPen" @click="changepasswordVisible = true">修改密码</el-button>
    <el-dialog v-model="changepasswordVisible" title="修改密码" width="30%" destroy-on-close align-center >
<el-form style="margin-left:20px;">
  <el-row>
    <span style="margin-top:7px;" class="ml-3 w-35 text-gray-600 inline-flex items-center">新密码</span>
    <el-input v-model="userpasswordchange" style="margin-left:20px; width: 70%;" />
  </el-row>
  <el-row style="margin-top:20px">
    <span style="margin-top:7px;" class="ml-3 w-35 text-gray-600 inline-flex items-center">验证码</span>
    <el-input v-model="verificationcode" style="margin-left:20px; width: 38%;" />
    <el-button plain @click="getcode" style="width:100px;margin-left:12px" :disabled="isSended" :loading="isSending">{{ButtonData}}</el-button>
  </el-row>
  </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="changepasswordVisible = false">取消</el-button>
        <el-button type="primary" @click="changepasswordVisible = false;changeusername()">确定</el-button>
      </span>
    </template>
  </el-dialog>
  </el-card >
  <el-card class="kami">
    <template #header>
      <div class="card-header">
        <span>兑换卡密</span>
      </div>
    </template>
    <el-form>
      <span>请输入您购买的卡密</span>
      <el-input placeholder="还没做好...." v-model="card" :prefix-icon="Key" style="margin-top: 15px">
      </el-input>
      <el-button plain style="margin-top: 20px;float: right;" :icon="Present" @click="carduse">兑换</el-button>
      <el-button plain style="margin-top: 20px;float: right;margin-right: 10px;" :icon="ShoppingTrolley" @click="buykey">购买卡密</el-button>   
    </el-form>
  </el-card>
</el-row>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { Menu as IconMenu, House,Setting, Cpu, Shop, EditPen, ArrowDown,  User, Message, Key, ShoppingTrolley, Present} from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';
import { ref, markRaw } from 'vue';
import { GetStatusCode, isPassedVerifictionInt } from '../../modules/StatusCodeParser';
import { GetCookie, RemoveCookie } from '../../modules/CookieHelper';
import axios from 'axios';
import { Action, ElMessage, ElMessageBox, ElNotification, ElLoading} from 'element-plus';
import router from '../router';
const route = useRoute();
let username = ref('**');
let gold = ref('--');
let silver = ref('--')
let userId = ref('0')
let avatar = ref('0')
let qq = ref('0')
let email = ref('**')
let apple = ref('**')
let level = ref('**')
let verificationcode = ref()
let verificationcodenew = ref()
let usernamechange = ref()
let useremailchange = ref()
let userpasswordchange = ref()
let card = ref()
let isSended = ref(false)
let isSending = ref(false)
let isSended2 = ref(false)
let isSending2 = ref(false)
let usercode = ref('0')
let ButtonData = ref('获取验证码')
let ButtonData2 = ref('获取验证码')
const errorHandler = () => true

const changeusernameVisible = ref(false)
const changeuseremailVisible = ref(false)
const changepasswordVisible = ref(false)

const buykey = () => {
  window.open("https://www.mcrmb.com/fk/24184",'_blank')
}
const carduse = () => {
  axios.get(`/api?type=cardUse&card=${card.value}&token=${GetCookie('token')}`)
      .then(function(Response){
        const ResponseCode = GetStatusCode(Response);
        if (isPassedVerifictionInt(ResponseCode,200) == true){
          var globalItem = Response['data'];
          console.log(globalItem)
              if (globalItem['success'] === true){
                ElMessage.success('兑换成功！')
                ElNotification.success({
                  title: '兑换成功',
                  dangerouslyUseHTMLString: true,
                  message: `${Response['data']['message']}`
              })
              } else if (globalItem['success'] === false){
                ElNotification.error({
                  title: '兑换失败',
                  dangerouslyUseHTMLString: true,
                  message: `${Response['data']['message']}`
                })
        }else{
          if (ResponseCode == 423){
            ElMessage.error("IP黑名单，请稍后再试")
          }else{
            ElMessage.error(Response['data']['message'])
          }
        }
      }
      })
      .catch(function(Response){
        ElNotification.error('恭喜您中奖了！无法连接到服务器')
        setTimeout(function () {
          window.location.reload();
        },4000);
      })
}
const changeusername = () => {
axios.get(`/api?type=infoUpdate&key=username&value=${usernamechange.value}&code=${verificationcode.value}&token=${GetCookie('token')}`)
.then(function(Response){
  const ResponseCode = GetStatusCode(Response);
  if (isPassedVerifictionInt(ResponseCode,200) == true){
      ElMessage.success('已更新用户名！')
      setTimeout(function () {
             window.location.reload();
          },4000);
  }else{
      if (ResponseCode == 423){
          ElMessage.error("IP黑名单，请稍后再试")
          setTimeout(function () {
             window.location.reload();
          },4000);
      }else{
          ElMessage.error(Response['data']['message'])
          setTimeout(function () {
             window.location.reload();
          },4000);
      }
  }
})
.catch(function(Response){
  ElNotification.error('恭喜您中奖了！无法连接到服务器')
  setTimeout(function () {
             window.location.reload();
          },4000);
})
}
const changeuserpassword = () => {
axios.get(`/api?type=infoUpdate&key=password&value=${userpasswordchange.value}&code=${verificationcode.value}&token=${GetCookie('token')}`)
.then(function(Response){
  const ResponseCode = GetStatusCode(Response);
  if (isPassedVerifictionInt(ResponseCode,200) == true){
      ElMessage.success('已更新密码！')
      setTimeout(function () {
             window.location.reload();
          },4000);
  }else{
      if (ResponseCode == 423){
          ElMessage.error("IP黑名单，请稍后再试")
          setTimeout(function () {
             window.location.reload();
          },4000);
      }else{
          ElMessage.error(Response['data']['message'])
          setTimeout(function () {
             window.location.reload();
          },4000);
      }
  }
})
.catch(function(Response){
  ElNotification.error('恭喜您中奖了！无法连接到服务器')
  setTimeout(function () {
             window.location.reload();
          },4000);
})
}
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
const changeuseremail = () => {
axios.get(`/api?type=infoUpdate&key=email&value=${useremailchange.value}&code=${verificationcode.value}&code2=${verificationcodenew.value}&token=${GetCookie('token')}`)
.then(function(Response){
  const ResponseCode = GetStatusCode(Response);
  if (isPassedVerifictionInt(ResponseCode,200) == true){
      ElMessage.success('已更新邮箱！')
      setTimeout(function () {
             window.location.reload();
          },4000);
  }else{
      if (ResponseCode == 423){
          ElMessage.error("IP黑名单，请稍后再试")
          setTimeout(function () {
             window.location.reload();
          },4000);
      }else{
          ElMessage.error(Response['data']['message'])
          setTimeout(function () {
             window.location.reload();
          },4000);
      }
  }
})
.catch(function(Response){
  ElNotification.error('恭喜您中奖了！无法连接到服务器')
  setTimeout(function () {
             window.location.reload();
          },4000);
})
}
const getcode = () => {
    isSended.value = true;
    isSending.value = true;
    //按下按钮后，获取验证码，60s按钮不可用，60s后按钮可用
    let time = 60;
    const loginContainerInstance = document.getElementById("regBox");
    const loadingInstance = ElLoading.service({target: loginContainerInstance, text: "少女祈祷中..", background: 'rgba(0, 0, 0, 0.7)',});
    axios.get(`/api?type=verification&email=${email.value}&key=infoUpdate`)
      .then(function(Response){
          loadingInstance.close();
          const ResponseCode = GetStatusCode(Response)
          if (isPassedVerifictionInt(ResponseCode,200) == true){
              ElMessage.success("发送成功")
              let timer = setInterval(() => {
        time--;
        ButtonData.value = time + '秒后重试';
            isSended.value = true;
            isSending.value = true;
        if (time <= 0) {
            clearInterval(timer);
            isSended.value = false;
            isSending.value = false;
            ButtonData.value = '获取验证码';
        }
    }, 1000);
          }else{
              if (ResponseCode == 423){
                  ElMessage.error("IP黑名单，请稍后再试")
                  isSended.value = false;
                  isSending.value = false;
                  ButtonData = ref('获取验证码')
            }else{
                  ElMessage.error(`获取验证码失败：${Response.data['message']}`)
                  isSended.value = false;
                  isSending.value = false;
                  ButtonData = ref('获取验证码')
                }
          }
      })
}
const getcodenew = () => {
    isSended2.value = true;
    isSending2.value = true;
    //按下按钮后，获取验证码，60s按钮不可用，60s后按钮可用
    let time = 60;
    const loginContainerInstance = document.getElementById("regBox");
    const loadingInstance = ElLoading.service({target: loginContainerInstance, text: "少女祈祷中..", background: 'rgba(0, 0, 0, 0.7)',});
    axios.get(`/api?type=verification&email=${useremailchange.value}&key=infoUpdate`)
      .then(function(Response){
          loadingInstance.close();
          const ResponseCode = GetStatusCode(Response)
          if (isPassedVerifictionInt(ResponseCode,200) == true){
              ElMessage.success("发送成功")
              let timer = setInterval(() => {
        time--;
        ButtonData2.value = time + '秒后重试';
            isSended2.value = true;
            isSending2.value = true;
        if (time <= 0) {
            clearInterval(timer);
            isSended2.value = false;
            isSending2.value = false;
            ButtonData2.value = '获取验证码';
        }
    }, 1000);
          }else{
              if (ResponseCode == 423){
                  ElMessage.error("IP黑名单，请稍后再试")
                  isSended2.value = false;
                  isSending2.value = false;
                  ButtonData2 = ref('获取验证码')
            }else{
                  ElMessage.error(`获取验证码失败：${Response.data['message']}`)
                  isSended2.value = false;
                  isSending2.value = false;
                  ButtonData2 = ref('获取验证码')
                }
          }
      })
}

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
      qq.value = userData['qq']
      avatar.value = "http://q2.qlogo.cn/headimg_dl?dst_uin=" + qq.value + "&spec=100"
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
.text {
  font-size: 15px;
  display: block;
  line-height: 30px;
}
.text2{
  font-size: 27px;
}
.card-header {
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  display: inline-block;
}

.box-card {
  width: 650px;
  max-width: 100%;
  height: 220px;
  margin: 24px;
}
.about {
  width: 650px;
  max-width: 100%;
  height: 260px;
  margin: 24px;
  display: inline-block;
}
.kami {
  width: 350px;
  max-width: 100%;
  height: 220px;
  margin: 24px;
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
</style>
