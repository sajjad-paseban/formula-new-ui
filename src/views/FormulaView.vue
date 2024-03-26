<template>
    <div class="formula-view">
        <section class="menu">
            <h3>
                فرمول ساز
            </h3>
            <variable-declaration-partial />
            <all-variable-partial />
            <ul class="sub-menu">
                <li>

                    <Button 
                        @click="save"
                        btn-class="btn btn-secondary"
                        group="alpha"
                        title="ذخیره"    
                    />

                </li>
                <li>
                    <Button 
                        is-link="true"
                        path="/"
                        group="alpha"
                        btn-class="btn btn-gray"
                        title="خروج"
                    />
                </li>
            </ul>
        </section>
        <section class="content">
            
            <process-partial />

            <output-partial v-if="true" :code="code" :result="response" />
        </section>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useVariableStore } from '@/stores/variable';
    import { useConditionStore } from '@/stores/condition';
    import { conditionToPhpCode, variablesToPhpCode } from '@/helpers/functions';
    import OutputPartial from '@/partials/OutputPartial.vue';
    import AllVariablePartial from '@/partials/AllVariablePartial.vue';
    import VariableDeclarationPartial from '@/partials/VariableDeclarationPartial.vue';
    import ProcessPartial from '@/partials/ProcessPartial.vue';
    import Button from '@/components/Button.vue';
import { messages } from '@/helpers/swal';
import { ToastMessage } from '@/helpers/enums';
import axios from 'axios';
    export default defineComponent({
        name: 'IndexView',
        components: { 
            OutputPartial,
            AllVariablePartial,
            VariableDeclarationPartial,
            ProcessPartial,
            Button
        },
        data(){
            return {
                response: null,
                code: ''
            }
        },
        methods:{
            getConditions(){
                return useConditionStore().process_condition
            },
            removeCondition(pos: number){
                useConditionStore().removeCondition(pos)
            },
            removeStatementItem(indexParent: number, indexStatement: number, length: number){
                if(indexStatement == length - 1)
                    useConditionStore().removeStatementItem(indexParent, indexStatement)
            },
            changeBody(pos: number){
                useConditionStore().addBody(
                    pos,
                    (this.$refs.body as Array<any>)[pos].value
                )
            },
            async save(){
                const variables = variablesToPhpCode(useVariableStore().variable);
                const condition = conditionToPhpCode(useConditionStore().process_condition, useVariableStore().variable);
                let data = new FormData();
                const code = variables + "\n" + condition
                this.code = code;

                data.append('code', code);
                try{
                    const result = await axios.post('http://localhost/back-formula-app/public/api/compiler/run', data).then(res => res)
                    this.response = result.data
                }catch(error){
                    messages(ToastMessage.ServerError)
                }
            }
        }
        
    })
</script>

<style lang="scss" scoped>
    .formula-view{
        display: flex;
        direction: rtl;
        .menu{
            background-color: #fff;
            width: calc(250px + 10px);
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            border-left: 2px solid rgba($color: #000000, $alpha: 0.1);
            h3{
                font-family: 'yekan';
                text-align: center;
                padding: 10px 0;
                color: rgba($color: #000000, $alpha: 0.5);
                font-size: 18px;
                border-bottom: 2px solid rgba($color: #000000, $alpha: 0.1);
            }
            
            ul.sub-menu{
                display: flex;
                list-style: none;
                justify-content: start;
                padding: 5px 10px;
                li{
                    margin: 0 2px;
                    a{
                        font-size: 12px;
                        font-family: 'yekan';
                        padding: 2px 8px;
                    }
                }       
            }
        }
        .content{
            overflow-y: auto;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: calc(100% - 260px);
        }
    }
</style>