<template>
    <div class="systematic-variables-edit-form">
        <Form 
            :validation-schema="FormSchema"
            @submit="handleSubmit"
            >
            <div class="form-group">
                <label for="name">
                    نام متغیر
                </label>
                <Field v-model="form.fields.name" name="name" id="name" class="form-control" />
                <ErrorMessage name="name" />
                <span v-if="form.errors?.name">
                    {{ form.errors?.name[0] }}
                </span>
            </div>
            <div class="form-group">
                <label for="key">
                    کلید متغیر
                </label>
                <Field @keypress="checkVariableName" v-model="form.fields.key" name="key" id="key" class="form-control" />
                <ErrorMessage name="key" />
                <span v-if="form.errors?.key">
                    {{ form.errors?.key[0] }}
                </span>
            </div>
            <div class="form-group">
                <label for="type">
                    نوع متغیر
                </label>
                <Field as="select" v-model="form.fields.type" name="type" id="type" class="form-select">
                    <option value="0">تابعی</option>
                    <option value="1">کوئری دیتابیسی</option>
                </Field>
                <ErrorMessage name="type" />
                <span v-if="form.errors?.type">
                    {{ form.errors?.type[0] }}
                </span>
            </div>
            <div class="form-group" v-show="form.fields.type == 1">
                <label for="query">
                    کوئری
                </label>
                <CodeEditor 
                    dir="ltr"
                    :languages="editor.languages"
                    theme="atom-one-dark"
                    width="100%"
                    font-size="14px"
                    height="409px"
                    padding="20px"
                    v-model="form.fields.query"
                    @keyup="getContent"
                ></CodeEditor>
                <Field hidden v-model="form.fields.query" name="query" id="query"/>
                <ErrorMessage name="query" />
            </div>
            
            <div class="form-group" v-show="form.fields.type == 0">
                <label for="body">
                    دیتا متغیر
                </label>
                <Field style="direction: ltr;" v-model="form.fields.body" name="body" id="body" class="form-control" />
                <ErrorMessage name="body" />
                <span v-if="form.errors?.body">
                    {{ form.errors?.body[0] }}
                </span>
            </div>
            <div class="form-group position-relative" v-if="form.fields.type == 0">
                <button type="button" v-if="!form.fields.params" @click="handleJsonAddition" class="btn btn-sm btn-primary json-btn">
                    + اضافه کردن JSON
                </button>

                <label for="params">
                    پارامتر های متغیر
                </label>
                <div class="py-2">
                    <Field as="textarea" style="direction: ltr;" v-model="form.fields.params" name="params" id="params" class="form-control" />
                    <ErrorMessage name="params" />
                </div>
            </div>
            <div class="form-group">
                <label for="information">
                    تعریف متغیر
                </label>
                <Field v-model="form.fields.information" name="information" id="information" class="form-control" />
                <ErrorMessage name="information" />
                <span v-if="form.errors?.information">
                    {{ form.errors?.information[0] }}
                </span>
            </div>

            
            <Button 
                title="ثبت"
                group="alpha"
                btn-class="btn btn-gray"
                class="my-3"
                type="submit"
            />
        </Form>

    </div>
</template>

<script>
import CodeEditor from "simple-code-editor";
import { ErrorMessage, Field, Form } from 'vee-validate';
import { defineComponent } from 'vue'
import { FormSchema } from './schema'
import Button from '@/components/Button.vue';
import { edit, getOne } from '@/services/variables.service';
import { messages } from '@/helpers/swal';
import { ToastMessage } from '@/helpers/enums';
import { checkVariableName } from '@/helpers/Base'
export default defineComponent({
    name: 'systematic-variables-edit-form',
    components: {
        Form,
        Field,
        ErrorMessage,
        Button,
        CodeEditor
    },
    data(){
        return{
            FormSchema,
            form: {
                fields: {
                    name: null,
                    key: null,
                    type: null,
                    query: "",
                    body: null,
                    params: null,
                    information: null
                },
                errors: null
            },
            editor:{
                languages: [['sql', 'Sql']],
                lineNums: true,
                wrap: true
            }
        }
    },
    methods:{
        async handleSubmit(values){
            const params = this.$route.params;
            const result = await edit(values, params.id).then(res => res)
            if(result.status == 200 || result.status == 201){
                messages(ToastMessage.Success)
                this.$router.push('/variables')
            }
            else{
                this.form.errors = result.data.errors
            }
        },
        getContent(event){
            this.form.fields.body = "$helper->sql_query("+event.target.value+")"
            this.form.fields.body = this.form.fields.body.replaceAll(event.target.value, "\""+event.target.value+"\"")
        },
        handleJsonAddition(){
            this.form.fields.params = '[{"id": "", "value": null, "nickname": "", "information": ""}]'
        },
        checkVariableName
    },
    async mounted(){
        const params = this.$route.params;
        const result = await getOne(params.id).then(res => res);
        
        this.form.fields.name = result.data.row.name;
        this.form.fields.key = result.data.row.key;
        this.form.fields.type = result.data.row.type;
        this.form.fields.query = result.data.row.query;
        this.form.fields.body = result.data.row.body;
        this.form.fields.params = result.data.row.params;
        this.form.fields.information = result.data.row.information;

    }
})
</script>

<style lang="scss" scoped>
    .systematic-variables-edit-form{
        width: 100%;
        .form-group{
            margin: 5px 0;
            direction: rtl;

            textarea{
                resize: none;
                height: 350px;
            }

            label{
                margin: 2px 0;
            }
            span{
                color: #DF1C44;
                font-size: 13px ;
            }
        }

        .json-btn{
            position: absolute;
            left: 0;
        }
    }
</style>