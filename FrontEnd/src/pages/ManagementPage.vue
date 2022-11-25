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
import UserForm from '@/components/UserForm.vue';
import { useCompanyStore } from '@/store/useCompany';
import { storeToRefs } from 'pinia';
import { useFetching } from '@/hooks/useFetching';
import dayjs from 'dayjs';
import { CompanyAPI } from '@/api/CompanyAPI';

export default defineComponent({
   
    data: () => ({
        RolesEnum,
        clientCount: 0,
        companyCount: 0,
        masterCount: 0,
        services: [] as IService[],
        masters: [] as IUser[],
        changedServiceId: undefined as undefined|number,
        changedUserId: undefined as undefined|number,
    }),
    setup() {
        const initLoading = ref(true);
        const loading = ref(false);
        const limit = ref<number>(100);
        const page = ref<number>(1);
        const role = ref<RolesEnum>(RolesEnum.MASTER);
        const dataService = ref<IService[]>([]);
        const serviceList = ref<IService[]>([]);
        const dataMaster = ref<IUser[]>([]);
        const masterList = ref<IUser[]>([]);
        
        const auth = useAuthStore();
        const {authUser} = storeToRefs(auth);

        const companyStore = useCompanyStore();
        const { company } = storeToRefs(companyStore);

        const changeUser = ref<IUser>({
        } as IUser);


        const {
            fetchData: getUsersInfo,
            isLoading: isUserLoading, 
            message: UserMessage
        } = useFetching(async () => {
            const users = await CompanyAPI.getCompanyMasters(authUser.value.companyId);
           
           masterList.value = users;

            return users;
        });
        getUsersInfo();

        const{
            fetchData: getServices,
            isLoading: isServiceLoading,
            message: ServiceMessage,
        } = useFetching(async () => {
            const services = await ServiceAPI.getPublicServices(
                auth.authUser.companyAlias,
                limit.value,
                page.value,
            );
            serviceList.value = services;
            return services;
        });

        getServices();


        async function deleteService(serviceId : IService) {
            console.log('delete serivce', serviceId);
            const service = await ServiceAPI.deleteCompanyService(serviceId.id);

            getServices();
        }
        async function deleteUser(item : IUserToken )  {
            console.log('delete user', item);
            const master = await CompanyAPI.deleteCompanyMasters(item.id);
            getUsersInfo();
        }
        
     
       
        onMounted(async () => {
        // const masters = await CompanyAPI.getCompanyMasters(
        //     authUser.value.companyId,
        // );
        initLoading.value = false;
        });
     

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
            deleteUser,
            getServices,
            masterList,
            dataService,
            dataMaster,
            initLoading,
            loading,
            isUserLoading, 
            UserMessage,
            serviceList,
            getUsersInfo,
            isServiceLoading,
            ServiceMessage,
            changeUser,
            
            
            
        };
    },
    methods: {
        showChangeModalService(id: number | undefined) {
            console.log('show service', id);
            this.isChangeModalService = true;
            this.changedServiceId = id;
        },


       async  showModalUser(id: number) {
            console.log('show user');
            this.isChangeModalUser = true;
            this.changedUserId = id;
           },
      
        UpdateFinalAction(){
            console.log("UpdateFinalAction");
            this.getServices();
            this.getUsersInfo();
        }
    },
    components: {
    PlusCircleTwoTone,
    UserForm,
    ServiceForm
},
   
  
});

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const formState = reactive({
    user: {
        id: 1,
        name: '',
        surname: '',
        age: undefined,
        email: '',
        gender: '',
        role: RolesEnum.MASTER,
        img: "",
        login:   "" ,
        password: "",
        doB:  "",
    },
    components:{
        UserForm
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
        ServiceForm,
    },
});
</script>

<template>
    <div class="row">
        <div class="col">
            <a-button type="primary"  @click="() => showModalUser(0)">
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
                                        @click="deleteUser(item)"
                                            >Delete</a-button
                                        >
                                        <a-button
                                            type="primary"
                                            @click="showModalUser(item.id)"
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
                                            @click="
                                                showChangeModalService(item.id)
                                            "
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
        <UserForm @finalAction="UpdateFinalAction" v-model:show="isChangeModalUser" v-model:changedUserId="changedUserId"  v-createModal="{ show: isChangeModalUser } "/>
        <ServiceForm v-model:show="isChangeModalService" @finalAction="UpdateFinalAction" v-model:changedServiceId="changedServiceId" />
    </div>
</template>
