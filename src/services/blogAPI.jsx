/* eslint-disable no-unused-vars */
import axios from "axios";

export const postBlog = (data, callback) => {
  const url = `/api/blog/`;
  axios
    .post(url, data, {
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
};

export const getBlogId = (id, callback) => {
  const url = `/api/blog/${id}`;
  axios
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
};

export const getBlog = async (callback) => {
  try {
    const url = `/api/blog/`;
    const response = await axios.get(url, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    callback(response.data);
  } catch (error) {
    console.log(error);
    callback(error.response);
  }
};

export const deleteBlog = (id) => {
  const url = `/api/blog/${id}`;
  axios
    .delete(url, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then(function (response) {
      const message = response.data.message;
    })
    .catch(function (error) {
      const message = error;
    });
};

export const updateBlog = (id, data, callback) => {
  const url = `/api/blog/${id}`;
  axios
    .put(url, data, {
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
};

export const getTopBlogs = async (callback) => {
  try {
    const url = `/api/blog/topBlogs`;
    const response = await axios.get(url, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    callback(response);
  } catch (error) {
    callback(error.response);
  }
};

export const addComment = (id, value, callback) => {
  const url = `/api/blog/${id}/comment`;
  axios
    .post(url, value, {
      headers: { Authorization: localStorage.getItem("token") },
    })
    .then((response) => {
      callback(response);
    })
    .catch((error) => {
      callback(error);
    });
};

export const deleteComment = (idBlog, idComment, callback) => {
  const url = `/api/blog/${idBlog}/comment/${idComment}`;
  axios
    .delete(url, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      callback(response);
    })
    .catch((error) => {
      callback(error.response);
    });
};

export const addLike = (id, data, callback) => {
  const url = `/api/blog/${id}/like`;
  axios
    .post(url, data, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      callback(response);
    })
    .catch((error) => {
      callback(error.response);
    });
};
