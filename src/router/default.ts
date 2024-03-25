import HomeView from "@/views/HomeView.vue";
import VariableView from "@/views/variable/VariableView.vue";
import { RouteRecordRaw } from "vue-router";

const DefaultRoute: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/variables',
        name: 'variables',
        component: VariableView
    }
]


export default DefaultRoute;