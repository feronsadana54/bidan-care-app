import { useState } from "react";
import { useEffect } from "react";
import { deleteBlog, getBlog } from "../services/blogAPI";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { Helmet } from "react-helmet-async";

export default function BlogList() {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlog((response) => {
      setBlog(response);
      setLoading(false);
    });
  }, [blog]);

  const handleDelete = (id) => {
    setLoading(true);
    deleteBlog(id);
  };

  return (
    <>
      <Helmet>
        <title>Blog List</title>
      </Helmet>
      <div className="p-3">
        <h1 className="font-semibold text-2xl text-center">Blog List</h1>
        <br />
        <button className="btn btn-info">
          <Link to={"/blogAdd"}>Tambah Data</Link>
        </button>
        <div className="overflow-x-auto h-56">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Penulis</th>
                <th>Judul</th>
                <th>Likes</th>
                <th>Tanggal</th>
                <th colSpan={2} className="text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td>Loading...</td>
                </tr>
              ) : blog.length < 1 ? (
                <tr>
                  <td colSpan={5} className="text-center font-semibold">
                    Data Kosong
                  </td>
                </tr>
              ) : (
                blog &&
                blog.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{++i}</td>
                      <td>{item.penulis}</td>
                      <td>{item.judul}</td>
                      <td>{item.likes}</td>
                      <td>{moment(item.createdAt).format("DD-MM-YYYY")}</td>
                      <td>
                        <button className="btn btn-outline btn-warning">
                          <Link to={`/edit-blog/${item._id}`}>Edit</Link>
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-outline btn-error"
                          onClick={handleDelete.bind(this, item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
