import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { createI18n } from 'vue-i18n'
import zhTW from './locale/zhTW.json'
import zhCN from './locale/zhCN.json'
import enUS from './locale/enUS.json'

import { createBreakpoint } from './plugins/breakpoint'
import { createTheme } from './plugins/theme'
import { createLocale } from './plugins/locale'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(createBreakpoint())
app.use(createTheme())
app.use(createLocale())
app.use(createI18n({
    legacy: false,
    locale: 'en-us',
    messages: {
        'zh-tw': zhTW,
        'zh-cn': zhCN,
        'en-us': enUS,
    }
}))
app.use(router)

app.mount('#app')
