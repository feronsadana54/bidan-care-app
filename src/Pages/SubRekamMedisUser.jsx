import { useEffect, useState } from "react";
import { getSubRekamMedisById } from "../services/rekamMedis";
import moment from "moment";
import { Helmet } from "react-helmet-async";

/* eslint-disable react/prop-types */
export default function SubRekamMedisUser(props) {
  const { id } = props;
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    getSubRekamMedisById(id, (response) => {
      setData(response.data);
      setMessage(response.message);
    });
  }, [data, id, message]);

  return (
    <>
      <Helmet>
        <title>Sub Rekam Medis User</title>
      </Helmet>
      <div className="p-5">
        <h1 className="font-semibold text-xl">Daftar Riwayat Medis</h1>
        <div className="overflow-x-auto mt-5 rounded-sm">
          <table className="table table-zebra bg-slate-300">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Tanggal Pemeriksaan</th>
                <th>Nama Pemeriksa</th>
                <th>Keterangan</th>
                <th>Tanggal Pemeriksaan Selanjutnya</th>
              </tr>
            </thead>
            <tbody>
              {data <= 0 ? (
                <tr>
                  <th className="text-center" colSpan={5}>
                    Data Kosong
                  </th>
                </tr>
              ) : (
                //   /* row 1 */
                data.map((item, index) => {
                  index++;
                  return (
                    <tr key={item._id}>
                      <th>{index}</th>
                      <td>
                        {moment(item.tanggalPemeriksaan).format("DD-MM-YYYY")}
                      </td>
                      <td>{item.nama}</td>
                      <td>{item.keterangan}</td>
                      <td>
                        {moment(item.tanggalPemeriksaanSelanjutnya).format(
                          "DD-MM-YYYY"
                        )}
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
