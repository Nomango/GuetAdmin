import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000
});

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["X-Token"] = getToken();
    }

    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;

    if (res.code !== 0) {
      Message({
        message: res.message,
        type: "error",
        duration: 3 * 1000
      });

      if (res.code === 401) {
        store.dispatch("user/resetToken").then(() => {
          location.reload();
        });

        return;
      }

      if (res.code === 50012 || res.code === 50014) {
        // MessageBox.confirm(
        //   "You have been logged out, you can cancel to stay on this page, or log in again",
        //   "Confirm logout",
        //   {
        //     confirmButtonText: "Re-Login",
        //     cancelButtonText: "Cancel",
        //     type: "warning"
        //   }
        // )
        store.dispatch("user/resetToken").then(() => {
          location.reload();
        });
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  error => {
    Message({
      message: error.message,
      type: "error",
      duration: 3 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
