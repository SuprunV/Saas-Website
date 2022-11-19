import axios from 'axios';

export let $baseUrl = '';

export let $host = axios;
export let $authHost = axios;

export function setApiUrl(host) {
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

    const authInterceptor = (config) => {
        if (config.headers) {
            config.headers.authorization = `Bearer ${localStorage.getItem(
                LocalStorageItemEnum.token,
            )}`;
        }
        return config;
    };

    $authHost.interceptors.request.use(authInterceptor);
}
