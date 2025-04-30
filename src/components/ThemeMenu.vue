<script setup lang="ts">
import { h } from 'vue'
import {
    DarkModeOutlined, LightModeOutlined,
    CircleOutlined, CheckCircleOutlined,
} from '@vicons/material'
import { DarkTheme20Filled } from '@vicons/fluent'
import {
    NButton,
    NDropdown,
    NIcon,
} from 'naive-ui'
import type { DropdownOption, DropdownRenderOption, DropdownDividerOption } from 'naive-ui'
import type { Component } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
const theme = useThemeStore()

function iconRender(id: string) {
    return () => h(NIcon, null, {
        default: () => h(
            theme.choose === id ? CheckCircleOutlined : CircleOutlined
        )
    })
}
function labelRender(key: string, suffix?: Component) {
    return () => h('div',
        {
            class: "flex flex-row align-items-center align-content-center justify-content-between gap-2",
        },
        [
            h('div',
                {
                    class: '',
                },
                i18n.t(key),
            ),
            suffix ? h(NIcon, null, {
                default: () => h(suffix)
            }) : h('div')
        ])
}
const menus: Array<DropdownOption | DropdownRenderOption | DropdownDividerOption> = [
    {
        key: 'dark',
        label: labelRender('theme.dark', DarkModeOutlined),
        icon: iconRender('dark'),
    },
    {
        key: 'light',
        label: labelRender('theme.light', LightModeOutlined),
        icon: iconRender('light'),
    },
    {
        key: 'divider',
        type: 'divider',
    },
    {
        key: 'auto',
        label: labelRender('theme.light', DarkTheme20Filled),
        icon: iconRender('auto'),
    },
]
function handleSelect(key: string,
    // options: DropdownOption | DropdownRenderOption | DropdownDividerOption
) {
    theme.choose = key
}
defineProps<{
    placement?: any
}>()
</script>
<template>
    <n-dropdown trigger="hover" :show-arrow="true" :placement="placement" :options="menus" @select="handleSelect">
        <!-- <n-dropdown :show="true" :show-arrow="true" :placement="placement" :options="menus" @select="handleSelect"> -->
        <n-button :text="true">
            <template #icon>
                <n-icon v-if="theme.name == 'dark'">
                    <DarkModeOutlined />
                </n-icon>
                <n-icon v-if="theme.name != 'dark'">
                    <LightModeOutlined />
                </n-icon>
            </template>
        </n-button>
    </n-dropdown>
</template>