<template>
    <nav class="navbar navbar-expand-lg border-bottom shadow-sm bg-body-tertiary">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">
                فرمول ساز
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                        <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            ابزار
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <router-link class="dropdown-item" to="/variables">
                                    متغیر های سیستمی
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link active" to="/">
                            کد های درآمدی
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'navbar-partial'
})
</script>

<style lang="scss" scoped>
    .navbar-brand{
        font-family: 'ghasem';
    }
    .navbar-nav{
        font-family: 'vazir';
    }
</style>