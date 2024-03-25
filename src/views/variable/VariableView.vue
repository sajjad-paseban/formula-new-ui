<template>
    <div class="row my-2">
        <div class="col">
            <div class="alert alert-primary d-flex justify-content-between flex-row-reverse align-items-center" role="alert">
                <span class="alert-title">
                    مدیریت متغیر های سیستمی
                </span>
                <Button 
                    group="alpha"
                    btn-class="btn btn-secondary"
                    is-link="true"
                    title="ایجاد"
                    path="/tool/variable/create"
                />
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col">
            <Card title="لیست متغیر های سیستمی">
                <VariablesListDatagrid />
            </Card>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from '@/components/Button.vue';
import VariablesListDatagrid from '@/datagrids/VariablesListDatagrid.vue';
import Card from '@/components/Card.vue';
export default defineComponent({
    name: 'variable-view',
    components: {
    Button,
    VariablesListDatagrid,
    Card
}
})
</script>


<style lang="scss" scoped>
    .alert-title{
        font-family: 'KOODAKBOLD';
        font-size: 18px;
    }
</style>