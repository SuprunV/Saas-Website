import axios, { AxiosInstance, AxiosStatic } from 'axios';
import { LocalStorageItemEnum } from './types/LocalStorageItemEnum';

export let $baseUrl = '';

export let $host: AxiosInstance = axios;
export let $authHost: AxiosInstance = axios;

export function setApiUrl(host: any) {
    $baseUrl = host;
    setHostAxios();
}

export function setHostAxios() {
    $host = axios.create({
        baseURL: $baseUrl,
    });

    $authHost = axios.create({
        baseURL: $baseUrl,
    });

    const authInterceptor = (config: any) => {
        if (config.headers) {
            config.headers.authorization = `Bearer ${localStorage.getItem(
                LocalStorageItemEnum.token,
            )}`;
        }
        return config;
    };

    $authHost.interceptors.request.use(authInterceptor);
}
