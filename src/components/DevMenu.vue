<script setup lang="ts">
import { h } from 'vue';
import type { Component } from 'vue';

import { RouterLink } from 'vue-router';

import {
    BackupTableFilled,
} from '@vicons/material'

import {
    NButton,
    NDropdown,
    NIcon,
} from 'naive-ui';
import { renderLabel } from '@/internal/render/label'

function labelRender(key: string, url: string, suffix?: Component) {
    return () => h(RouterLink,
        {
            to: url,
            class: "flex flex-row align-items-center align-content-center justify-content-between gap-2",
        },
        () => [
            h('div', null, key),
            suffix ? h(NIcon, null, {
                default: () => h(suffix)
            }) : h('div')
        ])
}
const menus = [
    {
        key: 'table',
        label: renderLabel({
            prefix: BackupTableFilled,
            label: 'table',
            url: '/example/table',
            suffix: BackupTableFilled,
        }),
    },
    {
        key: 'ok',
        label: renderLabel({
            prefix: BackupTableFilled,
            label: 'ok',
            suffix: BackupTableFilled,
        }),
    },
    {
        key: 'baidu',
        label: renderLabel({
            prefix: BackupTableFilled,
            label: 'baidu',
            url: 'https://www.baidu.com',
            suffix: BackupTableFilled,
        }),
    },
]

const props = defineProps<{
    placement?: any
}>()
</script>
<template>
    <n-dropdown :show="true" :placement="props.placement" :show-arrow="true" :options="menus">
        <n-button :text="true">
            Dev
        </n-button>
    </n-dropdown>
</template>