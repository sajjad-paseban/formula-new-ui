<template>
    <div class="variable-create-view">
        <div class="alert alert-primary d-flex justify-content-between flex-row-reverse align-items-center" role="alert">
            <span class="alert-title">
                مدیریت متغیر های سیستمی - ایجاد
            </span>
            <Button 
                group="alpha"
                btn-class="btn btn-secondary"
                is-link="true"
                title="برگشت"
                path="/variables"
            />
        </div>
        <card
            title="ایجاد متغیر"
        >
            <SystematicVariablesCreateForm />
        </card>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from '@/components/Button.vue';
import Card from '@/components/Card.vue';
import SystematicVariablesCreateForm from '@/forms/SystematicVariables/CreateForm.vue';

export default defineComponent({
    name: 'variable-create-view',
    components: {
        Button,
        Card,
        SystematicVariablesCreateForm
    }
})
</script>

<style lang="scss" scoped>
    .variable-create-view{
        width: 100%;
        padding: 10px;
        .alert-title{
            font-family: 'KOODAKBOLD';
            font-size: 18px;
        }

    }

</style>