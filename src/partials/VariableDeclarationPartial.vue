<template>
    <div class="variable-declaration-partial">
        <card
            title="متغیر جدید"
        >
            <variable-form />
        </card>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import VariableForm from '@/forms/Variable/VariableForm.vue';
    import Card from "@/components/Card.vue";
    
    export default defineComponent({
        components: {
            VariableForm,
            Card
        }
    })
</script>

<style lang="scss" scoped>
    .variable-declaration-partial{
        margin: 10px;
        span.empty-variables{
            display: block;
            text-align: center;
            font-size: 10px;
            color: rgba($color: #000000, $alpha: 0.5);
        }

    }
</style>