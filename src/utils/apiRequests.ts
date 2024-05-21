import axios from "axios";

import { isMicro, MONO_API_URL, MICRO_API_URL } from "./constants";

// These functions aren't exaclty correct and need to be updated to work with the API
export const fetchFromAPI = async (endpoint: string) => {
  console.log(isMicro);
  console.log(process.env.REACT_APP_CN);
  const API_URL = isMicro ? MICRO_API_URL : MONO_API_URL;
  const URL = `${API_URL}/${endpoint}`;
  console.log(URL);
  const { data } = await axios.get(URL, {
    withCredentials: true,
  });
  return data;
};

export const postsToAPI = async (endpoint: string, data: any) => {
  const API_URL = isMicro ? MICRO_API_URL : MONO_API_URL;
  const URL = `${API_URL}/${endpoint}`;
  console.log(URL);
  const { data: post } = await axios.post(URL, data, {
    withCredentials: true,
  });
  return post;
};
