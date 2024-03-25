<template>
    <div class="output-partial">
        <card
        title="خروجی"
        
        >
            <div class="content">

                <card
                    title="نتیجه"
                >
                    <div class="empty" v-if="!result">
                        در حال حاضر نتیجه ای بدست نیامده است
                    </div>
                    {{ result }}
                </card>

                <card
                    title="قطعه کد تولید شده"
                >         
                    <div class="empty" v-if="!code">
                        در حال حاضر قطعه کدی تولید نشده است
                    </div>   
                    {{ code }}
                </card>
                
            </div>
        </card>

    </div>
</template>

<script lang="ts">
    import Card from "@/components/Card.vue";
    import { defineComponent } from "vue";

    export default defineComponent({
        name: 'output-partial',
        props: ['code', 'result'],
        components: { Card },
    })
</script>

<style lang="scss" scoped>
    .output-partial{
        margin: 10px;        
        direction: ltr;
        .empty{
            text-align: center;
            font-size: 12px;
            color: rgba($color: #000000, $alpha: 0.6);
        }
        .content{
            display: flex;
            flex-direction: row-reverse;
            div{
                margin: 0 5px;
            }
        }
    }
</style>