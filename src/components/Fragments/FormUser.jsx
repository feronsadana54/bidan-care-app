import { Link } from "react-router-dom";
import Button from "../Elements/Button";
import Input from "../Elements/Input";
import { useEffect, useState } from "react";
import Alert from "../Elements/Alert";
import registerAPI from "../../services/registerAPI";

export default function FormUser() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertClassname, setAlertClassname] = useState("");
  const [message, setMessage] = useState("");
  const [messageTitle, setMessageTitle] = useState("");

  const handlerSubmit = (event) => {
    event.preventDefault();
    const data = {
      nama: event.target.nama.value,
      username: event.target.username.value,
      email: event.target.email.value,
      alamat: event.target.alamat.value,
      nomorHandphone: event.target.nomorHandphone.value,
      tanggalLahir: event.target.tanggalLahir.value,
      noIdentitas: parseInt(event.target.noIdentitas.value),
      password: event.target.password.value,
      confirmPassword: event.target.confirmPassword.value,
    };

    if (data.password !== data.confirmPassword) {
      setMessage("Password tidak sama! harap isi dengan benar.");
      setMessageTitle("Gagal");
      setAlertClassname(
        "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      );
      setAlertVisible(true);
    } else {
      registerAPI(data, (response) => {
        if (response.status == 201) {
          window.location.href = "/";
        } else {
          setAlertVisible(true);
          setMessageTitle("Failed");
          setMessage(response.message);
          setAlertClassname(
            "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          );
        }
      });
    }
  };

  useEffect(() => {
    if (alertVisible == true) {
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    }
  }, [alertVisible]);

  return (
    <>
      {alertVisible && (
        <Alert className={alertClassname} title={messageTitle}>
          {message}
        </Alert>
      )}

      <form className="space-y-4 md:space-y-6" onSubmit={handlerSubmit}>
        <Input name="nama" type="text" placeholder="Lorem Ipsum">
          Nama Lengkap
        </Input>
        <Input name="email" type="text" placeholder="lorem@example.com">
          Email
        </Input>
        <Input name="username" type="text" placeholder="loremipsum123">
          Username
        </Input>
        <Input name="alamat" type="text" placeholder="ex.jalan lorem">
          Alamat
        </Input>
        <Input name="nomorHandphone" type="text" placeholder="ex.08123456">
          Nomor Handphone
        </Input>
        <Input name="tanggalLahir" type="date" placeholder="">
          Tanggal Lahir
        </Input>
        <Input name="noIdentitas" type="text" placeholder="ex.432156567">
          No KTP{" "}
        </Input>
        <Input name="password" type="password" placeholder="******">
          Password
        </Input>
        <Input name="confirmPassword" type="password" placeholder="******">
          Confrim Password
        </Input>
        <Button>Daftar</Button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          sudah punya akun?{" "}
          <Link
            to={"/"}
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Login
          </Link>
        </p>
      </form>
    </>
  );
}
