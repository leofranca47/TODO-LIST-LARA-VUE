import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import { URL_API_TODO } from './configs/api'
import router from './router'

axios.defaults.baseURL = URL_API_TODO

createApp(App).use(router).mount('#app')
