<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useCompanyStore } from '@/store/useCompany';
import { storeToRefs } from 'pinia';
import { LikeOutlined } from '@ant-design/icons-vue';
import CompanySettingForm from '@/components/CompanySettingForm.vue';
import WeekdayForm from '@/components/WeekdayForm.vue';
import { useFetching } from '@/hooks/useFetching';
import { CompanyAPI } from '@/api/CompanyAPI';
import { useAuthStore } from '@/store/useAuth';
import { ICompany } from '@/models/ICompany';
import { ITimetable, Weekday } from '@/models/ITimetable';
import { makeEnum } from '@/services/makeEnum';
import { TimetableAPI } from '@/api/TimetableAPI';
import { Dayjs } from 'dayjs';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
    setup: () => {
        const companyStore = useCompanyStore();
        const { company } = storeToRefs(companyStore);

        const changeRef = ref<any>(null);
        const isChangeModal = ref<boolean>(false);
        const isChangeWeekdayModal = ref<boolean>(false);
        const auth = useAuthStore();

        const timetable = ref<ITimetable[]>([]);
        const workingTime = ref<string[]>([]);
        const {
            fetchData: getCompanyInfo,
            isLoading,
            message,
        } = useFetching(async () => {
            selectedCompany.value = await CompanyAPI.getCompany(
                authUser.value.companyId,
            );
            timetable.value = await TimetableAPI.getTimetableByCompanyId(
                authUser.value.companyId,
            );
            if (timetable.value.length > 0) {
                workingTime.value = [
                    timetable.value[0].startTime,
                    timetable.value[0].endTime,
                ];
            } else {
                workingTime.value = [];
            }

        const {authUser} = storeToRefs(auth);
        const route = useRoute();
        const servicesCount = ref<number>();
        const mastersCount = ref<number>();
        const selectedCompany = ref<ICompany>();
        const companyIncome = ref<number>()

        const companyAlias = route.params['companyAlias'] as string;


        const {
            fetchData: getInfo,
            response: companyInfo,
            isLoading,
            message,
        } = useFetching(async () => {
            const company = await CompanyAPI.getCompany(authUser.value.companyId);
            selectedCompany.value = company;

            const countS = await CompanyAPI.getCompanyServicesCount(companyAlias);
            servicesCount.value = countS;

            const countM = await CompanyAPI.getCompanyMastersCount(companyAlias);
            mastersCount.value = countM;

            const income = await CompanyAPI.getCompanyIncome(companyAlias);
            companyIncome.value = income;
            
            return company;
        });
        getInfo();

        const validateMessages = {
            required: '${label} is required!',
        };
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        return {
            company,
            changeRef,
            workingTime,
            isChangeModal,
            isChangeWeekdayModal,
            layout,
            makeEnum,
            getCompanyInfo,
            getInfo,
            validateMessages,
            timetable,
            selectedCompany,
            isLoading,
            Weekday,
            message,
            mastersCount,
            servicesCount,
            companyIncome
        };
    },
    methods: {
        showChangeModal() {
            this.isChangeModal = true;
        },
        isSelected(weekday: Weekday): boolean {
            var findedTime = this.timetable.find((t) => t.weekday == weekday);
            return !!findedTime;
        },
        showChangeWeekdayModal() {
            console.log('asdasdsad');
            this.isChangeWeekdayModal = true;
        },
        updateFinalAction() {
            this.getCompanyInfo();
            this.getInfo();
        },
    },
    components: {
        LikeOutlined,
        WeekdayForm,
        CompanySettingForm,
    },
});
</script>

<template>
    <div>
        <response-alert :message="message" :isLoading="isLoading" />
        <div v-if="(!isLoading)">
        <h1 class="text-center">Settings for Company</h1>
        <a-space size="middle">
            <a-space direction="vertical" size="middle">
                <div class="space-align-container">
                    <div class="space-align-block">
                        <a-space align="start">
                            <img
                                class="settingImage"
                                :width="155"
                                :src="selectedCompany?.img"
                            />
                            <div class="personInfo">
                                <a-descriptions
                                    title="Company Info"
                                    bordered="true"
                                >
                                    <a-descriptions-item
                                        label="Company name"
                                        :span="3"
                                        >{{
                                            selectedCompany?.companyName
                                        }}</a-descriptions-item
                                    >

                                    <a-descriptions-item
                                        label="Address"
                                        :span="3"
                                        >{{
                                            selectedCompany?.address
                                        }}</a-descriptions-item
                                    >
                                    <a-descriptions-item
                                        label="Working time"
                                        :span="3"
                                    >
                                        <div
                                            class=""
                                            v-if="workingTime.length == 2"
                                        ></div>
                                        {{ workingTime[0] }} -
                                        {{
                                            workingTime[1]
                                        }}</a-descriptions-item
                                    >
                                    <a-descriptions-item
                                        label="Working days"
                                        :span="3"
                                    >
                                        <div
                                            v-for="weekday in makeEnum(Weekday)"
                                            :key="weekday"
                                            :class="`ant-avatar weekday-circle ${
                                                isSelected(weekday)
                                                    ? 'weekday-circle-active'
                                                    : ''
                                            }`"
                                        >
                                            {{ weekday }}
                                        </div>
                                    </a-descriptions-item>
                                    <a-row
                                        type="flex"
                                        justify="end"
                                        class="mt-4"
                                    >
                                        <a-button
                                            size="large"
                                            type="primary"
                                            html-type="submit"
                                            @click="showChangeWeekdayModal"
                                            >Change TimeTable</a-button
                                        >
                                    </a-row>
                                </a-descriptions>
                            </div>
                        </a-space>
                    </div>
                </div>
                <a-row>
                    <a-col :span="5">
                        <div class="settingPageStatistic">
                            <a-statistic title="Masters" :value="100" />
                              <a-statistic title="Masters" :value="mastersCount" />
                        </div>
                    </a-col>
                    <a-col :span="5">
                        <div class="settingPageStatistic">
                            <a-statistic title="Services" :value="70" />
                        <a-statistic title="Services" :value="servicesCount" />
                        </div>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="5">
                        <div class="settingPageStatistic">
                            <a-statistic
                                title="Income (EUR)"
                                :precision="2"
                                :value="200000"
                            />
                        <a-statistic
                            title="Income (EUR)"
                            :precision="2"
                            :value="companyIncome"
                        />
                        </div>
                    </a-col>
                    <a-col :span="5">
                        <div class="settingPageStatistic">
                            <a-statistic title="Feedback" :value="556">
                                <template #suffix>
                                    <like-outlined />
                                </template>
                            </a-statistic>
                        </div>
                    </a-col>
                </a-row>
                <a-button type="primary" @click="showChangeModal"
                    >Change data</a-button
                >
            </a-space>
        </a-space>
        <CompanySettingForm
            v-model:show="isChangeModal"
            @final="updateFinalAction"
            :editCompany="selectedCompany"
        />
        <WeekdayForm
            v-model:show="isChangeWeekdayModal"
            @final="updateFinalAction"
            :editCompany="selectedCompany"
        />
    </div>
    </div>
</template>

<style scoped></style>
