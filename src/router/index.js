import { createRouter, createWebHashHistory  } from "vue-router";



const routes = [
    {
        path:'/',
        name:'home',
        component:() => import('../components/HomeView.vue')

    },
    {
        path:'/addnewtask',
        name:'addnewtask',
        component:() => import('../components/AddNewTask.vue')
    },
    {
        path:'/taskDetail/:id',
        name:'taskDetail',
        component:() => import('../components/taskDetail.vue')
    }
];

const router = createRouter({
    history:createWebHashHistory(),
    routes
});
export default router;