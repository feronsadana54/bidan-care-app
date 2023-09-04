import { Helmet } from "react-helmet-async";
import DaftarChoose from "../components/Fragments/DaftarChoose";
import AuthLayout from "../components/Layouts/AuthLayout";

export default function Daftar() {
  return (
    <>
      <Helmet>
        <title>Daftar User</title>
      </Helmet>
      <section className="bg-gray-50 dark:bg-gray-900">
        <AuthLayout judul="Daftar User">
          <DaftarChoose />
        </AuthLayout>
      </section>
    </>
  );
}
