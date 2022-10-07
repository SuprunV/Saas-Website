<script lang="ts">
import { defineComponent } from 'vue';
import { useCompanyStore } from '@/store/useCompany';
import { storeToRefs } from 'pinia';
import { LikeOutlined } from '@ant-design/icons-vue';

export default defineComponent({
    setup: () => {
        const companyStore = useCompanyStore();
        const { company } = storeToRefs(companyStore);
        return { company }
    },
    components: {
    LikeOutlined,
  },
});
</script>

<template>
    
    <div>
        <h1 class="text-center">Settings for Company</h1>
        <a-space direction="vertical" size="middle">
            <div class="space-align-block">
                <a-space align="start">
                <img :width="155"
                    :src="company.img" 
                />
                <a-descriptions title="Company Info" bordered="true">
                    <a-descriptions-item label="Company name" :span="3">{{company.name}}</a-descriptions-item>
                    <a-descriptions-item label="Address" :span="3">Liivalaia 7</a-descriptions-item>
                </a-descriptions>
                </a-space>
            </div>
            <a-row>
                <a-col :span="12">
                    <a-statistic title="Masters" :value="100" />
                </a-col>
                <a-col :span="12">
                    <a-statistic title="Services" :value="70" />
                </a-col>
            </a-row>
            <a-row>
                <a-col :span="12">
                    <a-statistic title="Income (EUR)" :precision="2" :value="200000" />
                </a-col>
                <a-col :span="12">
                <a-statistic title="Feedback" :value="556" style="margin-right: 50px">
                    <template #suffix>
                        <like-outlined />
                    </template>
                </a-statistic>
                </a-col>
            </a-row>
        </a-space>
    </div>
    
</template>

<style scoped></style>
