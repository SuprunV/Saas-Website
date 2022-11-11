import { IFetchResponse, ResponseTypeEnum } from '@/types/FetchResponse';
import axios from 'axios';
import { ref } from 'vue';

export const useFetching = (asyncFunc: (...params: any) => void) => {
    const isLoading = ref(false);
    const response = ref<any>({});
    const message = ref<IFetchResponse>({
        message: '',
        type: ResponseTypeEnum.NONE,
    });

    const fetchData = async (...params: any): Promise<any> => {
        try {
            isLoading.value = true;
            response.value = await asyncFunc(...params);
            message.value = {
                message: 'Success!',
                type: ResponseTypeEnum.SUCCESS,
            };
        } catch (e: any) {
            message.value = {
                message: e.message,
                type: ResponseTypeEnum.FAIL,
            };
        } finally {
            isLoading.value = false;
            setTimeout(() => {
                message.value = {
                    message: '',
                    type: ResponseTypeEnum.NONE,
                };
            }, 5000);
        }
    };
    return { isLoading, fetchData, response, message };
};
