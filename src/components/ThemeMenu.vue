<script setup lang="ts">
import { h } from 'vue';
import {
    DarkModeOutlined, LightModeOutlined,
    CircleOutlined, CheckCircleOutlined,
} from '@vicons/material'
import { DarkTheme20Filled } from '@vicons/fluent'
import {
    NButton,
    NDropdown,
    NIcon,
} from 'naive-ui';
import type { DropdownOption, DropdownRenderOption, DropdownDividerOption } from 'naive-ui';
import type { Component } from 'vue';
import { useThemeStore } from '@/stores/theme'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
const theme = useThemeStore()
interface RenderItemOptions {
    label: string
    suffix: Component
    key: string
    onClick: () => void
}
function renderItem(opts: RenderItemOptions) {
    return h('div', {
        style: {
            padding: '0 6px 0 6px',
        }
    }, [h(
        NButton,
        {
            quaternary: true,
            style: {
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 12px',
                height: '32px',
                fontSize: '14px',
            },
            onClick: opts.onClick,
        },
        {
            default: () =>
                h('div', { style: { display: 'flex', alignItems: 'center', width: '100%' } }, [
                    h(NIcon, { style: { marginRight: '8px' } }, {
                        default: () => h(
                            theme.choose == opts.key ? CheckCircleOutlined : CircleOutlined
                        )
                    }),
                    h('span', { style: { flex: 1, textAlign: 'left' } }, i18n.t(opts.label)),
                    h(NIcon, { style: { marginLeft: '8px' } }, { default: () => h(opts.suffix) }),
                ]),
        }
    )]);
}
function createItem(opts: RenderItemOptions) {
    return {
        type: 'render',
        key: opts.key,
        render: () => {
            return renderItem(opts)
        }
    }
}
const menus: Array<DropdownOption | DropdownRenderOption | DropdownDividerOption> = [
    createItem({
        label: 'theme.dark',
        suffix: DarkModeOutlined,
        key: 'dark',
        onClick: () => {
            theme.choose = 'dark'
        }
    }),
    createItem({
        label: 'theme.light',
        suffix: LightModeOutlined,
        key: 'light',
        onClick: () => {
            theme.choose = 'light'
        }
    }),
    {
        type: 'divider',
        key: 'divider',
    },
    createItem({
        label: 'theme.auto',
        suffix: DarkTheme20Filled,
        key: 'auto',
        onClick: () => {
            theme.choose = 'auto'
        }
    }),
]

</script>
<template>
    <n-dropdown trigger="hover" :show-arrow="true" placement="bottom-end" :options="menus">
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