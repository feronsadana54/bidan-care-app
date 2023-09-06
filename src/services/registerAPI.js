import axios from "axios";

export default function registerAPI(value, callback) {
  const url = "/api/users/register";
  const data = axios
    .post(url, value, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      callback(response);
    })
    .catch((error) => {
      callback(error.response.data);
    });

  return data;
}
