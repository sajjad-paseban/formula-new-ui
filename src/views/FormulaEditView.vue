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
                <div class="form-group mx-3">
                    <label for="year">
                        سال
                    </label>
                    <Field name="year" @keypress="handelNumber" id="year" v-model="form.params.year" class="form-control form-control-sm" />
                    <ErrorMessage name="year" />
                </div> 
                <div class="form-group mx-3">
                    <label for="earningtolltype">
                        ردیف درآمدی
                    </label>
                    <Field as="select" name="earningtolltype" id="earningtolltype" v-model="form.params.earningtolltype" class="form-select form-select-sm">
                        <option v-for="(item, index) in earningtolltypes" :key="index" :value="item.id">
                            {{ item.Title }}
                        </option>
                    </Field>
                    <ErrorMessage name="earningtolltype" />
                </div>
                <div class="form-group mx-3">
                    <label for="code_floortype">
                        طبقه
                    </label>
                    <Field as="select" name="code_floortype" id="code_floortype" v-model="form.params.code_floortype" class="form-select form-select-sm">
                        <option v-for="(item, index) in code_floortypes" :key="index" :value="item.id">
                            {{ item.Title }}
                        </option>
                    </Field>
                    <ErrorMessage name="code_floortype" />
                </div>
                <div class="form-group mx-3">
                    <label for="description">
                        توضیحات
                    </label>
                    <Field as="textarea" name="description" id="description" v-model="form.params.description" class="form-control form-control-sm" />
                    <ErrorMessage name="description" />
                </div>
                <div class="form-group mx-3">
                    <label for="priority">
                        الویت
                    </label>
                    <Field @keypress="handelNumber" name="priority" id="priority" v-model="form.params.priority" class="form-control form-control-sm" />
                    <ErrorMessage name="priority" />
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
    import { getAll as earningtolltype_getAll } from '@/services/earningtolltype.service';
    import { getAll as floortype_getAll } from '@/services/floortype.service';
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
                title: yup.string().required('فیلد عنوان کد درآمدی اجباری می باشد'),
                year: yup.string().required('فیلد سال اجباری می باشد'),
                earningtolltype: yup.string().required('فیلد ردیف درآمدی اجباری می باشد'),
                code_floortype: yup.string().required('فیلد طبقه اجباری می باشد'),
            })
            return {
                form:{
                    FormSchema: schema,
                    params:{
                        title: null,
                        year: null,
                        earningtolltype: null,
                        code_floortype: null,
                        description: null,
                        priority: null
                    }
                },
                response: null,
                code: '',
                earningtolltypes: null,
                code_floortypes: null
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
                    Year: this.form.params.year,
                    earningtolltype_id: this.form.params.earningtolltype,
                    code_floortype_id: this.form.params.code_floortype,
                    Description: this.form.params.description,
                    Priority: this.form.params.priority,
                    variables: JSON.stringify(useVariableStore().variable),
                    process: JSON.stringify(useConditionStore().process_condition),
                    body: code,
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
            this.earningtolltypes = await earningtolltype_getAll().then(res => res.data)
            this.code_floortypes = await floortype_getAll().then(res => res.data)

            const params = this.$route.params;
            const result = await getOne(params.id).then(res => res)
            if(result.status == 200 || result.status == 201){
                useVariableStore().setValue(JSON.parse(result.data.row.formula_earnings.variables))
                useConditionStore().setValue(JSON.parse(result.data.row.formula_earnings.process))
                this.form.params.title = result.data.row.formula_earnings.title
                this.code = result.data.row.formula_earnings.body
                this.form.params.year = result.data.row.Year
                this.form.params.earningtolltype = result.data.row.earningtolltype_id
                this.form.params.code_floortype = result.data.row.code_floortype_id
                this.form.params.description = result.data.row.Description
                this.form.params.priority = result.data.row.Priority
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