<script lang="ts">
import { serviceAPI } from '@/api/serviceAPI';
import { IService } from '@/models/IService';
import {UserAPI} from '@/api/UserAPI';
import { defineComponent, ref,reactive, onMounted } from 'vue';
import { IUser, RolesEnum } from '@/models/IUser';
import ClientSettingForm from '@/components/ClientSettingForm.vue';
import {
    PlusCircleTwoTone

} from '@ant-design/icons-vue';
import ServiceForm from '@/components/ServiceForm.vue';
export default defineComponent({
  components: {
    PlusCircleTwoTone,
    ClientSettingForm,
    ServiceForm
},

data: () => ({
        clientCount: 0,
        companyCount: 0,
        masterCount: 0,
        services: [] as IService[],
        masters: [] as IUser[],
    }),
     setup() {
    const initLoading = ref(true);
        const loading = ref(false);
        const limit = ref<number>(5);
        const page = ref<number>(1);
        const role = ref<RolesEnum>(RolesEnum.MASTER);
        const dataService = ref<IService[]>([]);
        const serviceList = ref<IService[]>([]);
        const dataMaster = ref<IUser[]>([]);
        const masterList = ref<IUser[]>([]);
        
          onMounted(async () => {
            const services = await serviceAPI.getPublicServices(
                limit.value,
                page.value,
            );
            const masters = await UserAPI.getPublicUsers(
         
              limit.value,
              page.value,
            );
            initLoading.value = false;
            dataService.value = services;
            serviceList.value= services
            dataMaster.value = masters;
            masterList.value = masters;
        });
   
    return {
        changeRef,
            isChangeModalUser,
            formState,
            layout,
            validateMessages,
            formStateService,
            isChangeModalService,
            serviceList,
            masterList,
            dataService, dataMaster,
            initLoading,
            loading
    };
 },
  methods: {
        showChangeModalService() {
            this.isChangeModalService = true;
        },
        showChangeModalUser() {
            this.isChangeModalUser = true;
        },
    },
});

const changeRef = ref<any>(null);
const isChangeModalService= ref<boolean>(false);
const isChangeModalUser= ref<boolean>(false);
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
                role: RolesEnum.MASTER
            },
        });
        
        const formStateService = reactive({
            service: {
                name: '',
                price: 0,
                description:'',
                duration: 0,
            },
        });
    
;

    

</script>
    
<template>
  <div class="row">
    &nbsp<div class="col">
    <a-button type="primary" @click="showChangeModalUser">
    <template #icon><plus-circle-two-tone /></template>
    Add new personnel  <ClientSettingForm v-model:show="isChangeModalUser" />
  </a-button>
  <div class="m-3"><b>List of personnel:</b>
    <a-list :loading="initLoading" item-layout="horizontal" :data-source="masterList">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-skeleton    avatar
                        :title="false"
                        :loading="!!item.loading"
                        active
                    >
        <a-list-item-meta>
          <template #title>
            <a href="./myfircom/management">{{ item.name }}</a>&nbsp &nbsp<a-button type="primary" danger>Delete</a-button> 
            &nbsp<a-button type="primary" default>Update</a-button>
          </template>
          <template #avatar>
            <a-avatar :src="item.img"  />
          </template>
        </a-list-item-meta>
      </a-skeleton>
      </a-list-item>
    </template>
  </a-list>
  </div>
    </div>
  <div class="col">
    <a-button type="primary" @click="showChangeModalService">
    <template #icon><plus-circle-two-tone /></template>
    Add new service  <ServiceForm v-model:show="isChangeModalService" />
  </a-button>
  <div class="m-3"><b>List of service:</b>
    <a-list :loading="initLoading" item-layout="horizontal" :data-source="serviceList">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-skeleton    avatar
                        :title="false"
                        :loading="!!item.loading"
                        active
                    >
        <a-list-item-meta  
        >
          <template #title>
            <a href="./myfircom/management">{{ item.name }}</a> <br><small>{{item.description}}</small> <br> <br><a-button type="primary" danger>Delete</a-button>  
            &nbsp <a-button type="primary" default> Update </a-button>
          </template>
          <template #avatar>
            <a-avatar :src="item.img"  />
          </template>
        </a-list-item-meta>
      </a-skeleton>
      </a-list-item>
    </template>
  </a-list>
  </div>
    </div>
</div>

</template>
        
