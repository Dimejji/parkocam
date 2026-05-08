import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import router from './Router'

const app = createApp(App)

app.use(vuetify)
  .use(router)
app.mount('#app')