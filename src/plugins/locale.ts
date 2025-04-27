import type { App, Ref, ShallowRef } from 'vue'
import { computed, ref, getCurrentInstance, shallowRef } from 'vue'
import {
    zhTW, dateZhTW,
    zhCN, dateZhCN,
    enUS, dateEnUS,
} from 'naive-ui'
import type { NDateLocale } from 'naive-ui'
export interface Locale {
    id: string
    name: string
    message: any
    date: NDateLocale
}
/**
 * 支持的語言列表
 */
export const Locales: Locale[] = [
    {
        id: 'en-us',
        name: '🇺🇸 English',
        message: enUS,
        date: dateEnUS,
    },
    {
        id: 'zh-tw',
        name: '🇹🇼 繁體中文',
        message: zhTW,
        date: dateZhTW,
    },
    {
        id: 'zh-cn',
        name: '🇨🇳 简体中文',
        message: zhCN,
        date: dateZhCN,
    },

]
const indexEN_US = 0
const indexZH_TW = 1
const indexZH_CN = 2

/**
 * 計算當前應該顯示的語言
 */
function calculate(id: string, languages: readonly string[]): Locale {
    if (id != 'auto') {
        for (const locale of Locales) {
            if (locale.id === id) {
                return locale
            }
        }
    }
    for (const lang of languages) {
        if (lang == 'zh') {
            return Locales[indexZH_TW]
        } else if (lang.startsWith('zh-')) {
            id = lang.substring(3).toLocaleLowerCase()
            if (id.indexOf('hans') != -1 || id.indexOf('cn') != -1) {
                return Locales[indexZH_CN]
            } else {
                return Locales[indexZH_TW]
            }
        }
    }
    return Locales[indexEN_US]
}
const Key = 'locale'
/**
 * 這個語言插件用於切換頁面顯示文本語言
 */
export class LocaleInstance {
    constructor() {
        let id = 'auto'
        let s: string | null
        try {
            s = localStorage.getItem(Key)
            console.info('load locale:', s)
            if (s !== null) {
                for (const locale of Locales) {
                    if (locale.id == s) {
                        id = locale.id
                        break
                    }
                }
            }
        } catch (e) {
            console.warn('load locale fail:', e)
        }
        this.id_ = ref(id)

        this.languages_ = shallowRef(navigator.languages)

        // window.addEventListener('languagechange', (c) => {
        //     console.log('--------', c, navigator.languages)
        // })
        // console.log('------------', navigator.languages)
    }
    private languages_: ShallowRef<readonly string[]>
    private readonly id_: Ref<string>
    /**
     * 返回當前使用的 語言 id
     */
    get id() {
        return this.id_.value
    }
    /**
     * 修改語言
     */
    set id(id: string) {
        let v = 'auto'
        if (id !== 'auto') {
            for (const locale of Locales) {
                if (locale.id !== id) {
                    v = id
                    break
                }
            }
        }

        if (v === this.id_.value) {
            return
        }
        this.id_.value = v
        try {
            if (v == 'auto') {
                localStorage.removeItem(Key)
            } else {
                localStorage.setItem(Key, v)
            }
            console.info(`save locale to ${v}`)
        } catch (e) {
            console.warn(`save locale to ${v} fail`, e)
        }
    }
    private readonly locale_ = computed(() => {
        return calculate(this.id_.value, this.languages_.value)
    })
    /**
     * 返回當前應該使用的語言環境
     */
    get locale() {
        return this.locale_.value
    }
}

/**
 * 創建插件
 */
export function createLocale() {
    return {
        install: (app: App) => {
            app.config.globalProperties.$locale = new LocaleInstance()
        }
    }
}
/**
 * 返回插件
 */
export function useLocale() {
    const instance = getCurrentInstance()
    return instance?.proxy?.$locale!
}
declare module 'vue' {
    interface ComponentCustomProperties {
        $locale: LocaleInstance
    }
}