<script lang="ts">
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons-vue';

import { defineComponent, ref } from 'vue';
import { mapState } from 'vuex';
export default defineComponent({
    data: () => ({
        selectedKeys: ['2'],
    }),
    props: {
        collapsed: {
            type: Boolean,
            required: true,
        },
    },
    components: {
        UserOutlined,
        VideoCameraOutlined,
        UploadOutlined,
    },
});
</script>

<template>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
        <div class="logo" />
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
            <a-menu-item key="1">
                <user-outlined />
                <span>Statistic</span>
            </a-menu-item>
            <a-menu-item key="2">
                <video-camera-outlined />
                <span>Your masters</span>
            </a-menu-item>
            <a-menu-item key="3">
                <upload-outlined />
                <span>Settings</span>
            </a-menu-item>
        </a-menu>
    </a-layout-sider>
</template>

<style scoped></style>
