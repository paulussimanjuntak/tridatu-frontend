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

export const cookieOptions = {
  domain : process.env.NEXT_PUBLIC_DOMAIN,
  path : '/'
}

const destroyCookieHandler = () => {
  destroyCookie(null, "csrf_access_token", cookieOptions);
  destroyCookie(null, "csrf_refresh_token", cookieOptions);
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

const logoutHandler = () => {
  instance.delete("/users/access-revoke", jsonHeaderHandler())
    .then(res => {
      console.log("success-logout-access-revoke ==> ", res.data)
    })
    .catch(err => {
      console.log("error-logout-access-revoke ==> ", err.response)
    })
  instance.delete("/users/refresh-revoke", refreshHeader())
    .then(res => {
      console.log("success-logout-revoke-revoke ==> ", res.data)
    })
    .catch(err => {
      console.log("error-logout-revoke-revoke ==> ", err.response)
    })
  // instance.delete("/users/delete-cookies")
}

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

  const { status, data, config } = error.response;


  /*
   * This section will run if the refresh token has been expired
   * TODO:
   * - access revoke endpoint
   * - access delete cookies endpoint
  */
  if(status == 422 && data.detail == signature_exp && csrf_refresh_token && config.url === "/users/refresh-token"){
    // logoutHandler();
    // destroyCookieHandler()
    instance.delete("/users/delete-cookies")
      .then(res => console.log("SUCCESS DELETE COOKIES => ", res.data))
      .catch(err => console.log("ERROR DELETE COOKIES => ", err.response))

    console.log("token refresh delete / logout ()")
  }


  /*
   * Section when token is expired and must be refreshed
   * DO:
   * - resolve request after token expired
   * - passed in update password
   *
   * TODO:
   * - Check for more condition
   */
  if(status == 422 && data.detail == signature_exp && csrf_refresh_token){
    await instance.post("/users/refresh-token", null, refreshHeader())
      .then((res) => {
        const { csrf_access_token } = parseCookies();
        let needResolve = {
          ...error.config,
          headers: {
            ...error.config.headers,
            "X-CSRF-TOKEN": csrf_access_token,
          },
        }
        console.log("res refresh token => ", res.data)
        return instance.request(needResolve);
      })
  }


  /*
   * Section when token is invalid
   * and must be logout
   */
  if(status == 401 && data.detail == token_rvd){
    console.log("deleted from => token_rvd")
    // destroyCookieHandler();
  }
  if(status == 401 && data.detail == csrf_not_match){
    console.log("deleted from => csrf_not_match")
    // destroyCookieHandler();
  }
  if(status == 422 && data.detail == signature_failed){
    console.log("deleted from => signature_failed")
    // destroyCookieHandler();
  }
  if(status == 422 && data.detail == not_enough_seg){
    console.log("deleted from => not_enough_seg")
    // destroyCookieHandler();
  }
  if(status == 401 && data.detail == invalid_alg){
    console.log("deleted from => invalid_alg")
    // destroyCookieHandler();
  }

  return Promise.reject(error);
});

export default instance;
