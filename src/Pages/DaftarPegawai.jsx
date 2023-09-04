import { useEffect } from "react";
import FormDaftarPegawai from "../components/Fragments/FormDaftarPegawai";
import AuthLayout from "../components/Layouts/authLayout";
import { Helmet } from "react-helmet-async";

export default function DaftarPegawai() {
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      window.location.href = "/dashboard";
    }
  }, [token]);
  return (
    <>
      <Helmet>
        <title>Daftar Pegawai</title>
      </Helmet>
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <AuthLayout judul="Daftar Pegawai">
          <FormDaftarPegawai />
        </AuthLayout>
      </section>
    </>
  );
}
