import { createRouter } from "vue-router";
import { createWebHashHistory } from "vue-router";
import loginView from '../user/login.vue';
import regView from '../user/register.vue';
import forgetpwdView from '../user/forgetpwd.vue';
import indexView from '../index.vue';
import nodeView from '../frp/node.vue'
import listView from '../frp/list.vue'
import settingsView from '../user/settings.vue'
import mobileLoginView from '../user/mlogin.vue'
import mobileIndexView from '../mindex.vue'
import mobileListView from '../frp/mlist.vue'
import mobileCodeView from '../frp/mcode.vue'
const routes = [
    {
        path: '/login',
        name: 'Login',
        component: loginView,
        meta: {
            title: '登录 | MossFrp'
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: regView,
        meta: {
            title: '注册 | MossFrp'
        }
    },
    //Crab：您写了您妈呢
    {
        path: '/forgetpwd',
        name: 'ForgetPassword',
        component: forgetpwdView,
        meta: {
            title: '找回密码 | MossFrp'
        }
    },
    {
        path: '/',
        name: 'Index',
        component: indexView,
        meta: {
            title: 'MossFrp'
        }
    },
    {
        path: '/status',
        name: 'Node',
        component: nodeView,
        meta: {
            title: '节点状态 | MossFrp'
        }
    },
    {
        path: '/code',
        name: 'Code',
        component: listView,
        meta: {
            title: '穿透码列表 | MossFrp'
        }
    },
    {
        path: '/settings',
        name: 'Settings',
        component: settingsView,
        meta: {
            title: '设置 | MossFrp'
        }
    },
    {
        path: '/mlogin',
        name: 'Mobile Login',
        component: mobileLoginView
    },
    {
        path: '/m',
        name: 'MobileIndex',
        component: mobileIndexView
    },
    {
        path: '/m/list',
        name: 'MobileList',
        component: mobileListView
    },
    {
        path: '/m/code',
        name: 'MobileCode',
        component: mobileCodeView
    }
];
const router = createRouter({history: createWebHashHistory(),routes: routes});
export default router;