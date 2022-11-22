<template>
    <div :key="uniqAppKey">
        <transition name="fadeIn">
            <!-- <page-loading v-show="isTotalLoading" :isLoadingPage="false" /> -->
            <a-layout v-show="!isTotalLoading" class="whole-height">
                <AppSideMenu v-model:collapsed="collapsed" v-if="isAuth" />
                <a-layout class="whole-height">
                    <AppNavbar v-model:collapsed="collapsed" />
                    <a-layout-content
                        :style="{
                            margin: '24px 16px',
                            padding: '24px',
                            minHeight: '280px',
                        }"
                    >
                        <router-view />
                    </a-layout-content>
                </a-layout>
            </a-layout>
        </transition>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AppSideMenu from './components/AppSideMenu.vue';
import AppNavbar from './components/AppNavbar.vue';
import { useAuthStore } from './store/useAuth';
import { storeToRefs } from 'pinia';
import { useCompanyStore } from './store/useCompany';
import { useThemeStore } from './store/useTheme';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
    data: () => ({
        uniqAppKey: 0,
    }),
    setup() {
        const auth = useAuthStore();
        const { isAuth, authUser } = storeToRefs(auth);
        const companyStore = useCompanyStore();
        const { isTotalLoading } = useThemeStore();

        auth.checkLoginStore();

        return {
            collapsed: ref<boolean>(false),
            isAuth,
            companyStore,
            isTotalLoading,
            auth,
            authUser,
        };
    },
    watch: {
        isAuth() {
            const companyAlias = this.authUser.companyAlias
                ? this.authUser.companyAlias
                : (this.$route.params['companyAlias'] as string);

            this.auth.checkLoginStore().then(() => {
                this.auth.setRoutes(companyAlias).then(() => {
                    this.auth.hasAccess(this.$route.path, this.$router);
                });
            });

            this.$forceUpdate();
            this.uniqAppKey++;
        },
        $route(to, from) {
            const companyAlias = this.authUser.companyAlias
                ? this.authUser.companyAlias
                : to.params['companyAlias'];

            this.auth.checkLoginStore().then(() => {
                this.auth.setRoutes(companyAlias).then(() => {
                    this.auth.hasAccess(to.path, this.$router);
                });
            });

            this.$forceUpdate();
            this.uniqAppKey++;
        },
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
