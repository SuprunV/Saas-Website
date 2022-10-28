<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { IService } from '@/models/IService';
import { serviceAPI } from '@/api/serviceAPI';
import { LikeOutlined } from '@ant-design/icons-vue';

export default defineComponent({
    components: {
    LikeOutlined,
  },
    data: () => ({
        services: [] as IService[],
    }),
    setup() {
        const initLoading = ref(true);
        const loading = ref(false);
        const limit = ref<number>(3);
        const page = ref<number>(1);
        const dataService = ref<IService[]>([]);
        const servicesList = ref<IService[]>([]);
        onMounted(async () => {
            const services = await serviceAPI.getPublicServices(
                limit.value,
                page.value,
            );
            initLoading.value = false;
            dataService.value = services;
            servicesList.value= services
        });

    return {
      loading,
      initLoading,
      dataService,
      servicesList,
    };
  },
});
</script>

<template>
    <h1 class="text-center">Our Services</h1>
        <a-list
            class=""
            :loading="initLoading"
            item-layout="horizontal"
            :data-source="servicesList"
        >
            <template #renderItem="{ item }">
            <a-list-item>
                <div class="container">
                    <img :src="item.img" alt="service" class="image" style="width:100%">
                    <div class="middle">
                        <div class="text">{{item.name}}</div>
                    </div>
                </div>
                <a-skeleton avatar :title="false" :loading="!!item.loading" active>
                <a-list-item-meta  style="margin-right: 50px">
                    <template #title >
                    {{ item.name }}
                    <em class><br><small>{{item.description}}</small><br></em>
                        <a-row > 
                                <a-col style="margin-right: 20px">
                                    <a-statistic title="Duration" :value="item.duration"  />
                                </a-col>
                                <a-col style="margin-right: 20px">
                                    <a-statistic title="Price"  :value="item.price" />
                                </a-col>
                                <a-col style="margin-right: 20px">
                                    <a-statistic title="Feedback" :value="500">
                                        <template #suffix>
                                            <like-outlined />
                                        </template>
                                    </a-statistic>
                                </a-col>
                        </a-row>
                    </template>
                </a-list-item-meta>
                <a-button type="primary">Book time</a-button> 
                
                </a-skeleton>
            </a-list-item>
            </template>
        </a-list>
</template>



