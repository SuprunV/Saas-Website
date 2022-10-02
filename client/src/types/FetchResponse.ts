export interface IFetchResponse {
    message: string;
    type: ResponseTypeEnum;
}

export enum ResponseTypeEnum {
    SUCCESS = 'success',
    WARNING = 'warning',
    FAIL = 'fail',
    NONE = 'none',
}
