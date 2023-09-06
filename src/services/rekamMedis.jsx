import axios from "axios";

export function requestRekamMedis(callback) {
  const url = `https://bidan-care-app.cyclic.app/api/rekam-medis/addRekamMedis`;
  axios
    .post(url, null, {
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

export async function getAllDataNotConfim(callback) {
  try {
    const url = `https://bidan-care-app.cyclic.app/api/rekam-medis/daftar-rm-dikonfirmasi`;
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

export function confirmRekamMedis(id, callback) {
  const url = `https://bidan-care-app.cyclic.app/api/rekam-medis/konfirmasi-rekam-medis/${id}`;
  axios
    .put(url, null, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then(function (response) {
      callback(response.data.message);
    })
    .catch(function (error) {
      callback(error.response.data.message);
    });
}

export async function getDataRekamMedisById(id, callback) {
  try {
    const url = `https://bidan-care-app.cyclic.app/api/rekam-medis/get-rekam-medis/${id}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    callback(response.data);
  } catch (error) {
    callback(error.response);
  }
}

export function getSubRekamMedisById(id, callback) {
  const url = `https://bidan-care-app.cyclic.app/api/sub-rekam-medis/${id}`;
  axios
    .get(url, { headers: { Authorization: localStorage.getItem("token") } })
    .then(function (response) {
      callback(response.data);
      localStorage.setItem("idRM", id);
    })
    .catch(function (error) {
      callback(error.response);
    });
}

export function getRekamMedisAllConfirm(callback) {
  const url = `https://bidan-care-app.cyclic.app/api/rekam-medis/rekamMedisConfirm`;
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
      callback(error.response);
    });
}

export function postSubRekamMedis(id, data, callback) {
  const url = `https://bidan-care-app.cyclic.app/api/sub-rekam-medis/${id}/add-sub-rekam-medis`;

  axios
    .post(url, data, {
      headers: { Authorization: localStorage.getItem("token") },
    })
    .then(function (response) {
      callback(response);
    })
    .catch(function (error) {
      callback(error);
    });
}

export function getSubRekamMedisId(id, callback) {
  const url = `https://bidan-care-app.cyclic.app/api/sub-rekam-medis/sub-rm/${id}`;
  axios
    .get(url, { headers: { Authorization: localStorage.getItem("token") } })
    .then(function (response) {
      callback(response);
    })
    .catch(function (error) {
      callback(error);
    });
}

export function updateSubRekamMedis(id, data, callback) {
  const idRM = localStorage.getItem("idRM");
  const url = `https://bidan-care-app.cyclic.app/api/sub-rekam-medis/${idRM}/edit-sub-rekam-medis/${id}`;
  axios
    .put(url, data, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then(function (response) {
      callback(response.data);
      window.location.pathname(`/sub-rekam-medis/${idRM}`);
      localStorage.removeItem("idRM");
    })
    .catch(function (error) {
      callback(error.response);
    });
}

export function deleteSubRekamMedis(id, callback) {
  const url = `https://bidan-care-app.cyclic.app/api/sub-rekam-medis/hapus/${id}`;
  axios
    .delete(url, {
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
