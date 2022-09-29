<script lang="ts">
import '@/styles/navbar.scss';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
import { mapActions, mapMutations, mapState } from 'vuex';

export default defineComponent({
    data: () => ({
        selectedKeys: ['1'],
    }),
    props: {
        collapsed: {
            type: Boolean,
            required: true,
        },
    },
    setup() {
        // console.log(this.$state);
    },
    computed: {
        ...mapState({
            isAuth: (state: any) => state.isAuth,
        }),
    },
    methods: {
        ...mapMutations({
            setIsAuth: 'setIsAuth',
        }),
        ...mapActions({
            logoutAction: 'logoutAction',
            loginAction: 'loginAction',
        }),
        collapseSideBar() {
            this.$emit('update:collapsed', !this.collapsed);
        },
    },
    components: { MenuUnfoldOutlined, MenuFoldOutlined },
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
                    <a-menu-item key="1">nav 1</a-menu-item>
                    <a-menu-item key="2">nav 2</a-menu-item>
                    <a-menu-item key="3">nav 3</a-menu-item>
                </a-menu>
            </a-col>
            <a-col :span="7">
                <a-row type="flex" justify="end" v-if="isAuth">
                    <a-col>
                        <a-button type="text">
                            <span class="btn-user">Leonid (Admin)</span>
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button type="text" danger @click="logoutAction"
                            >Logut</a-button
                        >
                    </a-col>
                </a-row>
                <a-col type="flex" justify="end" align="end" v-else>
                    <a-button
                        type="text"
                        class="btn-success"
                        @click="loginAction"
                    >
                        Log in
                    </a-button>
                </a-col>
            </a-col>
            <a-col :span="1"> </a-col>
        </a-row>
    </a-layout-header>
</template>
