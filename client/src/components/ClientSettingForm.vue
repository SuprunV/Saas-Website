<template>
    <!-- <a-modal v-model:visible="changeSetingModal" title="Basic Modal" @ok="submitChangeForm">
        <div class="dialog__content"> -->
    <a-form
      :model="formState"
      v-bind="layout"
      name="nest-messages"
      :validate-messages="validateMessages"
      @finish="onFinish"
    >
      <a-form-item :name="['user', 'name']" label="Name" :rules="[{ required: true }]">
        <a-input v-model:value="formState.user.name" />
      </a-form-item>
        <a-form-item :name="['user', 'surname']" label="Surname" :rules="[{ required: true }]">
        <a-input v-model:value="formState.user.surname" />
      </a-form-item>
      <a-form-item
      name="gender"
      label="Gender"
      has-feedback
      :rules="[{ required: false, message: 'Gender' }]"
    >
      <a-select v-model:value="formState.user.gender" placeholder="Please select gender">
        <a-select-option value="Male">Male</a-select-option>
        <a-select-option value="Female">Female</a-select-option>
      </a-select>
    </a-form-item>
      <a-form-item :name="['user', 'age']" label="Age" :rules="[{ type: 'number', min: 0, max: 99 }]">
        <a-input-number v-model:value="formState.user.age" />
      </a-form-item>
      <a-form-item :name="['user', 'email']" label="Email" :rules="[{ type: 'email' }]">
        <a-input v-model:value="formState.user.email" />
      </a-form-item>
    </a-form>
    <!-- </div>
    </a-modal> -->
  </template>
  <script lang="ts">
  import { defineComponent, reactive } from 'vue';
  
  export default defineComponent({
    props: {
        submitFunction: {
            required: true,
            type:
        }
    },
    setup() {
      const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };
  
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
  
      const formState = reactive({
        user: {
          name: '',
          surname: '',
          age: undefined,
          email: '',
          gender: '',
        },
      });
      const onFinish = (values: any) => {
        console.log('Success:', values);
      };
      return {
        formState,
        onFinish,
        layout,
        validateMessages,
      };
    },
  });
  </script>
  
  