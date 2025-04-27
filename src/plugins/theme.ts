import { darkTheme, lightTheme, useOsTheme } from 'naive-ui'

import { computed, ref, getCurrentInstance } from 'vue'
import type { App, Ref } from 'vue'
const Key = 'theme'
/**
 * 這個主題插件用於 切換頁面使用的主題
 */
export class ThemeInstance {
    constructor() {
        let s: string | null
        try {
            s = localStorage.getItem(Key)
            console.info('load theme:', s)
            switch (s) {
                case 'dark':
                case 'light':
                case 'auto':
                    break
                default:
                    s = 'auto'
            }
        } catch (e) {
            console.warn('load theme fail:', e)
            s = 'auto'
        }
        this.name_ = ref(s)
    }
    private readonly os_ = useOsTheme()
    /**
     * 返回當前系統主題名稱
     */
    get os() {
        return this.os_.value
    }
    private readonly name_: Ref<string>
    /**
     * 返回當前使用的 主題名稱
     */
    get name() {
        return this.name_.value
    }
    /**
     * 修改主題
     */
    set name(v: string) {
        switch (v) {
            case 'dark':
            case 'light':
                break
            default:
                v = 'auto'
                break
        }
        if (v == this.name_.value) {
            return
        }
        this.name_.value = v
        try {
            if (v === 'auto') {
                localStorage.removeItem(Key)
            } else {
                localStorage.setItem(Key, v)
            }
            console.info(`save theme to ${v}`)
        } catch (e) {
            console.warn(`save theme to ${v} fail`, e)
        }
    }
    private readonly theme_ = computed(() => {
        switch (this.name_.value) {
            case 'dark':
                return darkTheme
            case 'light':
                return lightTheme
        }
        return this.os_.value == 'dark' ? darkTheme : lightTheme
    })
    /**
     * 返回當前應該使用的主題
     */
    get theme() {
        return this.theme_.value
    }
}
/**
 * 創建插件
 */
export function createTheme() {
    return {
        install: (app: App) => {
            app.config.globalProperties.$theme = new ThemeInstance()
        }
    }
}
/**
 * 返回插件
 */
export function useTheme() {
    const instance = getCurrentInstance()
    return instance?.proxy?.$theme!
}
declare module 'vue' {
    interface ComponentCustomProperties {
        $theme: ThemeInstance
    }
}