<script lang="ts">
import LoginForm from '@/components/Auth/LoginForm.vue';
import RegForm from '@/components/Auth/RegForm.vue';
import { defineComponent } from 'vue';
import '@/styles/authPage.scss';

export default defineComponent({
    data: () => ({
        isRegistration: true,
    }),
    components: { LoginForm, RegForm },
});
</script>

<template>
    <a-row justify="center">
        <a-col :span="12">
            <div v-if="!isRegistration">
                <h4 class="text-center mb-4">Authorization</h4>
                <LoginForm />
            </div>
            <div v-else>
                <h4 class="text-center mb-4">Registration for your company</h4>
                <RegForm />
            </div>

            <a-row justify="end">
                <a-switch
                    v-model:checked="isRegistration"
                    checked-children="Registration"
                    un-checked-children="Authorization"
                />
            </a-row>
        </a-col>
    </a-row>
</template>

<style scoped></style>
