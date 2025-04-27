import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss';

export default {
    plugins: [
        process.env.NODE_ENV === 'production' ? purgeCSSPlugin({
            content: [
                './index.html', // 掃描 HTML 檔案
                './public/**/*.html',
                './src/**/*.{vue,js,ts,jsx,tsx}', // 掃描 Vue、JS、TS 等檔案
            ],
            // 可選：定義安全的 CSS 選擇器，避免被移除
            safelist: [
                'html',
                'body',
                /^v-/,
                /^data-v-/,
                /-(enter|leave)(-(active|to))?$/,
                // 如果使用 Element Plus 或其他 UI 庫
                /^el-/,
                // 動態類名（根據你的專案添加）
                'active',
                'disabled',
                'hidden',
            ],
        }) : null,
    ].filter(Boolean),
};