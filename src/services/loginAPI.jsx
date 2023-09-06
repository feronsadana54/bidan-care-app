/* eslint-disable no-undef */
import axios from "axios";
import jwtDecode from "jwt-decode";

export const loginAPI = (data, callback) => {
  const url = `/api/users/login`;
  axios
    .post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(function (response) {
      const tokenExpiryInSeconds = 3600;
      const expirationTime = new Date().getTime() + tokenExpiryInSeconds * 1000;
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("tokenExpiration", expirationTime);
      window.location.href = "/dashboard";
    })
    .catch(function (error) {
      callback(error.response.data.message);
    });
};

export const getDataUser = (token) => {
  const decoded = jwtDecode(token);
  return decoded;
};
