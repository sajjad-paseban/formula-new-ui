import FormulaView from "@/views/FormulaView.vue";
import FormulaEditView from "@/views/FormulaEditView.vue";
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
    },
    {
        path: 'edit',
        name: 'formula_edit',
        component: FormulaEditView,
    }
]


export default FormulaRoute;