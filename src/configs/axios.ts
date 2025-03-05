import axios from "axios";
import { toast } from "react-toastify";

export const requestAuth = axios.create({
  timeout: 26405,
  headers: {
    "Content-Type": "application/json",
  },
});

const middlewareRequest = async (config: any) => {
  // const tokenAccess = getCmsToken()

  const baseHeaders = {
    "Accept-Language": "vi",
  };

  return {
    ...config,
    headers: {
      ...config.headers,
      ...baseHeaders,
      //  Authorization: `Bearer ${tokenAccess?.accessToken}`,
    },
  };
};

let isRefreshing = false;
let refreshSubscribers: any = [];

const middlewareResponseError = async (error: any) => {
  const { config, response } = error;
  const originalRequest = config;

  const status = response?.status;

  if (!status || status === 500 || status === 503 || status === 400) {
    //window.location.replace('/500')
  }

  if (
    status === 401 &&
    !config.url.includes("/oauth") &&
    !originalRequest._retry
  ) {
    if (!isRefreshing) {
      isRefreshing = true;
      //   const tokenAccess = getCmsToken()

      //   if (tokenAccess?.refreshToken && tokenAccess?.orgId) {
      //     postRefreshToken(tokenAccess.refreshToken, tokenAccess.orgId)
      //       .then((res) => {
      //         isRefreshing = false
      //         if (res?.data?.accessToken) {
      //           setCmsToken(res.data)
      //         }
      //         refreshSubscribers.map((su: any) => {
      //           su(res.data.accessToken)
      //         })
      //       })
      //       .catch((e) => {
      //         console.log('e', e)
      //         logoutAccount()
      //       })
      //   }
    }

    return new Promise((resolve, _) => {
      refreshSubscribers.push((accessToken: string) => {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        resolve(axios(originalRequest));
      });
    });
  } else if (status === 403) {
    toast.error("Bạn không có quyền thực hiện tính năng này.");
  }

  return Promise.reject(error);
};

requestAuth.interceptors.request.use(middlewareRequest, (error) =>
  Promise.reject(error)
);

requestAuth.interceptors.response.use((res) => {
  const { data } = res;

  if (!!data?.errorCodes) return Promise.reject(data?.errorCodes);

  return res;
}, middlewareResponseError);
