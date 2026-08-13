import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueLazyLoad from 'vue3-lazyload'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import './style.css'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.use(VueLazyLoad, {
  loading: 'https://picsum.photos/seed/lazy-loading/40/40',
  error: 'https://picsum.photos/seed/lazy-error/40/40',
})

app.mount('#app')
