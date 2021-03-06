import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  AxiosError,
  HeadersDefaults,
} from "axios";
import { BACKEND_URL } from "../config/index";

interface CommonHeaderProperties extends HeadersDefaults {
  "Content-type": string;
  Authorization: string;
}

// axios 객체 생성
export const userInstance = () => {
  const instance = axios.create({
    baseURL: BACKEND_URL,
    headers: {
      "Content-type": "application/json",
    },
  });

  // 요청 인터셉터 추가
  instance.interceptors.request.use(
    // 요청을 보내기 전 수행해야 할 일
    (config: AxiosRequestConfig) => {
      // 모든 요청에 헤더 토큰 추가
      const Authorization = localStorage.getItem("Authorization");
      const Refresh = localStorage.getItem("RefreshToken");
      if (Authorization) {
        const header = config.headers as AxiosRequestHeaders;
        header.Authorization = Authorization;
        header.Refresh = Refresh as string;
      }

      return config;
    },
    // 오류 요청을 보내기 전 수행해야 할 일
    (error) => {
      return Promise.reject(error);
    }
  );
  // 응답 인터셉터 추가
  instance.interceptors.response.use(
    // 응답 데이터를 가공
    (response: AxiosResponse) => {
      //   console.dir(response);
      //   console.log(response.data.message);

      if (
        response.data &&
        response.data.message &&
        response.data.message === "사용자 로그인 성공"
      ) {
        const Authorization = response.headers.authorization;
        const RefreshToken = response.headers.refresh;
        if (Authorization) localStorage.setItem("Authorization", Authorization);
        if (RefreshToken) localStorage.setItem("RefreshToken", RefreshToken);
      }
      return response;
    },

    // 오류 응답 처리
    (error: AxiosError) => {
      if (error.response) {
        // console.log(error.response.status);
      } else if (error.request) {
        // console.log(error.request);
      } else {
        // console.log(`Error ${error.message}`);
      }
      //   Promise.reject(error);
    }
  );
  return instance;
};

const userApi = userInstance();
// setInterval(() => getRefresh(), 3000);

// axios 객체 생성
export const apiInstance = () => {
  const instance = axios.create({
    baseURL: BACKEND_URL,
    headers: {
      "Content-type": "application/json",
    },
  });

  // 요청 인터셉터 추가
  instance.interceptors.request.use(
    // 요청을 보내기 전 수행해야 할 일
    (config: AxiosRequestConfig) => {
      // 모든 요청에 헤더 토큰 추가
      const Authorization = localStorage.getItem("Authorization");
      if (Authorization) {
        const header = config.headers as AxiosRequestHeaders;
        header.Authorization = Authorization;
      }

      return config;
    },
    // 오류 요청을 보내기 전 수행해야 할 일
    (error) => {
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터 추가
  instance.interceptors.response.use(
    // 응답 데이터를 가공
    (response: AxiosResponse) => {
      return response;
    },

    // 오류 응답 처리
    (error: AxiosError) => {
      if (error.response) {
        // console.log(error.response.status);
        // console.log(error.response.data);
        if (error.response.status === 401) {
          localStorage.removeItem("code");
          localStorage.removeItem("Authorization");
          localStorage.removeItem("RefreshToken");
        //   window.location.href = "/";
        }
      } else if (error.request) {
        // console.log(error.request);
      } else {
        // console.log(`Error ${error.message}`);
      }
      //   Promise.reject(error);
    }
  );
  return instance;
};
