<script setup lang="ts">

import {
    BackupTableFilled,
} from '@vicons/material'

import {
    NButton,
    NDropdown,

} from 'naive-ui';
import { renderLabel } from '@/internal/render/label'


const menus = [
    {
        key: 'table',
        label: renderLabel({
            label: 'table',
            url: '/example/table',
            prefix: BackupTableFilled,
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