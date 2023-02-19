import {createRouter, createWebHistory} from "vue-router";
import Detail from '@/views/Detail'
import Update from "@/views/Update";
import TheList from "@/views/TheList";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/detail/:id',
            component: Detail
        },
        {
            path: '/update/:id',
            component: Update
        },
        {
            path: '/list',
            component: TheList,
            alias: '/'
        },
    ]
})
