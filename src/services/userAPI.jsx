import axios from "axios";

export const getDataById = async (id, callback) => {
  try {
    const url = `/api/users/${id}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    callback(response.data.data);
  } catch (error) {
    console.log(error);
    callback(error.response);
  }
};

export async function getAllUserAdmin(callback) {
  try {
    const url = "/api/users/get-user-admin";
    const response = await axios.get(url, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    callback(response.data.data);
  } catch (error) {
    callback(error.response);
  }
}

export async function getAllUserNotAdmin(callback) {
  try {
    const url = "/api/users/get-user-not-admin";
    const response = await axios.get(url, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    callback(response.data.data);
  } catch (error) {
    callback(error.response);
  }
}

export async function changeUserAdmin(id, callback) {
  try {
    const url = `/api/users/change-admin/${id}`;
    const response = await axios.put(url, null, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    callback(response);
  } catch (error) {
    callback(error.response);
  }
}

export async function editUser(id, data, callback) {
  try {
    const url = `/api/users/editUser/${id}`;
    const response = await axios.put(url, data, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    console.log(response);
    callback(response);
  } catch (error) {
    callback(error.response);
  }
}
