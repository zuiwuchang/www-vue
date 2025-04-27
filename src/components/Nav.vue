<script setup lang="ts">

import {
    RouterLink,
} from 'vue-router'

import {
    NEl, NButton,
} from 'naive-ui';

import ThemeMenu from './ThemeMenu.vue'
import LangMenu from './LangMenu.vue'

</script>

<template>
    <n-el>
        <div class="flex justify-content-center sticky top-0 z-5 align-items-center">
            <div class="container flex">
                <div class="flex flex-grow-1  gap-2">
                    <div>
                        <RouterLink to="/">
                            <n-button :text="true">{{ $t('main.home') }}</n-button>
                        </RouterLink>
                    </div>
                    <div>2</div>
                </div>

                <div class="flex flex-grow-0  gap-2">
                    <RouterLink to="/about">
                        <n-button :text="true">{{ $t('main.about') }}</n-button>
                    </RouterLink>
                    <LangMenu />
                    <ThemeMenu />
                </div>
            </div>
        </div>
    </n-el>
</template>


<style scoped>
.sticky {
    padding: 0.75rem 0;
    background-color: var(--card-color);
    box-shadow: var(--box-shadow-1);
}
</style>