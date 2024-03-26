<template>
    <div class="row my-2">
        <div class="col">
            <div class="alert alert-primary d-flex justify-content-between flex-row-reverse align-items-center" role="alert">
                <span class="alert-title">
                    مدیریت کدهای درآمدی
                </span>
                <Button 
                    group="alpha"
                    btn-class="btn btn-secondary"
                    is-link="true"
                    title="ایجاد"
                    path="/formula/generate"
                />
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <Card title="لیست کدهای درآمدی">
                <EarningListDatagrid />
            </Card>
        </div>
    </div>
</template>

<script lang="ts">
import Button from '@/components/Button.vue';
import Card from '@/components/Card.vue';
import EarningListDatagrid from '@/datagrids/EarningListDatagrid.vue';
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'home-view',
    components: { Button, Card, EarningListDatagrid }
})
</script>

<style lang="scss" scoped>
    .alert-title{
        font-family: 'KOODAKBOLD';
        font-size: 18px;
    }
</style>