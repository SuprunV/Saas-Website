<template>
    <a-layout>
        <AppSideMenu v-model:collapsed="collapsed" v-if="isAuth" />
        <a-layout>
            <AppNavbar v-model:collapsed="collapsed" />
            <a-layout-content
                :style="{
                    margin: '24px 16px',
                    padding: '24px',
                    // background: '#fff',
                    minHeight: '280px',
                }"
            >
                <router-view />
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AppSideMenu from './components/AppSideMenu.vue';
import AppNavbar from './components/AppNavbar.vue';
import { mapState } from 'vuex';

export default defineComponent({
    setup() {
        return {
            collapsed: ref<boolean>(false),
        };
    },
    computed: {
        ...mapState({
            isAuth: (state: any) => state.isAuth,
        }),
    },
    components: {
        AppSideMenu,
        AppNavbar,
    },
});
</script>

<style>
.trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}

.trigger:hover {
    color: #1890ff;
}

.logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
}

.site-layout .site-layout-background {
    background: #fff;
}
</style>
