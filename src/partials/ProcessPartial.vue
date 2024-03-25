<template>
    <div class="process-partial">
        <card
        title="پردازنده"
        >        
            <template #buttons>    
                <FieldsetMenuPartial />
            </template>

            <div v-if="getConditions().length == 0" class="empty">
                در حال حاضر پردازنده ای تعریف نشده است
            </div>

            <div class="process-card" v-for="(value, index) in getConditions()" :key="index">
                <div v-if="value.id === 'IF_TOOL'">
                    <div class="process-card-header">
                        <span>
                            عبارت شرطی
                        </span>
                        <ul>
                            <li>
                                <Button 
                                    title="نمایش عملیات"
                                    group="alpha"
                                    btn-class="btn btn-secondary"
                                />
                            </li>
                            <li>
                                <Button 
                                    @click="removeCondition(index)" class="button-4" 
                                    title="حذف"
                                    group="alpha"
                                    btn-class="btn btn-gray"    
                                />
                            </li>
                        </ul>
                    </div>
                    <div class="process-card-title">
                        <span v-if="value.id == 'IF_TOOL'">
                            اگر
                        </span>
                        <span v-if="value.id == 'ELSE_TOOL'">
                            در غیر اینصورت
                        </span>
                        <span class="statement-item" v-for="(st, indexSt) in value.statement" :key="indexSt" @click="removeStatementItem(index, indexSt, value.statement.length)">
                            {{  st.type === "variable" || st.type === "static_value" || st.type === "calc_value" ? st.nickname + ' ' + st.value : st.nickname }}
                        </span>
                        <StatementMenuPartial class="mx-2" :index="index" />
                    </div>
                    <div class="process-card-body">
                        <textarea @keyup="changeBody(index)" class="form-control" ref="body" name=""></textarea>
                    </div>
                </div>
        
                <div v-else-if="value.id === 'ASIGN_VARIABLE_TOOL'">
                    <div class="process-card-header">
                        <span>
                            مقدار دهی متغیرها
                        </span>
                        <ul>
                            <li>
                                <Button @click="removeCondition(index)"
                                    title="حذف"
                                    group="alpha"
                                    btn-class="btn btn-gray"
                                />
                            </li>
                        </ul>
                    </div>
                    <div class="process-card-body">
                        <input class="form-control" style="direction: ltr;" type="text" @keyup="changeBody(index)" ref="body" name="" />
                    </div>
                </div>
            </div>
        </card>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useConditionStore } from '@/stores/condition';
    import FieldsetMenuPartial from '@/partials/FieldsetMenuPartial.vue';
    import StatementMenuPartial from '@/partials/StatementMenuPartial.vue';
    import Card from '@/components/Card.vue';
    import Button from '@/components/Button.vue';
    export default defineComponent({
        name: 'process-partial',
        components: {
            FieldsetMenuPartial,
            StatementMenuPartial,
            Card,
            Button
},
        data(){
            return {
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
        },
        
    })
</script>

<style lang="scss" scoped>
    .process-partial{
        margin: 10px;
        .empty{
            text-align: center;
            font-size: 12px;
            color: rgba($color: #000000, $alpha: 0.6);
        }

        .process-card{
            background-color: #F5F5F5;
            border-radius: 4px;
            margin: 5px 0;
            direction: rtl;
            .process-card-header{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 5px 10px;
                border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
                span{
                    color: #ABB2B9;
                    font-size: 10px;
                }
                ul{
                    display: flex;
                    list-style: none;
                    position: relative;
                    top: 5px;
                    li{
                        margin: 0 2px;
                        button{
                            font-family: 'yekan';
                            font-size: 10px;
                            padding: 0.5px 5px;
                        }
                    }
                }
            }
            .process-card-title{
                padding: 10px;
                border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                
                span.statement-item{
                    margin: 0 3px;
                    background-color: #FAFBFC;
                    color: #000;
                    border: 1px solid rgba(27, 31, 35, 0.15);
                    box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
                    border-radius: 10px;
                    font-size: 11px;
                    padding: 2px 8px;
                    border-radius: 6px;
                }
            }
            .process-card-body{
                padding: 10px;
                textarea{
                    width: 100%;
                    resize: none;
                    height: 80px;
                    direction: ltr;
                }
            }
        }
    }
</style>