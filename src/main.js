import 'normalize.css'
import './assets/css/index.less'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './utils/i18n'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { messageDefaults } from 'element-plus'

messageDefaults.duration = 8000
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(i18n)
app.use(router)
app.use(store)



app.mount('#app')
