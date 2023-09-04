import { useEffect, useState } from "react";
import { getRekamMedisAllConfirm } from "../services/rekamMedis";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import LoginHook from "../hooks/LoginHook";

export default function SubRekamMedisAdmin() {
  LoginHook();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getRekamMedisAllConfirm((response) => {
      setData(response.data);
      setLoading(false);
    });
  }, [data]);
  return (
    <>
      <Helmet>
        <title>Sub Rekam Medis Admin</title>
      </Helmet>
      <div className="p-5">
        <h1 className="font-semibold text-xl">Daftar Rekam Medis User</h1>
        <div className="overflow-x-auto mt-3 rounded-sm">
          <table className="table table-zebra bg-slate-300">
            {/* head */}
            <thead>
              <tr className="text-center">
                <th></th>
                <th>Nama</th>
                <th>Email</th>
                <th>Nomor Handphone</th>
                <th>Tanggal</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <th colSpan={5} className="text-center">
                    loading...
                  </th>
                </tr>
              ) : (
                data &&
                data.map((item, index) => {
                  index++;
                  let date = new Date(item.tanggal);
                  return (
                    <tr key={item._id} className="text-center">
                      <th>{index}</th>
                      <td>{item.nama}</td>
                      <td>{item.email}</td>
                      <td>{item.nomorHandphone}</td>
                      <td>{moment(date).format("DD/MM/YYYY")}</td>
                      <td>
                        <button className="btn btn-warning">
                          {" "}
                          <Link to={`/sub-rekam-medis/${item._id}`}>
                            Detail
                          </Link>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
