<template>
    <div class="systematic-variables-create-form">
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
                <Field v-model="form.fields.key" name="key" id="key" class="form-control" />
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
            <div class="form-group" v-if="form.fields.type == 0">
                <label for="params">
                    پارامتر های متغیر
                </label>

                <Field as="textarea" style="direction: ltr;" v-model="form.fields.params" name="params" id="params" class="form-control" />
                <ErrorMessage name="params" />
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
// import hljs from 'highlight.js';
import CodeEditor from "simple-code-editor";
import { ErrorMessage, Field, Form } from 'vee-validate';
import { defineComponent } from 'vue'
import { FormSchema } from './schema'
import Button from '@/components/Button.vue';
import { store } from '@/services/variables.service';
import { messages } from '@/helpers/swal';
import { ToastMessage } from '@/helpers/enums';
export default defineComponent({
    name: 'systematic-variables-create-form',
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
                    query: "console.log(9)",
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
            const result = await store(values).then(res => res)
            if(result.status == 200 || result.status == 201){
                messages(ToastMessage.Success)
                this.$router.push('/variables')
            }
            else{
                this.form.errors = result.data.errors
                messages(ToastMessage.ServerError)
            }
        },
        getContent(event){
            this.form.fields.body = "$helper->sql_query("+event.target.value+")"
        }
    }
})
</script>

<style lang="scss" scoped>
    .systematic-variables-create-form{
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
    }
</style>