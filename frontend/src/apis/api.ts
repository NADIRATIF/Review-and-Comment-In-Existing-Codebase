import axios, {AxiosRequestConfig, Method} from "axios";
import {API_SERVER} from "../constants";

/**
 * Http instance
 */
const http = axios.create({baseURL: `${API_SERVER}/`});


/**
 * Request interceptor for API calls
 * @param AxiosRequestConfig
 * @param method
 * @param url
 * @param options
 */
const request = (method: Method, url: string, options: AxiosRequestConfig) => {

    /**
     * Get the token from local storage
     */
    const accessToken = localStorage.getItem("token");

    /**
     * Set the headers with the token if present in the local storage
     */
    return http
        .request({
            ...options,
            method,
            url,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(httpResponseHandler)
        .catch(httpErrorHandler)
        .finally(() => {
        });
};

/**
 * Response interceptor for API calls to handle the response
 * @param response
 */
const httpResponseHandler = (response: any) => {
    return response.data;
}

/**
 * Error interceptor for API calls to handle the error
 * @param err
 */
const httpErrorHandler = (err: any) => {
    const response = err?.response;
    if (response?.status === 401) {
        throw {
            message: "Unauthorized"
        };
    }

    const data = response?.data;
    throw {
        message: data?.message || "Network Error!",
    };
}

/**
 * Export the request function
 */
const Http = {
    get(url: string, params: any = {}, headers: any = {}) {
        return request("GET", url, {params, headers});
    },
    post(url: string, body: any = {}, headers: any = {}) {
        return request("POST", url, {data: body, headers});
    },
    put(url: string, body: any = {}, headers: any = {}) {
        return request("PUT", url, {data: body, headers});
    },
    patch(url: string, body: any = {}, headers: any = {}) {
        return request("PATCH", url, {data: body, headers});
    },
    delete(url: string, body: any = {}, headers: any = {}) {
        return request("DELETE", url, {data: body, headers});
    },
};

export default Http;
