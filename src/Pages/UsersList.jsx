import { useEffect, useState } from "react";
import {
  changeUserAdmin,
  getAllUserAdmin,
  getAllUserNotAdmin,
} from "../services/userAPI";
import LoginHook from "../hooks/LoginHook";
import { Helmet } from "react-helmet-async";

export default function UserList() {
  const [admin, setAdmin] = useState([]);
  const [user, setUser] = useState([]);
  const userData = LoginHook();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUserNotAdmin((response) => {
      setUser(response);
      setLoading(false);
    });
  }, [user]);

  useEffect(() => {
    getAllUserAdmin((response) => {
      setAdmin(response);
      setLoading(false);
    });
  }, [admin]);

  const handlerIsAdmin = (id) => {
    setLoading(true);
    changeUserAdmin(id, (response) => {
      console.log(response);
    });
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>User List</title>
      </Helmet>
      <div className="content-tabel h-56">
        <h1 className="mt-5 ml-5 font-semibold text-xl">Daftar User Admin</h1>
        <div className="overflow-x-auto overscroll-y-auto h-full w-full p-3">
          <table className="table table-zebra h-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Username</th>
                <th>No Identitas</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr className="text-center">
                  <th>Loading...</th>
                </tr>
              ) : admin && admin.length > 0 ? (
                admin.map((item, index) => {
                  if (userData.userId !== item._id) {
                    return (
                      <tr key={item._id}>
                        <th>{++index}</th>
                        <td>{item.nama}</td>
                        <td>{item.email}</td>
                        <td>{item.username}</td>
                        <td>{item.noIdentitas}</td>
                        <td>
                          <button
                            className="btn btn-warning"
                            onClick={handlerIsAdmin.bind(this, item._id)}
                          >
                            Admin
                          </button>
                        </td>
                      </tr>
                    );
                  }
                })
              ) : (
                <tr>
                  <th colSpan="6">Data Admin kosong.</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="content-tabel mt-10 h-44">
        <h1 className="mt-5 ml-5 font-semibold text-xl">Daftar User</h1>
        <div className="overflow-x-auto overscroll-y-auto h-full w-full p-3">
          <table className="table table-zebra h-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Username</th>
                <th>Alamat</th>
                <th>Nomor Telepon</th>
                <th>No Identitas</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr className="text-center">
                  <th>Loading...</th>
                </tr>
              ) : user && user.length > 0 ? (
                user.map((item, index) => {
                  index++;
                  return (
                    <tr key={item._id}>
                      <th>{index}</th>
                      <td>{item.nama}</td>
                      <td>{item.email}</td>
                      <td>{item.username}</td>
                      <td>{item.alamat}</td>
                      <td>{item.nomorHandphone}</td>
                      <td>{item.noIdentitas}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={handlerIsAdmin.bind(this, item._id)}
                        >
                          User
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <th colSpan="8">Data User kosong.</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
