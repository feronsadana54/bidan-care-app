import { Link, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import {
  confirmRekamMedis,
  getAllDataNotConfim,
} from "../../services/rekamMedis";

import { createHashHistory } from "history";
import LoginHook from "../../hooks/LoginHook";
import { getDataById } from "../../services/userAPI";

export default function Navbar() {
  const history = createHashHistory();
  const user = LoginHook();
  const [dataNotif, setDataNotif] = useState([]);
  const [fotoProfile, setProfile] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllDataNotConfim((response) => {
      if (Array.isArray(response)) {
        setDataNotif(response);
      } else {
        setDataNotif([]);
      }
    });
  }, [dataNotif, fotoProfile]);

  useEffect(() => {
    if (user.userId) {
      getDataById(user.userId, (response) => {
        setProfile(response.data.fotoProfil);
        setLoading(false);
      });
    }
  }, [user.userId]);

  let handlerConfirm = (id) => {
    confirmRekamMedis(id, (response) => {
      alert(response);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    window.location.reload();
    history.push("/");
  };

  return (
    <>
      <div className="flex navbar bg-base-200 w-screen">
        <div className="navbar-start">
          <Sidebar username={user.username} />
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost" href="/dashboard">
            <img
              src="/src/assets/img/BidanCarelogo.png"
              alt="logo"
              className="h-12 w-48"
            />
          </a>
        </div>
        <div className="navbar-end">
          {user.isAdmin && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">
                    {dataNotif.length}
                  </span>
                </div>
              </label>
              <div
                tabIndex={0}
                className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
              >
                <div className="card-body w-full overflow-auto h-44">
                  {dataNotif.length <= 0 ? (
                    <p className="text-center font-semibold text-lg">
                      Notifikasi Kosong
                    </p>
                  ) : (
                    dataNotif.map((item, index) => {
                      index++;
                      return (
                        <ul key={index}>
                          <span className="font-bold text-lg">
                            Anda memiliki permintaan rekam medis dari{" "}
                            {item.nama}
                          </span>
                          <div className="card-actions">
                            <button
                              className="btn btn-primary btn-block"
                              onClick={() => handlerConfirm(item._id)}
                            >
                              Confirm
                            </button>
                          </div>
                        </ul>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {loading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : user.fotoProfil == "" ? (
                  <img src="/src/assets/img/user.png" />
                ) : (
                  <img src={fotoProfile} />
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <Link to={`/profile/${user.userId}`}>
                <li>
                  <p className="justify-between">Profile</p>
                </li>
              </Link>
              <li onClick={handleLogout}>
                <p>Logout</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
