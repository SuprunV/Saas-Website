<template >
    <div v-createModal="{ show: show, width: 50 }">
        <div class="main-cart" role="document">
            <a-form
                :model="formStateService"
                v-bind="layout"
                name="nest-messages"
                :validate-messages="validateMessages"
                @finish="submitForm"
            >
                <div class="ant-modal-body">
                    <a-form-item
                        name="name"
                        label="Name"
                        :rules="[{ required: true }]"
                    >
                        <a-input
                            v-model:value="formStateService.name"
                        />
                    </a-form-item>
                    <a-form-item
                        name="description"
                        label="Description"
                        :rules="[{ required: true }]"
                    >
                        <a-input
                            v-model:value="formStateService.description"
                        />
                    </a-form-item>
                    <a-form-item
                        name="price"
                        label="Price"
                        :rules="[{ type: 'number', min: 0, max: 1000 }]"
                    >
                        <a-input-number
                            v-model:value="formStateService.price"
                        />
                    </a-form-item>
                    <a-form-item
                        name="duration"
                        label="Duration (in minutes)"
                        :rules="[{ type: 'number', min: 0, max: 1000 }]"
                    >
                        <a-input-number
                            v-model:value="formStateService.duration"
                        />
                    </a-form-item>
                </div>
              
                <div class="ant-modal-footer">
                    <button
                        class="ant-btn ant-btn-danger"
                        type="button"
                        @click="close"
                    >
                        <span>Cancel</span></button
                    > <a-button 
                        class="ant-btn btn-success" 
                        html-type="submit" 
                        @click="close"
                       
                       >
                        <span>OK</span>
                    </a-button> 
                </div>
            </a-form>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { ServiceAPI } from '@/api/ServiceAPI';
import { IService } from '@/models/IService';
import { number, object } from 'vue-types';
import { Nullable } from 'primevue/ts-helpers';
import { PropType } from 'vue-types/dist/types';
import layout from 'ant-design-vue/lib/layout';
import { describe } from 'node:test';
import { useFetching } from '@/hooks/useFetching';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/store/useAuth';
import {  onMounted } from 'vue';


export default defineComponent({
    props: {
        show: Boolean,
        changedServiceId: Object as PropType<number | undefined>
    },
    setup(props) {
        const auth = useAuthStore();
        const { authUser } = storeToRefs(auth);
        const limit = ref<number>(5);
        const page = ref<number>(1);

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

        async function updateService() {
            console.log('update serivce', formStateService);
            const service = await ServiceAPI.updateCompanyServices(formStateService.value.id, formStateService.value);

        }
        async function getService(){
            const service = await ServiceAPI.getPublicServices(   auth.authUser.companyAlias,
                limit.value,
                page.value,);
        }
    

        const formStateService = ref<IService>({
        
                name: '',
                price: 0,
                description: '',
                duration: 0,
                id: 0
        });

        return {
            formStateService: formStateService,
            layout,
            validateMessages,
            updateService, 
            authUser,
            getService
        };
    },
    watch: {
       async changedServiceId(){
            console.log('data changed', this.changedServiceId);
            if(this.changedServiceId != undefined){
            const serviceObject = await ServiceAPI.getServiceById(this.changedServiceId);
            console.log('data changed', serviceObject);

            this.formStateService = serviceObject;
            }

        }
    },
    methods: {
        close() {
            this.$emit('update:show', false);
        },
        submitForm() {
            console.log('submit started', this.formStateService);
         
            this.updateService();
            this.getService();
            setTimeout(() => {
                console.log('authUser after store login', this.authUser);
                 //   this.$router.push(`/${this.authUser.companyAlias}/settings`);
                    this.$router.push(`/${this.authUser.companyAlias}/settings`);
                }, 3000);
          
        },
    },
});
</script>
