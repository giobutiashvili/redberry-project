import { createRouter, createWebHistory } from "vue-router";



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
    }
];

const router = createRouter({
    history:createWebHistory(),
    routes
});
export default router;