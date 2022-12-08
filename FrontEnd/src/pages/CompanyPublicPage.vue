<script lang="ts">
import { UserAPI } from '@/api/UserAPI';
import { CompanyAPI } from '@/api/CompanyAPI';
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
import { IUser, RolesEnum } from '@/models/IUser';
import { message } from 'ant-design-vue';

export default defineComponent({
    components: { ShoppingOutlined, IdcardOutlined, TeamOutlined, ScheduleOutlined, LikeOutlined },
    setup: () => {
        const route = useRoute();
        const initLoading = ref(true);
        const loading = ref(false);
        const servicesCount = ref<number>();
        const mastersCount = ref<number>();
        const clientsCount = ref<number>();
        const doneAppointmentsCount = ref<number>();
        const limit = ref<number>(5);
        const page = ref<number>(1);
        const masterData = ref<IUser[]>([]);
        const masterList = ref<IUser[]>([]);
        const companyStore = useCompanyStore();

        const companyAlias = route.params['companyAlias'] as string;
        const {
            fetchData: getCompanyInfo,
            response: selectedCompany,
        } = useFetching(async () => {
            return await CompanyAPI.getCompanyWithAlias(companyAlias);
        });
        getCompanyInfo()

        const {
            fetchData: getCompanyMasters,
            response: companyMasters
        } = useFetching(async () => {
            const masters = await CompanyAPI.getCompanyMastersByAlias(companyAlias);
            masterList.value = masters;
            return masters;
        });
        getCompanyMasters();

        initLoading.value = false;
        //masterData.value = masters;
        
        companyStore.setCompanyPage(companyAlias);

        const {
            fetchData: getInfo,
            response: count,
            isLoading,
            message,
        } = useFetching(async () => {
            const countS = await CompanyAPI.getCompanyServicesCount(companyAlias);
            servicesCount.value = countS;

            const countM = await CompanyAPI.getCompanyMastersCount(companyAlias);
            mastersCount.value = countM;

            const countC = await CompanyAPI.getCompanyClientsCount(companyAlias);
            clientsCount.value = countC;

            const countA = await CompanyAPI.getCompanyDoneAppointmentsCount(companyAlias);
            doneAppointmentsCount.value = countA;

            return countS;
        });
        getInfo();
        
        // const onLoadMore = async () => {
        //     page.value++;
        //     loading.value = true;
        //     masterList.value = masterData.value.concat(
        //         [...new Array(limit.value)].map(() => ({
        //             loading: true,
        //             img: '',
        //             name: '',
        //             alias: '',
        //         })) as any,
        //     );
        //     const newMasters = await UserAPI.getPublicUsers(
        //         limit.value,
        //         page.value,
        //         RolesEnum.MASTER
        //     );
        //     const newData = masterData.value.concat(newMasters);

        //     loading.value = false;
        //     masterData.value = newData;
        //     masterList.value = newData;
        //     nextTick(() => {
        //         window.dispatchEvent(new Event('resize'));
        //     });
        // };

        return { 
            removeCompanyPage: companyStore.removeCompanyPage,
            loading,
            initLoading,
            masterList,
            //onLoadMore,
            selectedCompany,
            getCompanyInfo,
            getInfo,
            getCompanyMasters,
            companyAlias,
            isLoading,
            message,
            servicesCount,
            mastersCount,
            clientsCount,
            doneAppointmentsCount
        };
    },
});
</script>

<template>
    <div v-appearAnimation="{ timeout: 100 }">
        <response-alert :message="message" :isLoading="isLoading" />
        <div v-if="(!isLoading)">
            <a-row>
                <div class="companyMain-image" v-appearAnimation="{ timeout: 100 }">
                    <img :src="selectedCompany.img" alt="avatar" />
                </div>
                <a-col>
                    <h1 class="text-align:left mt-5" v-appearAnimation="{ timeout: 100 }">
                        {{ selectedCompany.companyName }}
                    </h1>
                    <h5 class="header5">
                        <em>{{ selectedCompany.address }}</em>
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
                        v-appearAnimation="{ timeout: 250 }"
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
                            v-if="servicesCount"
                            v-countAnimation="{
                                duration: 1,
                                timeout: 1,
                                to: servicesCount,
                            }"
                            >0</span
                        >
                        <span v-else>0</span>
                        </h3>
                    </a-card>
                </a-col>
                <a-col :span="6">
                    <a-card
                        v-appearAnimation="{ timeout: 250 }"
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
                                    to: mastersCount,
                                }"
                                >0</span>
                        </h3>
                    </a-card>
                </a-col>
                <a-col :span="6">
                    <a-card
                        v-appearAnimation="{ timeout: 250 }"
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
                                    to: clientsCount,
                                }"
                                >0</span>
                        </h3>
                    </a-card>
                </a-col>
                <a-col :span="6">
                    <a-card
                        v-appearAnimation="{ timeout: 250 }"
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
                                    to: doneAppointmentsCount,
                                }"
                                >0</span>
                        </h3>
                    </a-card>
                </a-col>
            </a-row>
            <h2 class="text-center mt-3 mb-3">Our masters</h2>
            <a-list
                item-layout="horizontal"
                :data-source="masterList"
            >   
            <!-- <template #loadMore>
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
            </template>  -->
            <template #renderItem="{ item }">
                <a-list-item class="antList">
                    <!-- <a-skeleton
                        avatar
                        :title="false"
                        active
                    > -->
                        <a-list-item-meta >
                            <template #title>
                                <a>{{ item.name }} {{ item.surname }}</a>
                            </template>
                            <template #avatar>
                                <a-avatar :src="item.img" />
                            </template>
                        </a-list-item-meta>
                    <!-- </a-skeleton> -->
                </a-list-item>
            </template> 
        </a-list>
        </div>
    </div>
</template>

<style scoped></style>
