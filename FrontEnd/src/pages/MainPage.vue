<script lang="ts">
import {
    UsergroupAddOutlined,
    IdcardOutlined,
    AuditOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, ref, onMounted, nextTick } from 'vue';
import { CompanyAPI } from '@/api/CompanyAPI';
import { ICompany } from '@/models/ICompany';
import { useCompanyStore } from '@/store/useCompany';
import ARow from 'ant-design-vue/lib/grid/Row';
import { UserAPI } from '@/api/UserAPI';

export default defineComponent({
    components: { UsergroupAddOutlined, IdcardOutlined, AuditOutlined },
    data: () => ({
        companies: [] as ICompany[],
    }),
    mounted() {},

    setup() {
        const initLoading = ref(true);
        const loading = ref(false);
        const limit = ref<number>(5);
        const page = ref<number>(1);
        const data = ref<ICompany[]>([]);
        const companyCount = ref<number>(0);
        const clientCount = ref<number>(0);
        const masterCount = ref<number>(0);
        const companyList = ref<ICompany[]>([]);

        const companyStore = useCompanyStore();
        companyStore.removeCompanyPage();

        onMounted(async () => {
            const companies = await CompanyAPI.getPublicCompanies(
                limit.value,
                page.value,
            );
            initLoading.value = false;
            data.value = companies;
            companyList.value = companies;
        });

        async function getCounts() {
            const companies = await CompanyAPI.getCompaniesCount();
            const clients = await UserAPI.getClientsCount();
            const masters = await UserAPI.getMastersCount();

            // console.log('companies count', companies);
            // console.log('clients count', clients);
            // console.log('masters count', masters);

            companyCount.value = companies;
            clientCount.value = clients;
            masterCount.value = masters;
        }
        getCounts();

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
            const new_companies = await CompanyAPI.getPublicCompanies(
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
            getCount: getCounts,
            companyCount,
            clientCount,
            masterCount,
        };
    },
});
</script>

<template>
    <div v-appearAnimation="{ timeout: 100 }">
        <h1 class="text-center mt-3 mb-3" v-appearAnimation="{ timeout: 100 }">
            Welcome to Beauty Manager!
        </h1>
        <a-row :gutter="16" type="flex" justify="space-between">
            <a-col :span="7">
                <a-card
                    v-appearAnimation="{ timeout: 100 }"
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
                    v-appearAnimation="{ timeout: 250 }"
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
                    v-appearAnimation="{ timeout: 400 }"
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
        <h2 class="text-center mt-3 mb-3">List of companies</h2>
        <p class="text-center mt-3 mb-3"></p>
        <a-list
            :loading="initLoading"
            item-layout="horizontal"
            :data-source="companyList"
        >
            <template #renderItem="{ item }">
                <a-list-item>
                    <template #actions>
                        <a-button
                            type="primary"
                            @click="$router.push(`/${item.companyAlias}`)"
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
                                <a :href="`${item.companyAlias}`">{{
                                    item.companyName
                                }}</a>
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
