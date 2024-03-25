<template>
    <div :class="group">
        <router-link :class="btnClass" v-if="isLink" :to="path ? path : ''">
            {{ title }}
            <span>
                <slot />
            </span>
        </router-link>
        <button :class="btnClass" :type="type" v-if="!isLink">
            {{ title }}
            <span>
                <slot />
            </span>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'button-component',
    props: ['group', 'btnClass', 'isLink', 'path', 'title', 'type']
})
</script>

<style lang="scss" scoped>
    button, a{
        margin: 0 !important;
        padding: 5px 14px !important;
        display: inline-flex !important;
        font-size: 12px !important;
        font-family: 'yekan' !important;
        
        span{
            position: relative;
            top: 3px;
            font-size: 12px;
            left: 3px;
        }
    }
</style>