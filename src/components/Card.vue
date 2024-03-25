<script lang="js">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'card-component',
    props: {
        title: {
            type: String
        },
        width:{
            type: String,
            default: '100%'
        },
        headerBordering: {
            type: Boolean,
            default: true
        },
        buttons:{
            default: []
        }
    }
})
</script>

<template>
    <div className="x-card" :style="{width: width}">
        <div v-if="title" class="x-card-header" :class="{'without-border': headerBordering}">
            <div>
                <router-link class="button-8 mx-1" role="button" :to="value.link" v-for="(value, index) in buttons" @click="value.onClick" :key="index">
                    {{ value.title }}
                </router-link>
                <slot name="buttons" />
            </div>
            <div>
                <h5>
                    {{ title }}
                </h5>
            </div>
        </div>

        <div className="x-card-body">
            <slot />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .x-card{
        background-color: #fff;
        border: 1px solid #e6ecf5;
        margin: 2px 0;
        border-radius: 8px;
        overflow: hidden;
        font-family: vazir;
        box-shadow: 0px 4px 5px rgba($color: #000000, $alpha: 0.05);
        .x-card-header{
            border-bottom: 1px dotted #e6ecf5;
            padding: 10px 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #f5f5f5;
            direction: ltr;
            &.without-border{
                border-bottom: none;
            }
            h5{
                color: #3B566E;
                position: relative;
                top: 4px;
                right: 5px;
                font-size: 15px;
            }
        }
        .x-card-body{
            padding: 10px;
            // direction: rtl;
            overflow: hidden;
            overflow-x: auto;
            &::-webkit-scrollbar{
                height: 6px;
                background-color: #e6ecf5;
                border-radius: 5px;
            }
            &::-webkit-scrollbar-thumb{
                background-color: #bdbdbd;
                border-radius: 5px;
                
            }
        }
    }
</style>