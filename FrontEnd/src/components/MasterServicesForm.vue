<template>
    <div class="">
        <div v-createModal="{ show: show, width: 50 }">
            <div class="main-cart" role="document">
                <a-form
                    ref="formRef"
                    name="dynamic_form_nest_item"
                    :model="formStateService"
                    @finish="submitForm"
                >
                    <response-alert
                        :message="messageUpdatingServiceMasters"
                        :isLoading="isLoadingUpdatingServiceMasters"
                    />

                    <a-space
                        style="width: 100%"
                        v-for="(master, index) in formStateService"
                        :key="master.masterId"
                    >
                        <a-form-item
                            :name="[index, 'masterId']"
                            label="Master"
                            :rules="{
                                required: true,
                                message: 'Missing master',
                            }"
                        >
                            <a-select
                                v-model:value="master.masterId"
                                placeholder="Select Master"
                            >
                                <a-select-option
                                    v-for="masterData in masters"
                                    :key="masterData.id"
                                    :value="masterData.id"
                                >
                                    {{ masterData.name }}
                                    {{ masterData.surname }}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item>
                            <MinusCircleOutlined
                                @click="removeMaster(master.masterId)"
                            />
                        </a-form-item>
                    </a-space>
                    <a-form-item>
                        <a-button type="dashed" @click="addMaster">
                            <PlusOutlined />
                            Add Master
                        </a-button>
                    </a-form-item>
                    <a-form-item>
                        <button
                            class="ant-btn ant-btn-danger"
                            type="button"
                            @click="close"
                        >
                            <span>Cancel</span>
                        </button>
                        <a-button type="primary" html-type="submit"
                            >Submit</a-button
                        >
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { IServiceMasters, ServiceAPI } from '@/api/ServiceAPI';
import { IService, IServiceMaster } from '@/models/IService';
import { PropType } from 'vue-types/dist/types';
import layout from 'ant-design-vue/lib/layout';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/store/useAuth';
import { useFetching } from '@/hooks/useFetching';
import { ResponseTypeEnum } from '@/types/FetchResponse';
import { useCompanyStore } from '@/store/useCompany';
import { IMaster } from '@/models/IMaster';
import { IUser } from '@/models/IUser';
import { UserAPI } from '@/api/UserAPI';
import { CompanyAPI } from '@/api/CompanyAPI';
import { MinusCircleOutlined } from '@ant-design/icons-vue/lib/icons';
import { uniqByKeepFirst } from '@/services/filterByKey';

export default defineComponent({
    props: {
        show: Boolean,
        serviceId: Object as PropType<number | undefined>,
    },
    components: { MinusCircleOutlined },
    setup(props) {
        const auth = useAuthStore();
        const masters = ref<IUser[]>([]);
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };

        const validateMessages = {
            required: '${label} is required!',
            types: {
                number: '${label} is not a valid number!',
            },
            number: {
                range: '${label} must be between ${min} and ${max}',
            },
        };

        const { response: fetchedMasters, fetchData: fetchMasters } =
            useFetching(async () => {
                return await CompanyAPI.getCompanyMasters(
                    auth.authUser.companyId,
                );
            });

        const {
            fetchData: updateServiceMasters,
            message: messageUpdatingServiceMasters,
            isLoading: isLoadingUpdatingServiceMasters,
        } = useFetching(async () => {
            if (props.serviceId) {
                return await ServiceAPI.addServiceMasters(
                    props.serviceId,
                    formStateService.value,
                );
            } else {
                throw Error('invalid service');
            }
        });

        const { fetchData: fetchServiceMasters } = useFetching(async () => {
            if (props.serviceId) {
                const dbServiceMasters = await ServiceAPI.getServiceMasters(
                    props.serviceId,
                );
                formStateService.value = dbServiceMasters;
                return dbServiceMasters;
            } else {
                throw Error('invalid service');
            }
        });
        fetchServiceMasters();

        const formStateService = ref<IServiceMaster[]>([]);

        return {
            masters,
            fetchServiceMasters,
            updateServiceMasters,
            isLoadingUpdatingServiceMasters,
            messageUpdatingServiceMasters,
            formStateService,
            fetchedMasters,
            layout,
            validateMessages,
            fetchMasters,
        };
    },
    watch: {
        async serviceId() {
            console.log('data changed', this.serviceId);
            this.fetchServiceMasters();
            // if (this.changedServiceId != undefined) {
            //     const serviceObject = await ServiceAPI.getServiceById(
            //         this.changedServiceId,
            //     );
            //     console.log('data changed', serviceObject);
            //     this.formStateService = serviceObject;
            // }
        },
        // async newServiceId(){
        //     console.log('new data', this.newServiceId)
        //     if(this.newServiceId != undefined){
        //         const serviceObject = await ServiceAPI.addService(this.formStateService);
        //         this.formStateService = serviceObject;
        //     }
        // }
    },
    methods: {
        close() {
            this.formStateService = [];
            this.$emit('update:serviceId', undefined);
            this.$emit('update:show', false);
        },
        removeMaster(masterId: number | undefined) {
            this.formStateService = this.formStateService.filter(
                (m) => m.masterId != masterId,
            );
        },
        addMaster(master: IUser) {
            if (this.serviceId) {
                this.formStateService.push({
                    Id: 0,
                    masterId: undefined,
                    serviceId: this.serviceId,
                });
            }
        },
        async submitForm() {
            console.log('was', this.formStateService);
            this.formStateService = this.formStateService.filter(
                (item) => item.masterId,
            );
            this.formStateService = uniqByKeepFirst<IServiceMaster>(
                this.formStateService,
                (item) => item.masterId,
            );

            console.log('now', this.formStateService);
            await this.updateServiceMasters();
            if (
                this.messageUpdatingServiceMasters.type ==
                ResponseTypeEnum.SUCCESS
            ) {
                setTimeout(async () => {
                    //  await this.getServices();
                    this.close();
                    this.$emit('finalAction');
                }, 1500);
            }
        },
    },
    async mounted() {
        await this.fetchMasters();
        this.masters = this.fetchedMasters;
    },
});
</script>
