import { createApp } from 'vue'
import  { createPinia}  from 'pinia'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/global.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus as any)
app.use(router as any)
app.use(createPinia() as any)
app.mount('#app')