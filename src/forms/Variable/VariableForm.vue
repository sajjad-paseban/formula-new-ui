<template>
    <Form
        :validation-schema="form.FormSchema"
        @submit="confirm"
    >
        <div class="form-group">
            <label for="name">
                نام متغیر
            </label>
            <Field @keypress="checkVariableName" class="form-control form-control-sm" autocomplete="off" name="name" id="name" v-model="form.params.name" />   
            <ErrorMessage name="name" />
        </div>
       <div class="form-group">
           <label for="type">
               نوع متغیر
           </label>
           <Field class="form-select form-select-sm" as="select" name="type" id="type" v-model="form.params.type">
                <option value="0">
                    مقدار ثابت
                </option>
                <option value="1">
                    مقدار سیستمی
                </option>
           </Field>
           <ErrorMessage name="type" />
       </div>
        <div class="form-group" v-if="form.params.type == 0">
            <label for="">
                مقدار متغیر
            </label>
            <Field class="form-control form-control-sm" autocomplete="off" v-model="form.params.value" name="value" id="value" />
            <ErrorMessage name="value" />
        </div>
        <div class="form-group" v-if="form.params.type == 1">
            <label for="">
                جست و جوی متغیر
            </label>
            <select class="form-select form-select-sm" v-model="form.params.value">
                <option v-for="(item, index) in variables" :key="index" :value="item">
                    {{ item.name }}
                </option>
            </select>
        </div>
        <Button 
            class="my-2"
            group="alpha"
            btn-class="btn btn-secondary"
            title="ثبت"
            type="submit"
        
        />
    </Form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getAll } from "@/services/variables.service";
import { useVariableStore } from "@/stores/variable";
import Button from "@/components/Button.vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { FormSchema } from "@/forms/Variable/schema";
import { checkVariableName } from "@/helpers/Base";
export default defineComponent({
    name: 'VariableForm',
    components: {
        Button,
        Form,
        Field,
        ErrorMessage
    },
    data(): any{
        return{
            form:{
                FormSchema,
                params:{
                    name: null,
                    type: null,
                    value: null
                }
            },
            variables: null,
        }
    },
    methods: {
        confirm(values: any, { resetForm }: any){
            useVariableStore().addVariable({
                name: this.form.params.name,
                type: this.form.params.type,
                value: this.form.params.value
            })

            resetForm()

        },
        checkVariableName
    },
    async mounted(){
        this.variables = (await getAll().then(res => res)).data
    }
})

</script>

<style lang="scss" scoped>
    form{
        span{
            color: #DF1C44;
            font-size: 13px ;
        }
        input, select{
            display: block;
            width: 100%;
            margin: 5px 0;
        }
        button{
            font-family: 'vazir';
            font-size: 9px;
            padding: 5px 8px;
            margin: 6px 0;
        }
    }
</style>