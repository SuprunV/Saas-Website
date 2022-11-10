<script lang="ts">
import { useAuthStore } from '@/store/useAuth';
import { IconsEnum } from '@/types/Theme';
import { UserOutlined } from '@ant-design/icons-vue';
import { storeToRefs } from 'pinia';

import { defineComponent, ref } from 'vue';
export default defineComponent({
    setup: () => {
        const authStore = useAuthStore();
        const { authUser, menuRoutes } = storeToRefs(authStore);

        return { authUser, menuRoutes };
    },
    data: () => ({
        selectedKeys: ['2'],
        IconsEnum,
    }),
    props: {
        collapsed: {
            type: Boolean,
            required: true,
        },
    },
    components: { UserOutlined },
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
            <a-menu-item v-for="route in menuRoutes" :key="route.path">
                <icon-by-name v-if="route.icon" :icon="route.icon" />

                <span class="app-side-menu-item">
                    <router-link :to="`${route.path}`">
                        {{ route.label }}
                    </router-link>
                </span>
            </a-menu-item>
        </a-menu>
    </a-layout-sider>
</template>

<style scoped>
#components-layout-demo-custom-trigger .trigger {
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}

.app-side-menu-item a {
    color: rgba(255, 255, 255, 0.65) !important;
}

#components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
}

.site-layout .site-layout-background {
    background: #fff;
}
</style>
