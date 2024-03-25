import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


import 'bootstrap/dist/css/bootstrap.rtl.css'
import 'bootstrap/dist/js/bootstrap.js'
import '@/assets/scss/global.scss'

createApp(App)
.use(router)
.use(createPinia())
.use(VueSweetalert2)
.mount('#app')
