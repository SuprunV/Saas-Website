<script lang="ts">
import { IService } from '@/models/IService';
import { UserAPI } from '@/api/UserAPI';
import { defineComponent, ref, reactive, onMounted } from 'vue';
import {IUserToken, RolesEnum, IUser } from '@/models/IUser';
import { PlusCircleTwoTone } from '@ant-design/icons-vue';
import ServiceForm from '@/components/ServiceForm.vue';
import { useAuthStore } from '@/store/useAuth';
import { ServiceAPI } from '@/api/ServiceAPI';
import UserSettingForm from '@/components/UserSettingForm.vue';
import { useCompanyStore } from '@/store/useCompany';
import { storeToRefs } from 'pinia';
import { useFetching } from '@/hooks/useFetching';
import dayjs from 'dayjs';
import { CompanyAPI } from '@/api/CompanyAPI';

export default defineComponent({
    components: {
    PlusCircleTwoTone,
    ServiceForm,
    UserSettingForm
},

    data: () => ({
        RolesEnum,
        clientCount: 0,
        companyCount: 0,
        masterCount: 0,
        services: [] as IService[],
        masters: [] as IUserToken[],
        changedServiceId: undefined as undefined|number,
        newServiceId: undefined as undefined|number,
    }),
    setup() {
        const initLoading = ref(true);
        const loading = ref(false);
        const limit = ref<number>(100);
        const page = ref<number>(1);
        const role = ref<RolesEnum>(RolesEnum.MASTER);
        const dataService = ref<IService[]>([]);
        const serviceList = ref<IService[]>([]);
        const dataMaster = ref<IUserToken[]>([]);
        const masterList = ref<IUserToken[]>([]);
        
        const auth = useAuthStore();
        const {authUser} = storeToRefs(auth);

        const companyStore = useCompanyStore();
        const { company } = storeToRefs(companyStore);

        const changeUser = ref<IUser>({
        } as IUser);


        const {
            fetchData: getUsersInfo,
        } = useFetching(async () => {
            const users = await CompanyAPI.getCompanyMasters(authUser.value.companyId);
            masterList.value = users;
            changeUser.value = JSON.parse(JSON.stringify(users));
           //changeUser.value.doB = dayjs(changeUser.value.doB ? new Date(users.doB) : new Date());
           
            return users;
        });
        getUsersInfo();

        const{
            fetchData: getServices,
            isLoading,
            message,
        } = useFetching(async () => {
            const services = await ServiceAPI.getPublicServices(auth.authUser.companyAlias, limit.value, page.value);
            serviceList.value = services;
            return services;
        });
      
        getServices();

        // const{
        //     fetchData: deleteServices, 
        // } = useFetching(async () => {
        //     const deletedService = await ServiceAPI.deleteCompanyService(formStateService.service.id);
            
        //     return deletedService;
        // });


        async function deleteService(serviceId : IService) {
            console.log('delete serivce', serviceId);
            const service = await ServiceAPI.deleteCompanyService(serviceId.id);

            getServices();
        }
     
       
        onMounted(async () => {
            // const services = await ServiceAPI.getPublicServices(
            // auth.authUser.companyAlias,
            // limit.value,
            // page.value,
            // );
        // const masters = await CompanyAPI.getCompanyMasters(
        //     authUser.value.companyId,
        // );
    
        initLoading.value = false;
        // dataService.value = services;
        // serviceList.value = services;
        //dataMaster.value = masters;
        

        });



        // async function deleteUser(item : IUserToken )  {
        //     console.log('delete user', item);
        //     const master = await CompanyAPI.deleteCompanyMasters(item.id);
        // }
        
     

        const changeRef = ref<any>(null);
        const isChangeModalService = ref<boolean>(false);
        const isChangeModalUser = ref<boolean>(false);
        const validateMessages = {
            required: '${label} is required!',
            types: {
                email: '${label} is not a valid email!',
                number: '${label} is not a valid number!',
            },
            number: {
                range: '${label} must be between ${min} and ${max}',
            },
        };

        return {
            changeRef,
            isChangeModalUser,
            formState,
            layout,
            validateMessages,
            formStateService,
            isChangeModalService,
            deleteService,
            getServices,
            masterList,
            dataService,
            dataMaster,
            initLoading,
            loading,
            isLoading, 
            message, 
            serviceList,
            getUsersInfo,
            changeUser,
            
            
        };
    },
    methods: {
        showChangeModalService(id : number | undefined) {
            console.log('show service', id);
            this.isChangeModalService = true;
            this.newServiceId = id;
            this.changedServiceId = id;
        },

        showModalUser() {
            console.log('show user');
            this.isChangeModalUser = true;
        },
      
        UpdateFinalAction(){
            console.log("UpdateFinalAction");
            this.getServices();
            this.getUsersInfo();
        }
    },
  
});

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const formState = reactive({
    user: {
        name: '',
        surname: '',
        age: undefined,
        email: '',
        gender: '',
        role: RolesEnum.MASTER,
    },
});

const formStateService = reactive({
    service: {
        id: 1,
        name: '',
        price: 0,
        description: '',
        duration: 0,
     },
    components: {
        ServiceForm
    },
});
</script>

<template>
    <div class="row">
        <div class="col">
            <a-button type="primary" @click="showModalUser">
                <template #icon><plus-circle-two-tone /></template>
                Add new personnel
            </a-button>

            <div class="m-3">
                <b>List of personnel:</b>
                <a-list
                    :loading="initLoading"
                    item-layout="horizontal"
                    :data-source="masterList"
                >
                    <template #renderItem="{ item }">
                        <a-list-item>
                            <a-skeleton
                                avatar
                                title="false"
                                :loading="!!item.loading"
                                active
                            >
                                <a-list-item-meta>
                                    <template #title>
                                        <a href="./myfircom/management">{{
                                            item.name
                                        }}</a>
                                        <a-button type="primary" danger 
                                            >Delete</a-button
                                        >
                                        <a-button
                                            type="primary"
                                            @click="showModalUser"
                                            default
                                            >Update</a-button
                                        >
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
        <div class="col">
            <a-button 
                type="primary" 
                @click="() => showChangeModalService(undefined)"
               >
                <template #icon><plus-circle-two-tone />
                
                </template>
                Add new service
            </a-button>
            <div class="m-3">
                <b>List of service:</b>
                
                <a-list
                    :loading="initLoading"
                    item-layout="horizontal"
                    :data-source="serviceList"
                >
                    <template #renderItem="{ item }">
                        <a-list-item>
                            <a-skeleton
                                avatar
                                title="false"
                                :loading="!!item.loading"
                                active
                            >
                                <a-list-item-meta>
                                    <template #title>
                                        <a href="./myfircom/management">{{
                                            item.name
                                        }}</a>
                                        <br /><small>{{
                                            item.description
                                        }}</small>
                                        <br />
                                        <br /><a-button type="primary" danger
                                            @click="deleteService(item)"
                                            >Delete</a-button
                                        >
                                        <a-button
                                            type="primary"
                                            @click="showChangeModalService(item.id)"
                                            default
                                        >
                                            Update
                                        </a-button>
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
        <UserSettingForm @final="UpdateFinalAction" v-model:show="isChangeModalUser"  :editUser="changeUser"  v-createModal="{ show: isChangeModalUser } "/>
        <ServiceForm v-model:show="isChangeModalService" @finalAction="UpdateFinalAction" v-model:changedServiceId="changedServiceId" />
    </div>
</template>
