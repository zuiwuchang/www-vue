<script setup lang="ts">
import { onUnmounted, watchEffect, onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import { RouterView } from 'vue-router'
import {
  NConfigProvider, NGlobalStyle,
  NButton, NIcon,
} from 'naive-ui'
import { Github } from '@vicons/fa'
import { useI18n } from 'vue-i18n'

import { useThemeStore } from '@/stores/theme'
import { useLocaleStore } from '@/stores/locale'

import ThemeMenu from './components/ThemeMenu.vue'
import LangMenu from './components/LangMenu.vue'
const theme = useThemeStore()
const i18n = useI18n()
const locale = useLocaleStore()
watchEffect(() => {
  i18n.locale.value = locale.locale.id
})

let cleanup: (() => void) | undefined

onMounted(() => {
  cleanup = locale.start()
})
onUnmounted(() => {
  if (cleanup) {
    cleanup()
  }
})
</script>

<template>
  <n-config-provider inline-theme-disabled :theme="theme.theme" :locale="locale.locale.message"
    :date-locale="locale.locale.date">
    <n-global-style />

    <header class="sticky top-0 z-5">
      <Navbar>
        <!-- brand 無論手機還是桌面都會顯示到 導航欄左側 -->
        <template v-slot:brand>
          <RouterLink to="/">
            <n-button :text="true">{{ $t('main.home') }}</n-button>
          </RouterLink>
        </template>

        <!-- menu 在桌面系統顯示到 導航欄左側，手機顯示到導航欄 摺疊部分 -->
        <template v-slot:menu>
          <LangMenu :placement="$breakpoint.md.value ? 'left-end' : 'right-end'" />
        </template>

        <!-- right-menu 在桌面系統顯示到 導航欄右側，手機顯示到導航欄 摺疊部分 -->
        <template v-slot:right-menu>

          <RouterLink to="/about">
            <n-button :text="true">
              {{ $t('main.about') }}
            </n-button>
          </RouterLink>
        </template>
        <!-- right-brand 無論手機還是桌面都會顯示到 導航欄右側 -->
        <template v-slot:right-brand>
          <LangMenu placement="bottom-end" />
          <ThemeMenu />
        </template>
      </Navbar>
    </header>

    <main class="flex justify-content-center">
      <div class="container ">
        <RouterView />
      </div>
    </main>

    <footer :class="theme.name == 'dark' ? 'footer-dark' : 'footer-light'"
      class="flex justify-content-center flex-wrap">
      <div class="container ">
        <a href="https://github.com/zuiwuchang/www-vue" target="_blank">
          <n-button :text="true">
            <template #icon>
              <n-icon>
                <Github />
              </n-icon>
            </template>
            https://github.com/zuiwuchang/www-vue
          </n-button>
        </a>
      </div>
    </footer>
  </n-config-provider>
</template>
<style scoped>
.footer-dark {
  background-color: hsl(221, 14%, 11%);
  padding: 3rem 1.5rem 6rem;
}

.footer-light {
  background-color: hsl(221, 14%, 98%);
  padding: 3rem 1.5rem 6rem;
}
</style>