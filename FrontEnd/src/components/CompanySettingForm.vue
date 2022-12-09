<template>
    <div v-createModal="{ show: show, width: 50 }">
        <div class="main-cart">
            <a-form
                :model="formState"
                v-bind="layout"
                name="nest-messages"
                :validate-messages="validateMessages"
                @finish="submitForm"
            >
            <response-alert :message="message" :isLoading="isLoading" />
                <div class="ant-modal-body">
                    <a-form-item
                        name="companyName"
                        label="Company name"
                        :rules="[{ required: true }]"
                    >
                        <a-input
                            v-model:value="formState.companyName"
                        />
                    </a-form-item>
                    <a-form-item
                        name="address"
                        label="Address"
                        :rules="[{ required: true }]"
                    >
                        <a-input v-model:value="formState.address" />
                    </a-form-item>
                    <a-form-item label="Upload">
                            <a-upload
                                maxCount="1"
                                list-type="picture"
                                :before-upload="beforeUpload"
                            >
                                <a-button>
                                    <template #icon
                                        ><UploadOutlined
                                    /></template>
                                    Choose image
                                </a-button>
                            </a-upload>
                        </a-form-item>
                </div>
                <div class="ant-modal-footer">
                    <button
                        class="ant-btn ant-btn-danger"
                        type="button"
                        @click="close"
                    >
                        <span>Cancel</span></button
                    ><a-button class="ant-btn btn-success" html-type="submit">
                        <span>OK</span>
                    </a-button>
                </div>
            </a-form>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { PropType } from 'vue-types/dist/types';
import { useFetching } from '@/hooks/useFetching';
import { CompanyAPI } from '@/api/CompanyAPI';
import { useCompanyStore } from '@/store/useCompany';
import { ICompany } from '@/models/ICompany';
import { storeToRefs } from 'pinia';
import { ResponseTypeEnum } from '@/types/FetchResponse';


export default defineComponent({
    props: {
        show: Boolean,
        editCompany: Object as PropType<ICompany>
    },
    setup(props) {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };

        const companyStore = useCompanyStore();
        const { company } = storeToRefs(companyStore);

        const {
            fetchData: getCompanyInfo,
            response: selectedCompany,
        } = useFetching(async () => {
            return await CompanyAPI.getCompany(company.value.id);
        });

        const validateMessages = {
            required: '${label} is required!',
        };

        const formState = ref<ICompany>({
            files: props.editCompany?.files,
            id: props.editCompany?.id ?? -1,
            img: props.editCompany?.img ?? "",
            companyName: props.editCompany?.companyName ?? "",
            companyAlias: props.editCompany?.companyAlias ?? "",
            address: props.editCompany?.address ?? "",
        });

        const {fetchData: updateCompany,
            isLoading,
            message,} = useFetching(async () => {
            return await CompanyAPI.updateCompany(company.value.id, formState.value)
       });

        return {
            formState,
            layout,
            validateMessages,
            updateCompany,
            selectedCompany,
            isLoading,
            message,
            getCompanyInfo,
            company
        };
    },
    methods: {
        beforeUpload(file: any) {
            this.formState.files = file;
            return false;
        },
        close() {
            this.$emit('update:show', false);
        },
        async submitForm() {
            await this.updateCompany();
            console.log('response', this.selectedCompany, this.message);
            if (this.message.type == ResponseTypeEnum.SUCCESS) {
                setTimeout(async () => {
                    await this.getCompanyInfo();
                    this.$emit('update:show', false);
                    this.$emit('final');
                }, 1500);
            }
        },
    },
    watch: {
        editCompany() {
            console.log("editCompany is updated");
            this.formState = reactive<ICompany>({
                files: this.editCompany?.files,
                id: this.editCompany?.id ?? -1,
                img: this.editCompany?.img ?? "",
                companyName: this.editCompany?.companyName ?? "",
                companyAlias: this.editCompany?.companyAlias ?? "",
                address: this.editCompany?.address ?? "",
        });
        }
    }
});
</script>
