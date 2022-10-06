<script lang="ts">
import { RolesEnum } from '@/models/IUser';
import { defineComponent, ref,reactive } from 'vue';
import ClientSettingForm from '@/components/ClientSettingForm.vue';
interface DataItem {
  title: string;
}
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
    
const DataItemforPerson: DataItem[] = [
  {
    title: 'Lena Smirnova',
  },
];
const DataItemforService: DataItem[] = [
  {
    title: 'Nails cleaning and polishing',
  },
];
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
  setup() {
    return {
        DataItemforPerson,DataItemforService,
        changeRef,
            isChangeModalUser,
            formState,
            layout,
            validateMessages,
            formStateService,
            isChangeModalService
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


    


</script>
    
<template>
  <div class="row">
    &nbsp<div class="col">
    <a-button type="primary" @click="showChangeModalUser">
    <template #icon><plus-circle-two-tone /></template>
    Add new personnel  <ClientSettingForm v-model:show="isChangeModalUser" />
  </a-button>
  <div class="m-3"><b>List of personnel:</b>
    <a-list item-layout="horizontal" :data-source="DataItemforPerson">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta  
        >
          <template #title>
            <a href="./myfircom/management">{{ item.title }}</a>&nbsp &nbsp<a-button type="primary" danger>Delete</a-button> 
            &nbsp<a-button type="primary" default>Update</a-button>
          </template>
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" />
          </template>
        </a-list-item-meta>
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
    <a-list item-layout="horizontal" :data-source="DataItemforService">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta  
        >
          <template #title>
            <a href="./myfircom/management">{{ item.title }}</a> &nbsp &nbsp<a-button type="primary" danger>Delete</a-button>  
            &nbsp <a-button type="primary" default>Update</a-button>
          </template>
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" />
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
  </div>
    </div>
</div>

</template>
        
