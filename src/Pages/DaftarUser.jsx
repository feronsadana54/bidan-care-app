import { useEffect } from "react";
import FormUser from "../components/Fragments/FormUser";
import AuthLayout from "../components/Layouts/authLayout";
import { Helmet } from "react-helmet-async";

export default function DaftarUser() {
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      window.location.href = "/dashboard";
    }
  }, [token]);
  return (
    <>
      <Helmet>
        <title>Daftar User</title>
      </Helmet>
      <section className=" bg-gray-50 dark:bg-gray-900">
        <AuthLayout judul="User Register">
          <FormUser />
        </AuthLayout>
      </section>
    </>
  );
}
