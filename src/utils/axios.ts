/* eslint-disable no-console */
import axios from "axios";


function openAxios(baseURL: string) {
    const newAxios = axios.create({
        baseURL,
        headers: {
            common: {
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
            },
        },
    })
    newAxios.interceptors.response.use(
        response => response,
        error => {
            return Promise.reject(error)
        }
    );
    return newAxios
};

export default openAxios
