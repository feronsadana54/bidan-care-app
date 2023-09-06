/* eslint-disable react/prop-types */
import { FaListUl, FaBookMedical, FaBlogger } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdSupervisedUserCircle } from "react-icons/md";
import Logo from "../../assets/img/BidanCareLogo.png";
import LoginHook from "../../hooks/LoginHook";

export default function Sidebar(props) {
  const { username } = props;
  const user = LoginHook();

  return (
    <>
      {user && (
        <div className="drawer z-10">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label
              htmlFor="my-drawer"
              className="btn drop-shadow-lg w-25 rounded-full drawer-button"
            >
              <FaListUl />
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="menu md:w-80 p-4 w-30 h-full bg-base-200 text-base-content ">
              <div className="w-full flex justify-center">
                <img
                  src={Logo}
                  alt="logo bidan"
                  className="object-cover w-40 md:w-56"
                />
              </div>
              <h3 className="text-center font-bold text-lg m-2 mt-10">
                hallo {username}
              </h3>
              {user.isAdmin && (
                <li className="hover:bg-green-400">
                  <Link to="/userslist">
                    <MdSupervisedUserCircle size={20} /> Users List
                  </Link>
                </li>
              )}
              <li className="hover:bg-green-400">
                <Link to={"/rekam-medis"}>
                  <FaBookMedical size={20} /> Rekam Medis
                </Link>
              </li>
              {user.isAdmin && (
                <li className="hover:bg-green-400">
                  <Link to={"/blog"}>
                    <FaBlogger size={20} /> Blog
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
