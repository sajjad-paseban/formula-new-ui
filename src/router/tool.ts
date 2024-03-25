import VariableCreateView from '@/views/variable/VariableCreateView.vue';
import VariableEditView from '@/views/variable/VariableEditView.vue';
import { RouteRecordRaw } from 'vue-router';
const ToolRoute: RouteRecordRaw[] = [
    {
        path: '',
        name: 'variable_index',
        redirect: '/',
    },
    {
        path: 'variable/create',
        name: 'variable_create',
        component: VariableCreateView
    },
    {
        path: 'variable/edit/:id',
        name: 'variable_edit',
        component: VariableEditView
    },
]

export default ToolRoute;