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
                    <a-space
                        v-for="(master, index) in formStateService.masters"
                        :key="master.masterId"
                        style="display: flex; margin-bottom: 8px"
                        align="baseline"
                    >
                        <a-form-item
                            :name="['sights', index, 'value']"
                            label="Sight"
                            :rules="{
                                required: true,
                                message: 'Missing sight',
                            }"
                        >
                            <!-- <a-select
                                v-model:value="sight.value"
                                :options="
                                    (
                                        sights[dynamicValidateForm.area] || []
                                    ).map((a) => ({ value: a }))
                                "
                                style="width: 130px"
                            ></a-select> -->
                        </a-form-item>
                        <MinusCircleOutlined
                            @click="removeMaster(master.masterId)"
                        />
                    </a-space>
                    <a-form-item>
                        <a-button type="dashed" @click="addMaster">
                            <PlusOutlined />
                            Add Master
                        </a-button>
                    </a-form-item>
                    <a-form-item>
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
import { ServiceAPI } from '@/api/ServiceAPI';
import { IService } from '@/models/IService';
import { PropType } from 'vue-types/dist/types';
import layout from 'ant-design-vue/lib/layout';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/store/useAuth';
import { useFetching } from '@/hooks/useFetching';
import { ResponseTypeEnum } from '@/types/FetchResponse';
import { useCompanyStore } from '@/store/useCompany';
import { IMaster } from '@/models/IMaster';
import { IUser } from '@/models/IUser';

export interface IMasterServices {
    serviceId: number;
    masters: { masterId: number }[];
}

export default defineComponent({
    props: {
        show: Boolean,
        serviceId: Object as PropType<number | undefined>,
    },
    setup(props) {
        const auth = useAuthStore();
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

        const formStateService = ref<IMasterServices>({
            serviceId: 1,
            masters: [],
        });

        return {
            formStateService,
            layout,
            validateMessages,
        };
    },
    watch: {
        async changedServiceId() {
            // console.log('data changed', this.changedServiceId);
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
            this.$emit('update:show', false);
        },
        removeMaster(masterId: number) {
            this.formStateService.masters =
                this.formStateService.masters.filter(
                    (m) => m.masterId != masterId,
                );
        },
        addMaster(master: IUser) {
            this.formStateService.masters.push({ masterId: -1 });
        },
        async submitForm() {
            // console.log('changedServiceId', this.changedServiceId);
            // if (this.changedServiceId != undefined) {
            //     await this.updateService();
            // } else {
            //     await this.addService();
            // }
            // if (this.AddMessage.type == ResponseTypeEnum.SUCCESS) {
            //     setTimeout(async () => {
            //         await this.getServices();
            //         this.$emit('update:show', false);
            //         this.$emit('finalAction');
            //     }, 1500);
            // } else if (this.UpdateMessage.type == ResponseTypeEnum.SUCCESS) {
            //     setTimeout(async () => {
            //         //  await this.getServices();
            //         this.$emit('update:show', false);
            //         this.$emit('finalAction');
            //     }, 1500);
            // }
        },
    },
});
</script>
