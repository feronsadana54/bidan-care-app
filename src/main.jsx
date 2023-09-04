import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/Login.jsx";
import Daftar from "./Pages/Daftar";
import DaftarPegawai from "./Pages/DaftarPegawai";
import DaftarUser from "./Pages/DaftarUser";
import Dashboard from "./Pages/Dashboard";
import Navbar from "./components/Layouts/Navbar";
import UserList from "./Pages/UsersList";
import RekamMedis from "./Pages/RekamMedis";
import SubRekamMedisId from "./Pages/SubRekamMedisId";
import EditSubRekamMedis from "./Pages/editSubRekamMedis";
import BlogPage from "./Pages/BlogPage";
// import BlogPageId from "./Pages/BlogPageId";
import BlogList from "./Pages/BlogList";
import BlogEdit from "./Pages/BlogEdit";
import BlogDetail from "./Pages/BlogPageId";
import Profile from "./Pages/Profile";
import jwtDecode from "jwt-decode";
import { HelmetProvider } from "react-helmet-async";

const token = localStorage.getItem("token");
const user = token ? jwtDecode(token) : [];

const router = createBrowserRouter([
  {
    path: "",
    element: <LoginPage />,
    errorElement: <h1>Halaman tidak ditemukan!</h1>,
  },
  { path: "/daftar", element: <Daftar /> },
  { path: "/daftar-pegawai", element: <DaftarPegawai /> },
  { path: "/daftar-user", element: <DaftarUser /> },
  {
    element: <Navbar />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      {
        path: "/userslist",
        element: user.isAdmin ? (
          <UserList />
        ) : (
          <h1>Halaman tidak ditemukan!</h1>
        ),
      },
      {
        path: "/rekam-medis",
        element: <RekamMedis />,
      },
      { path: "/sub-rekam-medis/:id", element: <SubRekamMedisId /> },
      {
        path: "/edit-sub-rekam-medis/:id",
        element: user.isAdmin ? (
          <EditSubRekamMedis />
        ) : (
          <h1>Halaman tidak ditemukan!</h1>
        ),
      },
      {
        path: "/blog",
        element: user.isAdmin ? (
          <BlogList />
        ) : (
          <h1>Halaman tidak ditemukan!</h1>
        ),
      },
      {
        path: "/blogAdd",
        element: user.isAdmin ? (
          <BlogPage />
        ) : (
          <h1>Halaman tidak ditemukan!</h1>
        ),
      },
      { path: "/blog/:id", element: <BlogDetail /> },
      {
        path: "/edit-blog/:id",
        element: user.isAdmin ? (
          <BlogEdit />
        ) : (
          <h1>Halaman tidak ditemukan!</h1>
        ),
      },
      { path: "/profile/:id", element: <Profile /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);
