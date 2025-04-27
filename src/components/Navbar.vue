<script setup lang="ts">
import { ref } from 'vue'
import {
    MenuOutlined,
    MenuOpenOutlined,
} from '@vicons/material'

import {
    NEl,
    NButton, NIcon,
} from 'naive-ui'

const open = ref(false)
</script>

<template>
    <n-el>
        <!-- 爲桌面系統佈局導航 -->
        <div class="navbar flex justify-content-center align-items-center" v-if="$breakpoint.md.value">
            <div class="container flex">
                <div class="flex flex-grow-1 gap-2">
                    <slot name="brand"></slot>
                    <slot name="menu"></slot>
                </div>

                <div class="flex flex-grow-0 gap-2">
                    <slot name="right-menu"></slot>
                    <slot name="right-brand"></slot>
                </div>
            </div>
        </div>
        <!-- 爲手機佈局導航 -->
        <div class="navbar flex flex-column gap-2" v-else>
            <div class="flex flex-row align-items-center container">
                <div class="flex flex-grow-1 gap-2">
                    <slot name="brand"></slot>
                </div>
                <div class="flex flex-grow-0 gap-2">
                    <slot name="right-brand"></slot>
                    <div class="flex pr-5">
                        <n-button :text="true" @click="open = !open">
                            <template #icon>
                                <n-icon v-if="open">
                                    <MenuOpenOutlined />
                                </n-icon>
                                <n-icon v-if="!open">
                                    <MenuOutlined />
                                </n-icon>
                            </template>
                        </n-button>
                    </div>
                </div>
            </div>
            <div class="flex flex-column gap-2 container" v-if="open">
                <slot name="menu"></slot>
                <slot name="right-menu"></slot>
            </div>
        </div>
    </n-el>
</template>


<style scoped>
.navbar {
    padding: 0.75rem 0;
    background-color: var(--card-color);
    box-shadow: var(--box-shadow-1);
}
</style>