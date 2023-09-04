/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { getDataUser } from "../services/loginAPI";

const LoginHook = () => {
  const [user, setUser] = useState({});
  const currentTime = new Date().getTime();
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      if (tokenExpiration && currentTime > parseInt(tokenExpiration, 10)) {
        window.location.reload();
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
      } else {
        setUser(getDataUser(token));
      }
    } else {
      window.location.assign("/");
    }
  }, []);
  return user;
};

export default LoginHook;
