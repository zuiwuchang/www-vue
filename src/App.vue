<script setup lang="ts">
import { watchEffect } from 'vue'
import Nav from './components/Nav.vue'
import { RouterView } from 'vue-router'
import { NConfigProvider, NGlobalStyle } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { useLocale } from './plugins/locale'
import { ref } from 'vue'


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

    <header>
      <Nav />
    </header>

    <div class="flex justify-content-center mt-2">
      <div class="container ">
        <RouterView />
      </div>
    </div>

    <footer class="flex justify-content-center mt-2">
      <div class="container ">
        this is footer
      </div>
    </footer>
  </n-config-provider>
</template>
