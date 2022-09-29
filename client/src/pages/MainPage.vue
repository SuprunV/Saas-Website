<script lang="ts">
import {
    UsergroupAddOutlined,
    IdcardOutlined,
    AuditOutlined,
} from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
import gsap from 'gsap';
export default defineComponent({
    components: { UsergroupAddOutlined, IdcardOutlined, AuditOutlined },
    data: () => ({
        clientCount: 0,
        companyCount: 0,
        masterCount: 0,
    }),
    mounted() {
        setTimeout(() => {
            this.clientCount = 1000;
        }, 500);
        setTimeout(() => {
            this.companyCount = 20;
        }, 1000);
        setTimeout(() => {
            this.masterCount = 100;
        }, 1500);
    },
});
</script>

<template>
    <div style="background-color: #ececec; padding: 20px">
        <h2 class="text-center mt-3 mb-3">Welcome to Beauty Manager!</h2>
        <a-row :gutter="16">
            <a-col :span="8">
                <a-card
                    :bordered="false"
                    type="flex"
                    align="center"
                    justify="center"
                >
                    <audit-outlined class="large-icon text-center" />
                    <h2 class="text-center mt-3">Companies</h2>
                    <h3 class="main-numbers mt-3">
                        <span
                            v-if="companyCount"
                            v-countAnimation="{
                                duration: 1,
                                timeout: 1,
                                to: companyCount,
                            }"
                            >0</span
                        >
                        <span v-else>0</span>+
                    </h3>
                </a-card>
            </a-col>
            <a-col :span="8">
                <a-card
                    :bordered="false"
                    type="flex"
                    align="center"
                    justify="center"
                >
                    <usergroup-add-outlined class="large-icon text-center" />
                    <h2 class="text-center mt-3">Clients</h2>
                    <h3 class="main-numbers mt-3">
                        <span
                            v-if="clientCount"
                            v-countAnimation="{
                                duration: 1,
                                timeout: 1,
                                to: clientCount,
                            }"
                            >0</span
                        >
                        <span v-else>0</span>+
                    </h3>
                </a-card>
            </a-col>
            <a-col :span="8">
                <a-card
                    :bordered="false"
                    type="flex"
                    align="center"
                    justify="center"
                >
                    <idcard-outlined class="large-icon text-center" />
                    <h2 class="text-center mt-3">Masters</h2>
                    <h3 class="main-numbers mt-3">
                        <span
                            v-if="masterCount"
                            v-countAnimation="{
                                duration: 1,
                                timeout: 1,
                                to: masterCount,
                            }"
                            >0</span
                        >
                        <span v-else>0</span>+
                    </h3>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<style scoped></style>
