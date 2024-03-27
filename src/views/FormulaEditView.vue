<template>
    <div class="formula-edit-view">
        <section class="menu">
            <h3>
                فرمول ساز
            </h3>
            <variable-declaration-partial />
            <all-variable-partial />
            <Form 
                :validation-schema="form.FormSchema"
                @submit="save"
            >
                <div class="form-group mx-3">
                    <label for="title">
                        عنوان کد درآمدی
                    </label>
                    <Field name="title" id="title" v-model="form.params.title" class="form-control form-control-sm" />
                    <ErrorMessage name="title" />
                </div> 
                <ul class="sub-menu">
                    <li>
    
                        <Button 
                            type="submit"
                            btn-class="btn btn-secondary"
                            group="alpha"
                            title="ذخیره"    
                        />
    
                    </li>
                    <li>
                        <Button 
                            type="button"
                            group="alpha"
                            btn-class="btn btn-gray"
                            title="خروج"
                            @click="exit"
                        />
                    </li>
                </ul>
            </Form>

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
    import { getOne, edit } from '@/services/earning.service';
    import { ErrorMessage, Field, Form } from 'vee-validate';
    import * as yup from 'yup'
    export default defineComponent({
        name: 'IndexView',
        components: { 
            OutputPartial,
            AllVariablePartial,
            VariableDeclarationPartial,
            ProcessPartial,
            Button,
            Form,
            Field,
            ErrorMessage
        },
        data(){
            const schema = yup.object({
                title: yup.string().required('فیلد عنوان کد درآمدی اجباری می باشد')
            })
            return {
                form:{
                    FormSchema: schema,
                    params:{
                        title: null
                    }
                },
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
            async save(values: any, { resetForm }: any){
                const params = this.$route.params;
                const variables = variablesToPhpCode(useVariableStore().variable);
                const condition = conditionToPhpCode(useConditionStore().process_condition, useVariableStore().variable);
                const code = variables + "\n" + condition
                
                this.code = code

                const data = {
                    title: this.form.params.title,
                    system_type: 1,
                    variables: JSON.stringify(useVariableStore().variable),
                    process: JSON.stringify(useConditionStore().process_condition),
                    Body: code
                }

                const result = await edit(data, params.id).then(res => res);
            
                if(result.status == 201 || result.status == 200){
                    messages(ToastMessage.Success)

                    setTimeout(() => {
                        useConditionStore().setNull()
                        useVariableStore().setNull()
                        resetForm()
                        this.$router.push({path: '/'})
                    }, 3000)
                }else{
                    messages(ToastMessage.ServerError)
                }
            },
            exit(){
                useConditionStore().setNull()
                useVariableStore().setNull()
                this.$router.push({path: '/'})
            }
        },
        async mounted(){
            const params = this.$route.params;
            const result = await getOne(params.id).then(res => res)
            if(result.status == 200 || result.status == 201){
                useVariableStore().setValue(JSON.parse(result.data.row.variables))
                useConditionStore().setValue(JSON.parse(result.data.row.process))
                this.form.params.title = result.data.row.title
                this.code = result.data.row.Body
                
            }
        }
        
    })
</script>

<style lang="scss" scoped>
    .formula-edit-view{
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
            
            form{

                span{
                    color: #DF1C44;
                    font-size: 13px ;
                }

                label{
                    font-family: 'vazir';
                    font-size: 15px;
                }
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