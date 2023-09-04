import axios from "axios";

export const getDataById = (id, callback) => {
  const url = `https://bidan-care-app.cyclic.app/api/users/${id}`;
  axios
    .get(url, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then(function (response) {
      callback(response.data);
    })
    .catch(function (error) {
      callback(error.response.data.message);
    });
};

export async function getAllUserAdmin(callback) {
  const url = "https://bidan-care-app.cyclic.app/api/users/get-user-admin";
  await axios
    .get(url, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then(function (response) {
      callback(response);
    })
    .catch(function (error) {
      console.log(error.response);
    });
}

export async function getAllUserNotAdmin(callback) {
  const url = "https://bidan-care-app.cyclic.app/api/users/get-user-not-admin";
  await axios
    .get(url, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then(function (response) {
      callback(response);
    })
    .catch(function (error) {
      callback(error.response);
    });
}

export async function changeUserAdmin(id) {
  const url = `https://bidan-care-app.cyclic.app/api/users/change-admin/${id}`;
  axios.put(url, null, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
}

export function editUser(id, data, callback) {
  const url = `https://bidan-care-app.cyclic.app/api/users/editUser/${id}`;
  axios
    .put(url, data, {
      headers: { Authorization: localStorage.getItem("token") },
    })
    .then((response) => {
      callback(response);
    })
    .catch((error) => {
      callback(error);
    });
}
