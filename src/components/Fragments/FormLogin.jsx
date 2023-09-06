import { useEffect, useState } from "react";
import Button from "../Elements/Button";
import Input from "../Elements/Input";
import { Link } from "react-router-dom";
import Alert from "../Elements/Alert";
import { loginAPI } from "../../services/loginAPI";

export default function FormLogin() {
  const [message, setMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertClassname, setAlertClassname] = useState("");
  const [messageTitle, setMessageTitle] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    loginAPI(value, (response) => {
      console.log(response);
      if (response.status !== 200) {
        setAlertVisible(true);
        setMessageTitle("Failed");
        setMessage(response);
        setAlertClassname(
          "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        );
      }
    });
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
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit.bind(this)}
      >
        <Input name="username" type="text" placeholder="example@email.com">
          Username
        </Input>
        <Input name="password" type="password" placeholder="*****">
          Password
        </Input>
        <Button>Submit</Button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Tidak punya akun?{" "}
          <Link
            to={"/daftar"}
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Daftar
          </Link>
        </p>
      </form>
    </>
  );
}
