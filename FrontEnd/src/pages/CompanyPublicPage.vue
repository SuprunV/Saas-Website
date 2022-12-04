<script lang="ts">
import { UserAPI } from '@/api/UserAPI';
import { useFetching } from '@/hooks/useFetching';
import { AppRoutes } from '@/router/router';
import { ResponseTypeEnum } from '@/types/FetchResponse';
import { defineComponent, ref, onMounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// import '@/styles/companyPage.scss';
import { useCompanyStore } from '@/store/useCompany';
import { storeToRefs } from 'pinia';
import {
    ShoppingOutlined,
    IdcardOutlined,
    TeamOutlined,
    ScheduleOutlined,
    LikeOutlined
} from '@ant-design/icons-vue';
import { IMaster } from '@/models/IMaster';
import { IUserToken, RolesEnum } from '@/models/IUser';

export default defineComponent({
    components: { ShoppingOutlined, IdcardOutlined, TeamOutlined, ScheduleOutlined, LikeOutlined },
    setup: () => {
        const initLoading = ref(true);
        const loading = ref(false);
        const limit = ref<number>(5);
        const page = ref<number>(1);
        const data = ref<IUserToken[]>([]);
        const masterList = ref<IUserToken[]>([]);
        const companyStore = useCompanyStore();
        const { company } = storeToRefs(companyStore);
        const route = useRoute();
        companyStore.setCompanyPage();

        onMounted(async () => {
            const masters = await UserAPI.getPublicUsers(
                limit.value,
                page.value,
                RolesEnum.MASTER
            );
            initLoading.value = false;
            data.value = masters;
            masterList.value = masters;
        });
        const onLoadMore = async () => {
            page.value++;
            loading.value = true;
            masterList.value = data.value.concat(
                [...new Array(limit.value)].map(() => ({
                    loading: true,
                    img: '',
                    name: '',
                    alias: '',
                })) as any,
            );
            const newMasters = await UserAPI.getPublicUsers(
                limit.value,
                page.value,
                RolesEnum.MASTER
            );
            const newData = data.value.concat(newMasters);

            loading.value = false;
            data.value = newData;
            masterList.value = newData;
            nextTick(() => {
                window.dispatchEvent(new Event('resize'));
            });
        };

        return { 
            company, 
            removeCompanyPage: companyStore.removeCompanyPage,
            loading,
            initLoading,
            masterList,
            onLoadMore
        };
    },
});
</script>

<template>
    <div v-appearAnimation="{ timeout: 100 }">
        <div v-if="company.id">
            <a-row>
                <div class="companyMain-image" v-appearAnimation="{ timeout: 200 }">
                    <img :src="company.img" alt="avatar" />
                </div>
                <a-col>
                    <h1 class="text-align:left mt-5" v-appearAnimation="{ timeout: 300 }">
                        {{ company.companyName }}
                    </h1>
                    <h5 class="header5">
                        <em>Company address</em>
                    </h5>
                    <a-statistic title="" :value="1000" style="margin-right: 50px">
                        <template #suffix>
                            <like-outlined />
                        </template>
                    </a-statistic>
                </a-col>
            </a-row>
            <a-row :gutter="16" type="flex" justify="space-between">
                <a-col :span="6">
                    <a-card
                        v-appearAnimation="{ timeout: 100 }"
                        class="company-card"
                        :bordered="false"
                        type="flex"
                        align="center"
                        justify="center"
                    >
                        <shopping-outlined class="large-icon text-center" />
                        <h2 class="text-center mt-3">Services</h2>
                        <h3 class="main-numbers mt-3">
                            <span
                                v-countAnimation="{
                                    duration: 1,
                                    timeout: 1,
                                    to: 100,
                                }"
                                >0</span>
                        </h3>
                    </a-card>
                </a-col>
                <a-col :span="6">
                    <a-card
                        v-appearAnimation="{ timeout: 100 }"
                        class="company-card"
                        :bordered="false"
                        type="flex"
                        align="center"
                        justify="center"
                    >
                        <idcard-outlined class="large-icon text-center" />
                        <h2 class="text-center mt-3">Masters</h2>
                        <h3 class="main-numbers mt-3">
                            <span
                                v-countAnimation="{
                                    duration: 1,
                                    timeout: 1,
                                    to: 50,
                                }"
                                >0</span>
                        </h3>
                    </a-card>
                </a-col>
                <a-col :span="6">
                    <a-card
                        v-appearAnimation="{ timeout: 100 }"
                        class="company-card"
                        :bordered="false"
                        type="flex"
                        align="center"
                        justify="center"
                    >
                        <team-outlined class="large-icon text-center" />
                        <h2 class="text-center mt-3">Clients</h2>
                        <h3 class="main-numbers mt-3">
                            <span
                                v-countAnimation="{
                                    duration: 1,
                                    timeout: 1,
                                    to: 300,
                                }"
                                >0</span>
                        </h3>
                    </a-card>
                </a-col>
                <a-col :span="6">
                    <a-card
                        v-appearAnimation="{ timeout: 100 }"
                        class="company-card"
                        :bordered="false"
                        type="flex"
                        align="center"
                        justify="center"
                    >
                        <schedule-outlined class="large-icon text-center" />
                        <h2 class="text-center mt-3">Done work</h2>
                        <h3 class="main-numbers mt-3">
                            <span
                                v-countAnimation="{
                                    duration: 1,
                                    timeout: 1,
                                    to: 500,
                                }"
                                >0</span>
                        </h3>
                    </a-card>
                </a-col>
            </a-row>
            <h2 class="text-center mt-3 mb-3">Our masters</h2>
            <a-list
            :loading="initLoading"
            item-layout="horizontal"
            :data-source="masterList"
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
                        >load more</a-button
                    >
                </div>
            </template>
            <template #renderItem="{ item }">
                <a-list-item class="antList">
                    <a-skeleton
                        avatar
                        :title="false"
                        :loading="!!item.loading"
                        active
                    >
                        <a-list-item-meta 
                            description="Master services: manicure, pedicure, lashes extension" 
                        >
                            <template #title>
                                <a>{{ item.name }}</a>
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
    </div>
</template>

<style scoped></style>
