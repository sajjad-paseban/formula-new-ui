<template>
    <div class="all-variable-partial">
        <card
            title="همه متغیرها"
        >
            <span class="empty-variables" v-if="getVariables().length  == 0">
                درحال حاضر متغیری تعریف نشده است
            </span>
            <div class="card-variable" v-for="(item, variableIndex) in getVariables()" :key="variableIndex">
                <div class="variable">
                    <span>
                        {{ item.name }}=
                    </span>
                    <span :title="item.type == 1 ? item.value.information : null">
                        {{ item.type == 1 ? item.value.name : item.value }}
                    </span>
                </div>
                <div class="variable-menu">
                    <Button 
                        @click="removeVariable(variableIndex)"
                        group="alpha"
                        btn-class="btn btn-gray"
                        class="mx-1"
                        title="حذف"
                    />
                    
                    <Button 
                        v-if="item.type == 1 && item.value.params"
                        @click="showParameters(variableIndex)"
                        group="alpha"
                        btn-class="btn btn-light"
                        class="mx-1"
                        title="پارامترها"
                    />

                </div>
                <div class="card-parameters" v-if="item.type == 1 && item.value.params" :ref="'card_parameters_' + variableIndex">
                    <div class="form-group my-2" v-for="(value, parameterIndex) in convert(item.value.params)" :key="parameterIndex">
                        <label :for="value.id" :title="value.information">
                            <span>
                                ({{ value.id }})
                            </span>
                            {{ value.nickname }}
                        </label>
                        <input type="text" v-model="value.value" class="form-control form-control-sm" @keyup="setParameters(variableIndex, parameterIndex, $event)" :name="value.id" :id="value.id" :title="value.information">
                    </div>
                </div>
            </div>
        </card>
    </div>
    
</template>

<script lang="ts">
    import Card from '@/components/Card.vue';
    import { defineComponent } from 'vue';
    import { useVariableStore } from '../stores/variable';
    import Button from '@/components/Button.vue';
    
    interface IParamsParameter{
        id?: string,
        nickname?: string,
        information?: string,
        value?: string
    }
    interface IData {
        params: IParamsParameter[]  
    }

    export default defineComponent({
        name: 'all-variable-partial',
        components: {
            Card,
            Button
        },
        data(): IData{
            return {
                params: []
            }
        },
        methods:{
            removeVariable(pos: number){
                useVariableStore().removeVariable(pos)
            },
            showParameters(index: number){
                (this.$refs['card_parameters_'+index] as Array<any>)[0].classList.toggle('show')
            },
            getVariables(){
                return useVariableStore().variable
            },
            convert(json: any){
                return JSON.parse(json)
            },
            setParameters(variableIndex: number, parameterIndex: number, e: any){
                const value = e.target.value
                useVariableStore().setParameter(variableIndex, parameterIndex, value)
            }
        },
        
    })
</script>

<style lang="scss" scoped>
    .all-variable-partial{
        
        margin: 10px;
        span.empty-variables{
            display: block;
            text-align: center;
            font-size: 10px;
            color: rgba($color: #000000, $alpha: 0.5);
        }
        .card-variable{
            background-color: #ECF0F1;
            direction: ltr;
            border-radius: 3px;
            position: relative;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            margin: 20px 0;

            .variable{
                padding: 15px 10px;
            }
            .variable-menu{
                display: flex;
                position: absolute;
                top: -14px;
                right: 0;
                
            }
            .card-parameters{
                direction: rtl;
                display: none;
                border-top: 1px solid rgba($color: #000000, $alpha: 0.2);
                width: 100%;
                padding: 10px 10px;
                &.show{
                    display: block;
                }
            }
        }
    }
</style>