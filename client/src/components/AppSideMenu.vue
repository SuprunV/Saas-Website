<script lang="ts">
import { useAuthStore } from '@/store/useAuth';
import { IconsEnum } from '@/types/Theme';

import { storeToRefs } from 'pinia';

import { defineComponent, ref } from 'vue';
import { mapState } from 'vuex';
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
                <!-- <div v-if="route.icon">
                    <icon-by-name :icon="route.icon" />
                </div> -->
                <router-link :to="`${route.path}`">{{
                    route.label
                }}</router-link>
            </a-menu-item>
        </a-menu>
    </a-layout-sider>
</template>

<style scoped></style>
