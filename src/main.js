import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'
import '@/assets/styles/icon.css'
import Antd from 'ant-design-vue'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
// day cho việt nam
dayjs.locale('vi')
const app = createApp(App)

app.use(router)
// thư viện antd
app.use(Antd)
app.mount('#app')
