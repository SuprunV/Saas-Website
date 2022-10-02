<script lang="ts">
import '@/styles/navbar.scss';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import { UserOutlined } from '@ant-design/icons-vue';
import { useAuthStore } from '@/store/useAuth';
import { useCompanyStore } from '@/store/useCompany';
import { storeToRefs } from 'pinia';
import { AppRoutes } from '@/router/router';
import UserAPI from '@/api/UserAPI';

export default defineComponent({
    data: () => ({
        selectedKeys: [window.location.pathname],
        AppRoutes,
    }),
    props: {
        collapsed: {
            type: Boolean,
            required: true,
        },
    },
    setup() {
        const auth = useAuthStore();
        const { loginActionStore, logoutActionStore } = auth;
        const { isAuth, authUser } = storeToRefs(auth);

        const { company } = storeToRefs(useCompanyStore());

        return {
            isAuth,
            authUser,
            loginActionStore,
            logoutActionStore,
            company,
        };
    },
    methods: {
        collapseSideBar() {
            this.$emit('update:collapsed', !this.collapsed);
        },
        logout() {
            UserAPI.logout(this.authUser);
            this.logoutActionStore();
        },
    },
    components: { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined },
});
</script>

<template>
    <a-layout-header style="background: #fff; padding: 0">
        <a-row>
            <a-col :span="1">
                <div v-if="isAuth">
                    <menu-unfold-outlined
                        v-if="collapsed"
                        class="trigger"
                        @click="collapseSideBar"
                    />
                    <menu-fold-outlined
                        v-else
                        class="trigger"
                        @click="collapseSideBar"
                    /></div
            ></a-col>
            <a-col :span="15">
                <a-menu v-model:selectedKeys="selectedKeys" mode="horizontal">
                    <a-menu-item :key="AppRoutes.MAIN"
                        ><router-link :to="AppRoutes.MAIN"
                            >Main</router-link
                        ></a-menu-item
                    >
                    <a-menu-item :key="AppRoutes.AUTH"
                        ><router-link :to="AppRoutes.AUTH"
                            >Authorization</router-link
                        ></a-menu-item
                    >
                </a-menu>
            </a-col>
            <a-col :span="7">
                <a-row type="flex" justify="end" v-if="isAuth">
                    <a-col>
                        <a-button type="text">
                            <span class="btn-user">Leonid (Admin)</span>
                        </a-button>
                        <a-avatar src="https://joeschmoe.io/api/v1/random">
                            <!-- <template #icon><UserOutlined /></template> -->
                        </a-avatar>
                    </a-col>
                    <a-col>
                        <a-button type="text" danger @click="logout"
                            >Logut</a-button
                        >
                    </a-col>
                </a-row>
                <a-col type="flex" justify="end" align="end" v-else>
                    <a-button
                        type="text"
                        class="btn-success"
                        @click="$router.push(AppRoutes.AUTH)"
                    >
                        {{
                            company.id ? `Log in to ${company.name}` : `Log in`
                        }}
                    </a-button>
                </a-col>
            </a-col>
            <a-col :span="1"></a-col>
        </a-row>
    </a-layout-header>
</template>
