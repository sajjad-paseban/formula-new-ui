import FormulaView from "@/views/FormulaView.vue";
import { RouteRecordRaw } from "vue-router";

const FormulaRoute: RouteRecordRaw[] = [
    {
        path: '',
        name: 'formula',
        redirect: '/'
    },
    {
        path: 'generate',
        name: 'generate',
        component: FormulaView,
    }
]


export default FormulaRoute;