<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
interface DataItem {
  title: string;
}


const DataItemforPerson: DataItem[] = [
  {
    title: 'Lena Smirnova',
  },
];
const DataItemforService: DataItem[] = [
  {
    title: 'Finger care, nail cleaning and polishing',
  },
];
import {
    PlusCircleTwoTone

} from '@ant-design/icons-vue';
export default defineComponent({
  components: {
    PlusCircleTwoTone,
  },
  setup() {
    return {
        DataItemforPerson,DataItemforService
    };
  },
});


    


</script>
    
<template>
  
  <div class="row">
    &nbsp<div class="col">
    <a-button type="primary">
    <template #icon><plus-circle-two-tone /></template>
    Add new personnel
  </a-button>
  <div class="m-3"><b>List of personnel:</b>
    <a-list item-layout="horizontal" :data-source="DataItemforPerson">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta  
        >
          <template #title>
            <a href="./myfircom/management">{{ item.title }}</a>
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
    <a-button type="primary">
    <template #icon><plus-circle-two-tone /></template>
    Add new service
  </a-button>
  <div class="m-3"><b>List of service:</b>
    <a-list item-layout="horizontal" :data-source="DataItemforService">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta  
        >
          <template #title>
            <a href="./myfircom/management">{{ item.title }}</a>
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
        
