import { AxiosRequestConfig } from 'axios';

export interface ApiConnectProps extends AxiosRequestConfig {
    token?: boolean;
    serverToken?: string;
}

export interface ApiResponse {
    error: boolean;
    message: string;
    data: any;
}