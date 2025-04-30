<script setup lang="ts">

import {
    BackupTableFilled,
} from '@vicons/material'

import {
    NButton,
    NDropdown,

} from 'naive-ui';
import { renderLabel } from '@/internal/render/label'
import Box from './Box.vue'

const menus = [
    {
        key: 'table',
        label: renderLabel({
            prefix: Box,
            label: 'table',
            url: '/example/table',
            suffix: BackupTableFilled,
        }),
    },
]

const props = defineProps<{
    placement?: any
}>()
</script>
<template>
    <n-dropdown trigger="hover" :placement="props.placement" :show-arrow="true" :options="menus">
        <!-- <n-dropdown :show="true" :placement="props.placement" :show-arrow="true" :options="menus"> -->
        <n-button :text="true">
            Dev
        </n-button>
    </n-dropdown>
</template>