import { useEffect } from "react";
import FormLogin from "../components/Fragments/FormLogin";
import AuthLayout from "../components/Layouts/authLayout";
import { Helmet } from "react-helmet-async";

export default function LoginPage() {
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      window.location.href = "/dashboard";
    }
  }, [token]);

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <section className="bg-gray-50 dark:bg-gray-900">
        <AuthLayout judul="Login">
          <FormLogin />
        </AuthLayout>
      </section>
    </>
  );
}
