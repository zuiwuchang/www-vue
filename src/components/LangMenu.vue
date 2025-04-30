<script setup lang="ts">
import { h } from 'vue';

import {
    CircleOutlined, CheckCircleOutlined,
    TranslateOutlined,
} from '@vicons/material'
import {
    NButton,
    NDropdown,
    NIcon,
} from 'naive-ui';
import type {
    DropdownOption, DropdownRenderOption, DropdownDividerOption,
} from 'naive-ui';
import { useLocaleStore, Locales } from '@/stores/locale'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const locale = useLocaleStore()

function iconRender(id: string) {
    return () => h(NIcon, null, {
        default: () => h(
            locale.choose === id ? CheckCircleOutlined : CircleOutlined
        )
    })
}
function labelRender(key: string) {
    return () => h('div', null, i18n.t(key))
}
const menus: Array<DropdownOption | DropdownRenderOption | DropdownDividerOption> =
    Locales.map((v) => {
        return {
            key: v.id,
            label: v.name,
            icon: iconRender(v.id),
        }
    });
menus.push(
    {
        key: 'divider',
        type: 'divider',
    },
    {
        key: 'auto',
        label: labelRender('lang.auto'),
        icon: iconRender('auto'),
    }
)
function handleSelect(key: string,
    // options: DropdownOption | DropdownRenderOption | DropdownDividerOption
) {
    locale.choose = key
}
const props = defineProps<{
    placement?: any
}>()
</script>
<template>
    <n-dropdown trigger="hover" :placement="props.placement" :show-arrow="true" :options="menus" @select="handleSelect">
        <!-- <n-dropdown :show="true" :placement="props.placement" :show-arrow="true" :options="menus" @select="handleSelect"> -->
        <n-button :text="true">
            <template #icon>
                <n-icon>
                    <TranslateOutlined />
                </n-icon>
            </template>
        </n-button>
    </n-dropdown>
</template>