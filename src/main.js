import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import router from './components/router/index.js';
import 'vant/lib/index.css';
import './modules/rem'

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.mount('#app');
router.beforeEach((to, from, next) => {
    // to去哪  from  来自
    if(to.meta.title) {
        document.title = to.meta.title
    }
    next()
})
