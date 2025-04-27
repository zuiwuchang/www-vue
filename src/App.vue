<script setup lang="ts">
import { watchEffect } from 'vue'
import Navbar from './components/Navbar.vue'
import { RouterView } from 'vue-router'
import {
  NConfigProvider, NGlobalStyle,
  NButton,
} from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { useLocale } from './plugins/locale'

import ThemeMenu from './components/ThemeMenu.vue'
import LangMenu from './components/LangMenu.vue'

const i18n = useI18n()
const locale = useLocale()
watchEffect(() => {
  i18n.locale.value = locale.locale.id
})
</script>

<template>
  <n-config-provider inline-theme-disabled :theme="$theme.theme" :locale="$locale.locale.message"
    :date-locale="$locale.locale.date">
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
          <LangMenu />
        </template>

        <!-- right-menu 在桌面系統顯示到 導航欄右側，手機顯示到導航欄 摺疊部分 -->
        <template v-slot:right-menu>

          <RouterLink to="/about">
            <n-button :text="$breakpoint.md.value">
              {{ $t('main.about') }}
            </n-button>
          </RouterLink>
        </template>
        <!-- right-brand 無論手機還是桌面都會顯示到 導航欄右側 -->
        <template v-slot:right-brand>
          <LangMenu />
          <ThemeMenu />
        </template>
      </Navbar>
    </header>

    <main class="flex justify-content-center mt-2">
      <div class="container ">
        <RouterView />
      </div>
    </main>

    <footer class="flex justify-content-center mt-2">
      <div class="container ">
        this is footer
      </div>
    </footer>
  </n-config-provider>
</template>
