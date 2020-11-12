import axios from "axios";
import { parseCookies, destroyCookie } from "nookies";

// For refresh
const signature_exp = "Signature has expired";

// Need logout
const not_enough_seg = "Not enough segments";
const token_rvd = "Token has been revoked";
const signature_failed ="Signature verification failed";
const csrf_not_match = "CSRF double submit tokens do not match";
const invalid_alg = "The specified alg value is not allowed";

const destroyCookieHandler = () => {
  destroyCookie(null, "csrf_access_token");
  destroyCookie(null, "csrf_refresh_token");
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const jsonHeaderHandler = () => {
  let headerConfig = {};
  const cookies = parseCookies();
  const { csrf_access_token } = cookies;
  headerConfig = {
    headers: {
      "X-CSRF-TOKEN": csrf_access_token,
    },
  };

  return headerConfig;
};

export const formHeaderHandler = () => {
  let headerConfig = {};
  const cookies = parseCookies();
  const { csrf_access_token } = cookies;
  headerConfig = {
    headers: {
      "X-CSRF-TOKEN": csrf_access_token,
      "content-type": "multipart/form-data",
    },
  };

  return headerConfig;
};

export const refreshHeader = () => {
  let headerConfig = {};
  const cookies = parseCookies();
  const { csrf_refresh_token } = cookies;
  headerConfig = {
    headers: {
      "X-CSRF-TOKEN": csrf_refresh_token,
    },
  };

  return headerConfig;
};

instance.interceptors.request.use((config) => {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use((response) => {
  return response;
}, async error => {
  const cookies = parseCookies();
  const { csrf_refresh_token } = cookies;

  const { status, data } = error.response;

  /*
   * Section when token is expired 
   * and must be refreshed
   */
  if(status == 422 && data.detail == signature_exp && csrf_refresh_token){
    await instance.post("/users/refresh-token", null, refreshHeader())
      .then((res) => {
        console.log("success refresh => ", res.data)
        return Promise.resolve(error.config);
      })
  }

  /*
   * Section when token is invalid
   * and must be logout
   */
  if(status == 401 && data.detail == token_rvd){
    console.log("deleted from => token_rvd")
    destroyCookieHandler();
  }
  if(status == 401 && data.detail == csrf_not_match){
    console.log("deleted from => csrf_not_match")
    destroyCookieHandler();
  }
  if(status == 422 && data.detail == signature_failed){
    console.log("deleted from => signature_failed")
    destroyCookieHandler();
  }
  if(status == 422 && data.detail == not_enough_seg){
    console.log("deleted from => not_enough_seg")
    destroyCookieHandler();
  }
  if(status == 401 && data.detail == invalid_alg){
    console.log("deleted from => invalid_alg")
    destroyCookieHandler();
  }

  console.log("axios.lib => ", error.response)
  return Promise.reject(error);
});

export default instance;
