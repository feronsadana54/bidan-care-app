import { useEffect, useState } from "react";
import { getDataUser } from "../services/loginAPI";

const LoginHook = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    const currentTime = new Date().getTime();

    const fetchData = async () => {
      if (token) {
        if (tokenExpiration && currentTime > parseInt(tokenExpiration, 10)) {
          // Token kadaluarsa, hapus token dan tokenExpiration
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");

          // Redirect ke halaman login
          window.location.assign("/");
        } else {
          try {
            const userData = await getDataUser(token);
            setUser(userData);
          } catch (error) {
            // Tangani kesalahan saat mengambil data pengguna
            console.error("Error fetching user data:", error);
          }
        }
      } else {
        // Token tidak ada, arahkan ke halaman login
        window.location.assign("/");
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);
  return isLoading ? null : user;
};

export default LoginHook;
