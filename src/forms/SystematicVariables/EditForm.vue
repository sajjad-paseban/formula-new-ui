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
                <Field v-model="form.fields.key" name="key" id="key" class="form-control" />
                <ErrorMessage name="key" />
                <span v-if="form.errors?.key">
                    {{ form.errors?.key[0] }}
                </span>
            </div>
            <div class="form-group">
                <label for="body">
                    دیتا متغیر
                </label>
                <Field style="direction: ltr;" v-model="form.fields.body" name="body" id="body" class="form-control" />
                <ErrorMessage name="body" />
                <span v-if="form.errors?.body">
                    {{ form.errors?.body[0] }}
                </span>
            </div>
            <div class="form-group">
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

<script lang="ts">
import { ErrorMessage, Field, Form } from 'vee-validate';
import { defineComponent } from 'vue'
import { FormSchema } from './schema'
import Button from '@/components/Button.vue';
import { edit, getOne } from '@/services/variables.service';
import { messages } from '@/helpers/swal';
import { ToastMessage } from '@/helpers/enums';

export default defineComponent({
    name: 'systematic-variables-edit-form',
    components: {
        Form,
        Field,
        ErrorMessage,
        Button
    },
    data(){
        return{
            FormSchema,
            form: {
                fields: {
                    name: null,
                    key: null,
                    body: null,
                    params: null,
                    information: null
                },
                errors: null
            }
        }
    },
    methods:{
        async handleSubmit(values: any){
            const params = this.$route.params;
            const result = await edit(values, params.id).then(res => res)
            if(result.status == 200 || result.status == 201){
                messages(ToastMessage.Success)
                this.$router.push('/variables')
            }
            else{
                this.form.errors = result.data.errors
            }
        }
    },
    async mounted(){
        const params = this.$route.params;
        const result = await getOne(params.id).then(res => res);
        
        this.form.fields.name = result.data.row.name;
        this.form.fields.key = result.data.row.key;
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
    }
</style>