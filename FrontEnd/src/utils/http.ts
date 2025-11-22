
import axios from "axios";
import Cookies from 'js-cookie';

interface ConfigType {
  url: string;
  data?: object | null | string;
  headers?: {
    Authorization: string | null | undefined;
  };
}

export const postRequest = async (config: ConfigType) => {
  const {url, data, headers} = config;

  const newHeaders = {...headers};

  if (newHeaders.Authorization === undefined) {
    const cookie = getCookie('jwt')

    newHeaders.Authorization = `Bearer ${cookie}`;
  }

  try {
    const response = await axios.post(url, data, {headers: newHeaders});

    return response.data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    throw new Error(message);
  }
};

export const patchRequest = async (config: ConfigType) => {
  const {url, data, headers} = config;

  const newHeaders = {...headers};

  if (newHeaders.Authorization === undefined) {
    const cookie = await getCookie('jwt')

    newHeaders.Authorization = `Bearer ${cookie}`;
  }

  try {
    const response = await axios.patch(url, data, {headers: newHeaders});

    return response.data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    throw new Error(message);
  }
};

export const getRequest = async (config: ConfigType) => {
  const {url, headers} = config;

  const newHeaders = {...headers};

  if (newHeaders.Authorization === undefined) {
    const cookie = await getCookie('jwt')

    newHeaders.Authorization = `Bearer ${cookie}`;
  }

  try {
    const response = await axios.get(url, {headers: newHeaders});

    if (typeof response.data !== "object") {
      throw new Error("An error has ocurred");
    }

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteRequest = async (config) => {
  const {url, headers} = config;

  const newHeaders = {...headers};

  newHeaders.Authorization = `Bearer ${newHeaders.Authorization}`;

  try {
    const response = await axios.delete(url, {headers: newHeaders});

    if (typeof response.data !== "object") {
      throw new Error("An error has occurred");
    }

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const setCookie = (name: string, value: string, days = 7) => {
  Cookies.set(name, value, { expires: days });
};


export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

export const removeCookie = (name: string) => {
  Cookies.remove(name);
};