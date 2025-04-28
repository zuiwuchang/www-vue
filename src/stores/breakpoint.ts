import { ref, computed, shallowRef } from 'vue'
import { defineStore } from 'pinia'

import { equal, once, saveValue } from '@/internal/utils'

/**
 * 定義屏幕尺寸
 */
export enum Breakpoint {
    /**
     * < 576px 的屏幕，不知道是什麼，電子手錶?
     */
    mini,
    /**
     * [576px, 768px) 的小屏幕，通常是手機屏幕
     */
    sm,
    /**
     * [768px, 992px) 的中等屏幕，通常是大屏手機或平板
     */
    md,
    /**
     * [992px, 1200px) 的大屏幕，通常是筆記本或桌面機
     */
    lg,
    /**
     * >= 1200px 的超大屏幕，通常是桌面機或電視
     */
    xl,
}


/**
 * 這個 store 用於窗口查詢結果以便與爲不同窗口實現響應式佈局
 */
export const useBreakpointStore = defineStore('breakpoint', () => {
    const matchs = [
        window.matchMedia(`(min-width: 576px)`),
        window.matchMedia(`(min-width: 768px)`),
        window.matchMedia(`(min-width: 992px)`),
        window.matchMedia(`(min-width: 1200px)`),
    ]
    const breakpoint = ref(calculate(matchs[0].matches, matchs[1].matches, matchs[2].matches, matchs[3].matches))
    const handler = (_: MediaQueryListEvent) => {
        breakpoint.value = calculate(matchs[0].matches, matchs[1].matches, matchs[2].matches, matchs[3].matches)
    }

    const miniOnly = computed(() => breakpoint.value == Breakpoint.mini)
    const smOnly = computed(() => breakpoint.value == Breakpoint.sm)
    const mdOnly = computed(() => breakpoint.value == Breakpoint.md)
    const lgOnly = computed(() => breakpoint.value == Breakpoint.lg)
    const xlOnly = computed(() => breakpoint.value == Breakpoint.xl)
    const sm = computed(() => breakpoint.value >= Breakpoint.sm)
    const md = computed(() => breakpoint.value >= Breakpoint.md)
    const lg = computed(() => breakpoint.value >= Breakpoint.lg)
    const xl = computed(() => breakpoint.value >= Breakpoint.xl)

    let counter = 0
    function start() {
        if (counter == 0) {
            for (const match of matchs!) {
                match.addEventListener("change", handler)
            }
        }
        counter++

        return once(() => {
            counter--
            if (counter === 0) {
                for (const match of matchs!) {
                    match.removeEventListener("change", handler)
                }
            }
        })
    }
    return {
        /**
         * 當前屏幕尺寸
         */
        breakpoint,

        /**
         * block sm:hidden
         * - v-if="$breakpoint.miniOnly.value" 只在 < 576px 的屏幕上渲染，可能是電子手錶
         */
        miniOnly,
        /**
         * hidden sm:block md:hidden
         * - v-if="$breakpoint.smOnly.value" 只在 [576px, 768px) 的小屏幕上渲染，通常是手機屏幕
         */
        smOnly,
        /**
         * hidden md:block lg:hidden
         * - v-if="$breakpoint.mdOnly.value" 只在 [768px, 992px) 的中等屏幕渲染，通常是大屏手機或平板
         */
        mdOnly,
        /**
         * hidden lg:block xl:hidden
         * - v-if="$breakpoint.lgOnly.value" 只在 [992px, 1200px) 的大屏幕渲染，通常是筆記本或桌面機
         */
        lgOnly,
        /**
         * hidden xl:block
         * - v-if="$breakpoint.xlOnly.value" 只在 >= 1200px 的超大屏幕渲染，通常是桌面機或電視
         */
        xlOnly,
        /**
         * hidden sm:block
         * - v-if="$breakpoint.sm.value" 在屏幕尺寸 >= 576px 時渲染
         * - v-if="!$breakpoint.sm.value" 在屏幕尺寸 < 576px 時渲染
         */
        sm,
        /**
         * hidden md:block
         * - v-if="$breakpoint.md.value" 在屏幕尺寸 >= 768px 時渲染
         * - v-if="!$breakpoint.md.value" 在屏幕尺寸 < 768px 時渲染
         */
        md,
        /**
         * hidden lg:block
         * - v-if="$breakpoint.lg.value" 在屏幕尺寸 >= 992px 時渲染
         * - v-if="!$breakpoint.lg.value" 在屏幕尺寸 < 992px 時渲染
         */
        lg,
        /**
         * hidden xl:block
         * - v-if="$breakpoint.xl.value" 在屏幕尺寸 >= 1200px 時渲染
         * - v-if="!$breakpoint.xl.value" 在屏幕尺寸 < 1200px 時渲染
         */
        xl,

        /**
         * 開始監聽屏幕尺寸變化
         */
        start,
    }
})

/**
 * 計算屏幕尺寸屬於哪個級別
 */
function calculate(sm: boolean, md: boolean, lg: boolean, xl: boolean): Breakpoint {
    if (xl) {
        return Breakpoint.xl
    }
    if (lg) {
        return Breakpoint.lg
    }
    if (md) {
        return Breakpoint.md
    }
    if (sm) {
        return Breakpoint.sm
    }
    return Breakpoint.mini
}