import type { Ref, App } from 'vue'
import { ref, computed } from 'vue'
/**
 * 當前屏幕尺寸
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
 * 計算當前屏幕尺寸屬於哪個級別
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
export interface BreakpointInstanceOptions {
    sm: number
    md: number
    lg: number
    xl: number
}
export class BreakpointInstance {
    private matchs?: Array<MediaQueryList> = []
    private handler?: (evt: MediaQueryListEvent) => void
    constructor(opts?: BreakpointInstanceOptions) {
        if (opts) {
            if (typeof opts.sm !== 'number' ||
                !Number.isSafeInteger(opts.sm) ||
                opts.sm < 128) {
                throw new Error('opts.sm invalid')
            }
            if (typeof opts.md !== 'number' ||
                !Number.isSafeInteger(opts.md) ||
                opts.md <= opts.sm) {
                throw new Error('opts.md invalid')
            }
            if (typeof opts.lg !== 'number' ||
                !Number.isSafeInteger(opts.lg) ||
                opts.lg <= opts.md) {
                throw new Error('opts.lg invalid')
            }
            if (typeof opts.xl !== 'number' ||
                !Number.isSafeInteger(opts.xl) ||
                opts.xl <= opts.lg) {
                throw new Error('opts.xl invalid')
            }
        } else {
            opts = {
                sm: 576,
                md: 768,
                lg: 992,
                xl: 1200,
            }
        }
        const matchs = [
            window.matchMedia(`(min-width: ${opts.sm}px)`),
            window.matchMedia(`(min-width: ${opts.md}px)`),
            window.matchMedia(`(min-width: ${opts.lg}px)`),
            window.matchMedia(`(min-width: ${opts.xl}px)`),
        ]
        const handler = (_: MediaQueryListEvent) => {
            this.breakpoint.value = calculate(matchs[0].matches, matchs[1].matches, matchs[2].matches, matchs[3].matches)
        }
        this.breakpoint = ref(calculate(matchs[0].matches, matchs[1].matches, matchs[2].matches, matchs[3].matches))

        let i = 0
        for (; i < matchs.length; i++) {
            matchs[i].addEventListener("change", handler)
        }
        this.matchs = matchs
        this.handler = handler
    }
    destroy() {
        const handler = this.handler
        if (handler) {
            this.handler = undefined
            const matchs = this.matchs!
            this.matchs = undefined
            for (const match of matchs!) {
                match.removeEventListener("change", handler)
            }
        }
    }
    readonly breakpoint: Ref<Breakpoint>

    /**
     * block sm:hidden
     * - v-if="$breakpoint.miniOnly.value" 只在 < 576px 的屏幕上渲染，可能是電子手錶
     */
    readonly miniOnly = computed(() => this.breakpoint.value == Breakpoint.mini)
    /**
     * hidden sm:block md:hidden
     * - v-if="$breakpoint.smOnly.value" 只在 [576px, 768px) 的小屏幕上渲染，通常是手機屏幕
     */
    readonly smOnly = computed(() => this.breakpoint.value == Breakpoint.sm)
    /**
     * hidden md:block lg:hidden
     * - v-if="$breakpoint.mdOnly.value" 只在 [768px, 992px) 的中等屏幕渲染，通常是大屏手機或平板
     */
    readonly mdOnly = computed(() => this.breakpoint.value == Breakpoint.md)
    /**
     * hidden lg:block xl:hidden
     * - v-if="$breakpoint.lgOnly.value" 只在 [992px, 1200px) 的大屏幕渲染，通常是筆記本或桌面機
     */
    readonly lgOnly = computed(() => this.breakpoint.value == Breakpoint.lg)
    /**
     * hidden xl:block
     * - v-if="$breakpoint.xlOnly.value" 只在 >= 1200px 的超大屏幕渲染，通常是桌面機或電視
     */
    readonly xlOnly = computed(() => this.breakpoint.value == Breakpoint.xl)
    /**
     * hidden sm:block
     * - v-if="$breakpoint.sm.value" 在屏幕尺寸 >= 576px 時渲染
     * - v-if="!$breakpoint.sm.value" 在屏幕尺寸 < 576px 時渲染
     */
    readonly sm = computed(() => this.breakpoint.value >= Breakpoint.sm)
    /**
     * hidden md:block
     * - v-if="$breakpoint.md.value" 在屏幕尺寸 >= 768px 時渲染
     * - v-if="!$breakpoint.md.value" 在屏幕尺寸 < 768px 時渲染
     */
    readonly md = computed(() => this.breakpoint.value >= Breakpoint.md)
    /**
     * hidden lg:block
     * - v-if="$breakpoint.lg.value" 在屏幕尺寸 >= 992px 時渲染
     * - v-if="!$breakpoint.lg.value" 在屏幕尺寸 < 992px 時渲染
     */
    readonly lg = computed(() => this.breakpoint.value >= Breakpoint.lg)
    /**
     * hidden xl:block
     * - v-if="$breakpoint.xl.value" 在屏幕尺寸 >= 1200px 時渲染
     * - v-if="!$breakpoint.xl.value" 在屏幕尺寸 < 1200px 時渲染
     */
    readonly xl = computed(() => this.breakpoint.value >= Breakpoint.xl)
}

export function createBreakpoint(opts?: BreakpointInstanceOptions) {
    return {
        install: (app: App) => {
            app.config.globalProperties.$breakpoint = new BreakpointInstance(opts)
        }
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $breakpoint: BreakpointInstance
    }
}