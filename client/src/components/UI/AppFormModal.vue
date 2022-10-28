<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'app-form-modal',
    props: {
        show: Boolean,
        formState: Object,
        validateMessages: Object,
        layout: Object,
    },
    data: () => ({
        isVisiable: false,
    }),
    watch: {
        show() {
            this.isVisiable = this.$props.show;
        },
    },
    methods: {
        submitForm() {
            this.$emit('submit');
        },
        close(e: any) {
            e.stopPropagation();
            this.$emit('close');
        },
    },
});
</script>

<template>
    <div>
        <div v-createModal="{ show: true }">
            <slot />
        </div>
    </div>
</template>

<style scoped></style>
