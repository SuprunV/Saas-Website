<script lang="ts">
// import '@/styles/navbar.scss';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import { UserOutlined } from '@ant-design/icons-vue';
import { useAuthStore } from '@/store/useAuth';
import { useCompanyStore } from '@/store/useCompany';
import { storeToRefs } from 'pinia';
import { AppRoutes } from '@/router/router';
import { UserAPI } from '@/api/UserAPI';

export default defineComponent({
    data: () => ({
        AppRoutes,
    }),
    props: {
        collapsed: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        selectedKeys() {
            return [this.$route.fullPath];
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
            this.logoutActionStore  ();
        },
    },
    components: { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined },
});
</script>

<template>
    <a-layout-header style="padding: 0">
        <a-row>
            <a-col v-if="!isAuth" :span="3">
                <div class="logo">
                    <router-link :to="AppRoutes.MAIN">BM</router-link>
                </div></a-col
            >
            <a-col v-if="isAuth" :span="1">
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
            <a-col :span="13">
                <a-menu
                    v-model:selectedKeys="selectedKeys"
                    mode="horizontal"
                    v-if="!company.id"
                >
                    <a-menu-item :key="`/`"
                        ><router-link :to="`/`">
                            Main Page
                        </router-link></a-menu-item
                    >
                </a-menu>
                <a-menu
                    v-else
                    v-model:selectedKeys="selectedKeys"
                    mode="horizontal"
                >
                    <a-menu-item :key="`/${company.alias}`"
                        ><router-link :to="`/${company.alias}`">{{
                            company.name
                        }}</router-link></a-menu-item
                    >
                    <a-menu-item
                        v-if="!isAuth"
                        :key="`/${company.alias}/services`"
                        ><router-link :to="`/${company.alias}/services`"
                            >Our Services</router-link
                        ></a-menu-item
                    >
                </a-menu>
            </a-col>
            <a-col :span="6">
                <a-row type="flex" justify="end" v-if="isAuth && authUser">
                    <a-col>
                        <a-button type="text">
                            <a-avatar src="https://joeschmoe.io/api/v1/random">
                            </a-avatar>
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button type="text" danger @click="logout"
                            >Log out</a-button
                        >
                    </a-col>
                </a-row>
                <a-col type="flex" justify="end" align="end" v-else>
                    <a-button
                        type="text"
                        class="btn-success"
                        @click="
                            $router.push(
                                company.id
                                    ? `/${company.alias}/auth`
                                    : AppRoutes.AUTH,
                            )
                        "
                    >
                        {{
                            company.id ? `Log in to ${company.name}` : `Log in`
                        }}
                    </a-button>
                </a-col>
            </a-col>
            <a-col :span="2"></a-col>
        </a-row>
    </a-layout-header>
</template>
