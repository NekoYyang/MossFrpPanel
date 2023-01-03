<template>
  <el-config-provider :locale="language"><router-view></router-view></el-config-provider>
</template>

<style>
:root{
  font-family: 'HYWenHei 75W',Inter, Avenir, Helvetica, Arial, sans-serif;
  height: 100%;
  width: 100%;
}
#app{
  width: 100%;
  height: 100%;
}
</style>

<script>
import { ref } from 'vue'
const language = ref('zh-cn')
export default {
  name: "App",
  created() {
    console.log('开始环境判断...')
    if (this._isMobile()) {
      console.log("检测为手机端，将重定向到手机用户页面...");
      this.$router.replace('/m');
    } else {
      console.log("检测为电脑端，不做判断...");
    }
  },
  methods: {
    // 判断手机端还是PC端
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    }
  },
};

</script>