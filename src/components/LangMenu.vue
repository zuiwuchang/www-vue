<script setup lang="ts">
import { h } from 'vue';
import type { Component } from 'vue';

import {
    CircleOutlined, CheckCircleOutlined,
    TranslateOutlined,
} from '@vicons/material'
import {
    NButton,
    NDropdown,
    NIcon,
} from 'naive-ui';
import type { DropdownOption, DropdownRenderOption, DropdownDividerOption } from 'naive-ui';

import { useLocale, Locales } from '../plugins/locale'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const locale = useLocale()
interface RenderItemOptions {
    label: string
    suffix?: Component
    key: string
    onClick: () => void
    translate?: boolean
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
            default: () => {
                const children = [
                    h(NIcon, { style: { marginRight: '8px' } }, {
                        default: () => h(
                            locale.id == opts.key ? CheckCircleOutlined : CircleOutlined
                        )
                    }),
                    h('span', { style: { flex: 1, textAlign: 'left' } }, opts.translate ? i18n.t(opts.label) : opts.label),
                ]
                if (opts.suffix) {
                    children.push(
                        h(NIcon, { style: { marginLeft: '8px' } }, { default: () => h(opts.suffix!) })
                    )
                }
                return h('div', { style: { display: 'flex', alignItems: 'center', width: '100%' } }, children)
            },
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
const menus: Array<DropdownOption | DropdownRenderOption | DropdownDividerOption> =
    Locales.map((v) => {
        return createItem({
            label: v.name,
            key: v.id,
            onClick: () => {
                locale.id = v.id
            },
        })
    });
menus.push(
    {
        type: 'divider',
        key: 'divider',
    },
    createItem({
        translate: true,
        label: 'lang.auto',
        key: 'auto',
        onClick: () => {
            locale.id = 'auto'
        },
    }),
)


</script>
<template>
    <n-dropdown trigger="hover" :show-arrow="true" placement="bottom-end" :options="menus">
        <n-button :text="true">
            <template #icon>
                <n-icon>
                    <TranslateOutlined />
                </n-icon>
            </template>
        </n-button>
    </n-dropdown>
</template>