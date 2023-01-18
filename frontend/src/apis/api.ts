import axios, { AxiosRequestConfig, Method } from "axios";
import { API_SERVER } from "../constants";

const http = axios.create({ baseURL: `${API_SERVER}/` });

const request = (method: Method, url: string, options: AxiosRequestConfig) => {

  const accessToken = localStorage.getItem("token");

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

const httpResponseHandler = (response: any) => {
  return response.data;
}

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

const Http = {
  get(url: string, params: any = {}, headers: any = {}) {
    return request("GET", url, { params, headers });
  },
  post(url: string, body: any = {}, headers: any = {}) {
    return request("POST", url, { data: body, headers });
  },
  put(url: string, body: any = {}, headers: any = {}) {
    return request("PUT", url, { data: body, headers });
  },
  patch(url: string, body: any = {}, headers: any = {}) {
    return request("PATCH", url, { data: body, headers });
  },
  delete(url: string, body: any = {}, headers: any = {}) {
    return request("DELETE", url, { data: body, headers });
  },
};

export default Http;
