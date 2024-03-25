<template>
    <navbar-partial/>
    <div class="container-fluid">
        <router-view />
    </div>
</template>

<script lang="ts">
import NavbarPartial from '@/partials/NavbarPartial.vue';
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'default-layout',
    components: { NavbarPartial }
})
</script>

<style lang="scss" scoped>

</style>