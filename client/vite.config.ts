import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), WindiCSS()],
    resolve: {
        alias: { '@': path.resolve(__dirname, 'src') },
    },
    css: {
        preprocessorOptions: {
            less: {
                modifyVars: {
                    'primary-color': '#1890ff', // primary color for all components
                    'link-color': '#1890ff', // link color
                    'success-color': '#52c41a', // success state color
                    'warning-color': '#faad14', // warning state color
                    'error-color': '#f5222d', // error state color
                    'font-size-base': '16px', // major text font size
                    'heading-color': '#fff', // heading text color
                    'text-color': '#fff', // major text color
                    'text-color-secondary': 'rgba(0, 0, 0, 0.45)', // secondary text color
                    'disabled-color': 'rgba(0, 0, 0, 0.25)', // disable state color
                    'border-radius-base': '10px', // major border radius
                    'border-color-base': '#91bdff', // major border color
                    'box-shadow-base': '0 2px 8px #ffee0152', // major shadow for layers
                },
                javascriptEnabled: true,
            },
        },
    },
});
