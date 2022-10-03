<script lang="ts">
import { useAuthStore } from '@/store/useAuth';
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons-vue';
import { storeToRefs } from 'pinia';

import { defineComponent, ref } from 'vue';
import { mapState } from 'vuex';
export default defineComponent({
    setup: () => {
        const authStore = useAuthStore();
        const { authUser } = storeToRefs(authStore);

        return { authUser };
    },
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
        <div
            v-if="collapsed"
            class="logo-sidebar d-flex justify-content-center align-items-center"
        >
            <a-avatar src="https://joeschmoe.io/api/v1/random"> </a-avatar>
        </div>
        <div v-else class="logo-sidebar">
            <a-avatar src="https://joeschmoe.io/api/v1/random"> </a-avatar>
            <p>
                {{ authUser.role }}
            </p>
            <p>
                {{ authUser.name }}
            </p>
        </div>
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
