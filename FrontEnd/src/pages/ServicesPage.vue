<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue';
import { IService } from '@/models/IService';
import { LikeOutlined } from '@ant-design/icons-vue';
import BookingForm from '@/components/BookingForm.vue';
import { useAuthStore } from '@/store/useAuth';
import { storeToRefs } from 'pinia';

export default defineComponent({
    components: {
        LikeOutlined,
        BookingForm,
    },
    data: () => ({
        services: [] as IService[],
        selectedService: {} as IService,
    }),
    setup() {
        const changeRef = ref<any>(null);
        const isBookingModal = ref<boolean>(false);
        const validateMessages = {
            required: '${label} is required!',
        };

        const initLoading = ref(true);
        const loading = ref(false);
        const limit = ref<number>(3);
        const page = ref<number>(1);
        const dataService = ref<IService[]>([]);
        const servicesList = ref<IService[]>([]);
        const value = ref<string>('');
        const onSearch = (searchValue: string) => {
            console.log('use value', searchValue);
            console.log('or use this.value', value.value);
        };

        const { authUser } = storeToRefs(useAuthStore());

        onMounted(async () => {
            const services = await ServiceAPI.getPublicServices(
                authUser.value.companyId,
                limit.value,
                page.value,
            );
            initLoading.value = false;
            dataService.value = services;
            servicesList.value = services;
        });

        return {
            changeRef,
            isBookingModal,
            formState,
            layout,
            validateMessages,
            loading,
            initLoading,
            dataService,
            servicesList,
            value,
            current: ref(1),
            page,
            onSearch,
        };
    },
    methods: {
        showBookingModal(service: IService) {
            this.isBookingModal = true;
            this.selectedService = service;
        },
    },
});
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const formState = reactive({
    booking: {
        masterName: '',
        date: '',
        time: '',
    },
});
</script>

<template>
    <h1 class="text-center">Our Services</h1>
    <a-input-search
        v-model:value="value"
        placeholder="Search the service"
        style="width: 500px"
        enter-button
        @search="onSearch"
    />
    <a-list
        class=""
        :loading="initLoading"
        item-layout="horizontal"
        :data-source="servicesList"
    >
        <template #renderItem="{ item }">
            <a-list-item>
                <div class="container">
                    <img
                        :src="item.img"
                        alt="service"
                        class="image"
                        style="width: 100%"
                    />
                    <div class="middle">
                        <div class="text">{{ item.name }}</div>
                    </div>
                </div>
                <a-skeleton
                    avatar
                    :title="false"
                    :loading="!!item.loading"
                    active
                >
                    <a-list-item-meta style="margin-right: 50px">
                        <template #title>
                            {{ item.name }}
                            <em class
                                ><br /><small>{{ item.description }}</small
                                ><br
                            /></em>
                            <a-row>
                                <a-col class="info">
                                    <a-statistic
                                        title=""
                                        :value="item.duration"
                                    >
                                        <template #suffix> min </template>
                                    </a-statistic>
                                </a-col>
                                <a-col class="info">
                                    <a-statistic title="" :value="item.price">
                                        <template #suffix> euro </template>
                                    </a-statistic>
                                </a-col>
                                <a-col class="info">
                                    <a-statistic title="" :value="500">
                                        <template #suffix>
                                            <like-outlined />
                                        </template>
                                    </a-statistic>
                                </a-col>
                            </a-row>
                        </template>
                    </a-list-item-meta>
                    <a-button
                        type="primary"
                        @click="() => showBookingModal(item)"
                        >Book time</a-button
                    >
                </a-skeleton>
            </a-list-item>
        </template>
    </a-list>
    <a-pagination v-model:current="current" :total="page" show-less-items />
    <BookingForm v-model:show="isBookingModal" :service="selectedService" />
</template>
