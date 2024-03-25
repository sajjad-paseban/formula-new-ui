<template>
    <div class="statement-menu-partial">
        <button type="button" class="btn btn-sm btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            ابزار های شرطی +
        </button>
        <ul class="dropdown-menu">
            <li class="dropdown-item">
                متغیر
                <span>
                    (variable)
                </span>
                <div class="variables-sub-menu-tools">
                    <ul>
                        <li v-if="getVariables().length == 0">
                            درحال حاضر متغیری تعریف نشده است
                        </li>
                        <li v-for="(variable, index) in getVariables()" :key="index" @click="addTool($props.index ,'VARIABLE_TOOL', variable.name)">
                            {{ variable.name }}
                        </li>
                    </ul>
                </div>
            </li>
            <li class="dropdown-item" @click="addTool($props.index ,'STATIC_VALUE_TOOL')">
                مقدار ثابت
                <span>
                    (input)
                </span>
            </li>
            <li class="dropdown-item" @click="addTool($props.index ,'CALC_TOOL')">
                عملیات محاسباتی
                <span>
                    (calc)
                </span>
            </li>
            <li class="dropdown-item" @click="addTool($props.index ,'AND_TOOL')">
                و
                <span>
                    (and)
                </span>
            </li>
            <li class="dropdown-item" @click="addTool($props.index ,'OR_TOOL')">
                یا
                <span>
                    (or)
                </span>
            </li>
            <li class="dropdown-item" @click="addTool($props.index ,'TRUE_TOOL')">
                درست باشد
                <span>
                    (true)
                </span>
            </li>
            <li class="dropdown-item" @click="addTool($props.index ,'FALSE_TOOL')">
                نادرست باشد
                <span>
                    (false)
                </span>
            </li>
            <li class="dropdown-item" @click="addTool($props.index ,'EQUAL_TOOL')">
                برابر باشد با
                <span>
                    (==)
                </span>
            </li>
            <li class="dropdown-item" @click="addTool($props.index ,'NOT_EQUAL_TOOL')">
                برابر نباشد با
                <span>
                    (!=)
                </span>
            </li>
            <li class="dropdown-item" @click="addTool($props.index ,'GOE_TOOL')">
                بزرگ تر مساوی با
                <span>
                    (>=)
                </span>
            </li>
            <li class="dropdown-item" @click="addTool($props.index ,'G_TOOL')">
                بزرگ تر از
                <span>
                    (>)
                </span>
            </li>
            <li class="dropdown-item" @click="addTool($props.index ,'LOE_TOOL')">
                کوچک تر مساوی با
                <span>
                    (&lt;=)
                </span>
            </li>
            <li class="dropdown-item" @click="addTool($props.index ,'L_TOOL')">
                کوچک تر از
                <span>
                    (&lt;)
                </span>
            </li>                        
        </ul>
    </div>
</template>

<script lang="js">

    import { defineComponent } from "vue";
    import { useConditionStore } from "@/stores/condition";
    import { StatementParamValueTool } from '@/helpers/functions'
    import { useVariableStore } from "@/stores/variable";

    export default defineComponent({
        name: 'statement-menu',
        props: ["index"],
        methods: {
            addTool(pos, key, value=''){
                if(key == "STATIC_VALUE_TOOL"){
                    this.$swal.fire({
                        title: "مقدار ثابت را وارد نمایید",
                        input: "number",
                        showCancelButton: true,
                        cancelButtonText: "لغو",
                        confirmButtonText: "ثبت"
                        
                    }).then((result) =>{
                        if(result.isConfirmed)
                            useConditionStore().addStatement(
                                pos,
                                StatementParamValueTool(key, result.value)
                            )
                    });
                }else if(key == "CALC_TOOL"){
                    this.$swal.fire({
                        title: "مقادیر خود را وارد نمایید",
                        input: "text",
                        showCancelButton: true,
                        cancelButtonText: "لغو",
                        confirmButtonText: "ثبت"
                        
                    }).then((result) =>{
                        if(result.isConfirmed)
                            useConditionStore().addStatement(
                                pos,
                                StatementParamValueTool(key, result.value)
                            )
                    });
                }else{
                    useConditionStore().addStatement(
                        pos,
                        StatementParamValueTool(key, value)
                    )
                }

            },
            getVariables(){
                return useVariableStore().variable
            }
        }
    })
</script>


<style lang="scss" scoped>
.statement-menu{
    position: relative;
    bottom: 2px;
    ul{
        display: flex;
        list-style: none;
        li{
            margin: 0 5px;
            position: relative;
            span{
                background-color: #e1ecf4;
                border: 1px solid #7aa7c7;
                color: #7aa7c7;
                padding: 3px 5px;
                border-radius: 5px;
                font-size: 10px;
                font-family: 'yekan';
                cursor: pointer;
            }
            
            &[id=tools]{
                .statement-sub-menu-tools{
                    position: absolute;
                    right: 0;
                    top: 0;
                    background-color: #e1ecf4;
                    border: 1px solid #7aa7c7;
                    width: 120px;   
                    height: auto;  
                    margin-top: 20px;
                    display: none; 
                    z-index: 5;
                    border-radius: 2px;
                    ul{
                        display: flex;
                        flex-wrap: wrap;
                        padding: 5px;
                        li{
                            width: 100%;
                            padding: 3px 5px;
                            margin: 2px 2px;
                            background-color: #fefefe;
                            border-radius: 3px;
                            user-select: none;
                            cursor: pointer;
                            font-size: 10px;
                            position: relative;
                            span{
                                background-color: transparent;
                                border: none;
                                font-family: Arial;
                                font-size: 8px;
                                position: relative;
                                left: 6px;
                                direction: ltr;
                                display: inline-block;
                            }
                            .variables-sub-menu-tools{
                                width: 80px;
                                background-color: #e1ecf4;
                                border: 1px solid #7aa7c7;                                
                                position: absolute;
                                z-index: 5;
                                right: 100px;
                                top: 0;
                                border-radius: 2px;
                                // margin-right: 10px;
                                display: none;
                                ul{
                                    li{
                                        text-align: center;
                                    }
                                }

                            }
                            &.variable-item:hover{
                                .variables-sub-menu-tools{
                                    display: block;
                                }
                            }
                        }
                    }
                }

                &:hover{
                    .statement-sub-menu-tools{
                        display: block;
                    }

                }
            }
        }
    }
}
</style>