import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import 'virtual:svg-icons-register'
import GlobalComponents from './plugins/global-components'
import '@/styles/index.scss'
import pinia from './stores'
import './permission.ts'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(GlobalComponents)

app.mount('#app')
