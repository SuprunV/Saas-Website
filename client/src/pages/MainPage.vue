<script lang="ts">
import {
    UsergroupAddOutlined,
    IdcardOutlined,
    AuditOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, ref, onMounted, nextTick } from 'vue';
import { companyAPI } from '@/api/companyAPI';
import { ICompany } from '@/models/ICompany';
import { useCompanyStore } from '@/store/useCompany';

export default defineComponent({
    components: { UsergroupAddOutlined, IdcardOutlined, AuditOutlined },
    data: () => ({
        clientCount: 0,
        companyCount: 0,
        masterCount: 0,
        companies: [] as ICompany[],
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
    setup() {
        const initLoading = ref(true);
        const loading = ref(false);
        const limit = ref<number>(5);
        const page = ref<number>(1);
        const data = ref<ICompany[]>([]);
        const companyList = ref<ICompany[]>([]);

        const companyStore = useCompanyStore();
        companyStore.removeCompanyPage();

        onMounted(async () => {
            const companies = await companyAPI.getPublicCompanies(
                limit.value,
                page.value,
            );
            initLoading.value = false;
            data.value = companies;
            companyList.value = companies;
        });

        const onLoadMore = async () => {
            page.value++;
            loading.value = true;
            companyList.value = data.value.concat(
                [...new Array(limit.value)].map(() => ({
                    loading: true,
                    img: '',
                    name: '',
                    alias: '',
                })) as any,
            );
            const new_companies = await companyAPI.getPublicCompanies(
                limit.value,
                page.value,
            );
            const newData = data.value.concat(new_companies);

            loading.value = false;
            data.value = newData;
            companyList.value = newData;
            nextTick(() => {
                window.dispatchEvent(new Event('resize'));
            });
        };

        return {
            loading,
            initLoading,
            data,
            companyList,
            onLoadMore,
        };
    },
});
</script>

<template>
    <div>
        <h1 class="text-center mt-3 mb-3">Welcome to Beauty Manager!</h1>
        <a-row :gutter="16" type="flex" justify="space-between">
            <a-col :span="7">
                <a-card
                    class="main-cart"
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
            <a-col :span="7">
                <a-card
                    class="main-cart"
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
            <a-col :span="7">
                <a-card
                    class="main-cart"
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
        <h2 class="text-center mt-3 mb-3">List of some companies</h2>
        <p class="text-center mt-3 mb-3">
            <em>here is companies, that want to be shown</em>
        </p>
        <a-list
            :loading="initLoading"
            item-layout="horizontal"
            :data-source="companyList"
        >
            <template #loadMore>
                <div
                    v-if="!initLoading && !loading"
                    :style="{
                        textAlign: 'center',
                        marginTop: '12px',
                        height: '32px',
                        lineHeight: '32px',
                    }"
                >
                    <a-button type="secondary" @click="onLoadMore"
                        >loading more</a-button
                    >
                </div>
            </template>
            <template #renderItem="{ item }">
                <a-list-item>
                    <template #actions>
                        <a-button
                            type="primary"
                            @click="$router.push(item.alias)"
                            >Visit</a-button
                        >
                    </template>
                    <a-skeleton
                        avatar
                        :title="false"
                        :loading="!!item.loading"
                        active
                    >
                        <a-list-item-meta>
                            <template #title>
                                <a :href="`${item.alias}`">{{ item.name }}</a>
                            </template>
                            <template #avatar>
                                <a-avatar :src="item.img" />
                            </template>
                        </a-list-item-meta>
                    </a-skeleton>
                </a-list-item>
            </template>
        </a-list>
    </div>
</template>

<style scoped></style>
