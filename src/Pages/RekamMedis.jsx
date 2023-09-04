import { useEffect, useState } from "react";
import Alert from "../components/Elements/Alert";
import {
  getDataRekamMedisById,
  requestRekamMedis,
} from "../services/rekamMedis";
import RekamMedisIsConfirm from "../components/Layouts/RekamMedisIsConfirm";
import SubRekamMedisUser from "./SubRekamMedisUser";
import SubRekamMedisAdmin from "./SubRekamMedisAdmin";
import { Helmet } from "react-helmet-async";
import LoginHook from "../hooks/loginHook";

export default function RekamMedis() {
  const user = LoginHook();
  const [isConfirm, setIsConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertClassname, setAlertClassname] = useState("");
  const [message, setMessage] = useState("");
  const [messageTitle, setMessageTitle] = useState("");
  const [idRekamMedis, setIdRekamMedis] = useState("");

  const handlerRekamMedis = () => {
    requestRekamMedis((response) => {
      setTimeout(() => {
        if (response.status !== 201) {
          setMessage(response.data.message);
          setMessageTitle("Error");
          setAlertClassname(
            "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          );
          setAlertVisible(true);
        } else {
          setMessage(response.data.message);
          setMessageTitle("Success");
          setAlertClassname(
            "p-4 mb-4 text-sm text-black rounded-lg bg-green-200 dark:bg-emerald-400 dark:text-white"
          );
          setAlertVisible(true);
        }
      }, 1000);
    });
  };

  if (alertVisible == true) {
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  }

  useEffect(() => {
    getDataRekamMedisById(user.userId, (response) => {
      if (user.isAdmin == false) {
        setIsConfirm(response.data[0].isConfirm);
        setIdRekamMedis(response.data[0]._id);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, [isConfirm, user]);

  return (
    <>
      <Helmet>
        <title>Rekam Medis</title>
      </Helmet>
      <div className="w-full h-screen bg-base-300">
        {alertVisible && (
          <Alert className={alertClassname} title={messageTitle}>
            {message}
          </Alert>
        )}
        {loading == true ? (
          <p>Loading...</p>
        ) : user.isAdmin == true ? (
          <SubRekamMedisAdmin />
        ) : isConfirm == true ? (
          <SubRekamMedisUser id={idRekamMedis} />
        ) : (
          <RekamMedisIsConfirm handler={handlerRekamMedis.bind(this)} />
        )}
      </div>
    </>
  );
}
