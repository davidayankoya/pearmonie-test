import { API_NETWORK_FAIL, API_URL } from 'constants/constants';
import Notify from './notify';
import openAxios from './axios';
import { setNetworkFail } from 'store/authSlice';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AppStore } from 'store';
import { formatPayload } from './utils';
import ErrorToast from 'common/Error/ErrorToast';

let store: AppStore
export const injectAppStore = (_store: AppStore) => {
    store = _store
}

export const Http = openAxios(API_URL);

export const formatHttpError = ( err: any ) => {
    console.log('api-err', err);
    const response = err.response;
    if (typeof response != 'undefined') {
        const statusCode = response.status;
        const data = {
            error: null,
            statusCode,
        };

        if ([422].includes(statusCode)) {
            data.error = response.data.errors
            Notify.error(ErrorToast({ errors: response.data.errors }));
        } else if ([400].includes(statusCode)) {
            data.error = response.data.message
                ? response.data.message
                : response.statusText;
            Notify.error(response.data.message ?? response.statusText);
        } else if ([401].includes(statusCode)) {
            data.error = response.data.message
                ? (["Invalid token or user not authenticated", "User not authenticated"].includes(response.data.message) ? "Unauthorized" : response.data.message) 
                : response.statusText;
            Notify.error(response.data.message ?? response.statusText);
        } else {
            data.error = response.data.message
                ? response.data.message
                : response.statusText;
            Notify.error(response.data.message ?? response.statusText);
        }
        return data;

    } else if (err.code === API_NETWORK_FAIL) {
        if(!store.getState().auth.networkFail){
            Notify.error('Network Error');
            store.dispatch(setNetworkFail(true));
        }
    }
    const defaultError = { code: err.code, message: err.message }
    return defaultError;
}


export async function getReq<T>(url: string, headers?: AxiosRequestConfig['headers'], config?: AxiosRequestConfig) {
    return new Promise<AxiosResponse<T>>((resolve, reject) => {
        Http.get<any, AxiosResponse<T>>(url, { ...config, headers })
        .then(res => {
            return resolve(res);
        })
        .catch(err => {
            const error = formatHttpError(err);
            return reject(error);
        })
    });
}


export async function postReq<T>(url: string, params: any, headers={ "Content-Type": "application/json" }) {
    return new Promise<AxiosResponse<T>>((resolve, reject) => {
        Http.post<any, AxiosResponse<T>>(url, formatPayload(params), { headers })
        .then(res => {
            return resolve(res);
        })
        .catch(err => {
            const error = formatHttpError(err);
            return reject(error);
        })
    });
}


export async function postReqWithFormdata<T>(
    url: string,
    params: { [k: string]: any },
    headers = { "Content-Type": "multipart/form-data" }
) {
    let formData = new FormData();
    for (const [key, value] of Object.entries(params)) {
        if (
            (value !== '' &&
                value !== 'null' &&
                value !== 'undefined' &&
                value !== null &&
            value !== undefined)
        ) {
            formData.append(`${key}`, value);
        }
    }
    
    return new Promise<AxiosResponse<T>>((resolve, reject) => {
        Http.post<any, AxiosResponse<T>>(url, formData, { headers })
        .then(res => {
            return resolve(res);
        })
        .catch(err => {
            const error = formatHttpError(err);
            return reject(error);
        })
    });
}


export async function patchReq<T>(url: string, params: any) {
    return new Promise<AxiosResponse<T>>((resolve, reject) => {
        Http.patch<any, AxiosResponse<T>>(url, formatPayload(params), {headers: { "Content-Type": "application/json" }})
        .then(res => {
            return resolve(res);
        })
        .catch(err => {
            const error = formatHttpError(err);
            return reject(error);
        })
    });
}


export async function putReq<T>(url: string, params: any) {
    return new Promise<AxiosResponse<T>>((resolve, reject) => {
        Http.put<any, AxiosResponse<T>>(url, formatPayload(params), {headers: { "Content-Type": "application/json" }})
        .then(res => {
            return resolve(res);
        })
        .catch(err => {
            const error = formatHttpError(err);
            return reject(error);
        })
    });
}


export async function deleteReq<T>(url: string) {
    return new Promise<AxiosResponse<T>>((resolve, reject) => {
        Http.delete<any, AxiosResponse<T>>(url, {headers: { "Content-Type": "application/json" }})
        .then(res => {
            return resolve(res);
        })
        .catch(err => {
            const error = formatHttpError(err);
            return reject(error);
        })
    });
}