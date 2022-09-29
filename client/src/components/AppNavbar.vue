<script lang="ts">
import '@/styles/navbar.scss';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

export default defineComponent({
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
        collapseSideBar() {
            this.$emit('update:collapsed', !this.collapsed);
        },
    },
    components: { MenuUnfoldOutlined, MenuFoldOutlined },
});
</script>

<template>
    <a-layout-header style="background: #fff; padding: 0">
        <div class="" v-if="isAuth">
            <menu-unfold-outlined
                v-if="collapsed"
                class="trigger"
                @click="collapseSideBar"
            />
            <menu-fold-outlined
                v-else
                class="trigger"
                @click="collapseSideBar"
            />
        </div>
    </a-layout-header>
</template>
