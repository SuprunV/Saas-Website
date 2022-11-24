<template >
      <div class="">
    <div v-createModal="{ show: show, width: 50 }">
        <div class="main-cart" role="document">
            <a-form
                :model="formStateService"
                v-bind="layout"
                name="nest-messages"
                :validate-messages="validateMessages"
                @finish="submitForm"
            >
        
            <response-alert :message="AddMessage" :isLoading="isAddingLoading" />
            <response-alert :message="UpdateMessage" :isLoading="isUpdateLoading" />
                
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
                       
                       >
                        <span>OK</span>
                    </a-button> 
                </div>
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


export default defineComponent({
    props: {
        show: Boolean,
        changedServiceId: Object as PropType<number | undefined>,
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

        const { 
            fetchData: updateService,
            isLoading: isUpdateLoading, 
            message: UpdateMessage,
            } = useFetching(async () => {
            console.log('update serivce', formStateService);
            return await ServiceAPI.updateCompanyServices(formStateService.value.id, formStateService.value);

        });

        const{ 
            fetchData: addService,
            isLoading: isAddingLoading,
            message: AddMessage,
             response: newService} 
        = useFetching(async () => {
            console.log('add service', formStateService);
            const newService: IService ={
                id: 0, 
                name: formStateService.value.name,
                price: formStateService.value.price,
                description: formStateService.value.description,
                duration: formStateService.value.duration,
                companyId: formStateService.value.companyId,
            };
            const isValid = 
                newService.price > 0 &&
                newService.duration > 0 ;
            if(isValid){
                await ServiceAPI.addService(newService);
            }
            else if( !isValid){
                throw Error('You have to fill all fields!');
            }
            console.log('return newService', newService);
            return newService;
        })

        
        const{ fetchData: getServices, 
            response: selectedService,
        } = useFetching(async () => {
            return await ServiceAPI.getPublicServices( auth.authUser.companyAlias, limit.value, page.value);
        })
    

        const formStateService = ref<IService>({
                name: '',
                price: 0,
                description: '',
                duration: 0,
                id: 0,
                companyId: authUser.value.companyId
        });
      

        return {
            formStateService: formStateService,
            layout,
            validateMessages,
            updateService, 
            authUser,
            getServices,
            isAddingLoading,
            AddMessage,
            UpdateMessage,
            isUpdateLoading,
            selectedService,
            addService,
            newService
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
        },

    },
    methods: {
        close() {
            this.$emit('update:show', false);
        },
        async submitForm() {

            console.log('changedServiceId', this.changedServiceId);
            
            if(this.changedServiceId != undefined) {
            await this.updateService();
            }
            else
            {
            await this.addService();
            }
            
            if (this.AddMessage.type == ResponseTypeEnum.SUCCESS) {
            setTimeout(async () => {
                    await this.getServices();
                    this.$emit('update:show', false);
                    this.$emit('finalAction');
                }, 1500);
            }
            else if (this.UpdateMessage.type == ResponseTypeEnum.SUCCESS) {
            setTimeout(async () => {
                //  await this.getServices();
                    this.$emit('update:show', false);
                    this.$emit('finalAction');
                }, 1500);
            }
            
          
        },
    },
});
</script>
