import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  deleteSubRekamMedis,
  getSubRekamMedisById,
  postSubRekamMedis,
} from "../services/rekamMedis";
import Modal from "../components/Fragments/Modal";
import moment from "moment/moment";
import LoginHook from "../hooks/LoginHook";
import { Helmet } from "react-helmet-async";

export default function SubRekamMedisId() {
  LoginHook();
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlerSubmit = (event) => {
    setLoading(true);
    const data = {
      tanggalPemeriksaanSelanjutnya:
        event.target.tanggalPemeriksaanSelanjutnya.value,
      nama: event.target.nama.value,
      keterangan: event.target.keterangan.value,
    };
    postSubRekamMedis(id, data, (response) => {
      alert(response.data.message);
      setLoading(false);
    });
  };

  useEffect(() => {
    getSubRekamMedisById(id, (response) => {
      if (Array.isArray(response.data)) {
        setStatus(response.message);
        setData(response.data);
        setLoading(false);
      }
    });
  }, [data, id, status]);

  const handlerClik = (event) => {
    setLoading(true);
    const idSBM = event;
    deleteSubRekamMedis(idSBM, (response) => {
      alert(response.data.message);
      setLoading(false);
    });
  };

  return (
    <>
      <Helmet>
        <title>Sub Rekam Medis Pasien</title>
      </Helmet>
      <div className="content p-5">
        <h1 className="font-semibold text-xl text-center">
          Riwayat Rekam Medis Pasien{" "}
        </h1>
      </div>
      {loading ? (
        <span className="loading loading-dots loading-lg"></span>
      ) : (
        <div className="overflow-x-auto p-2">
          <Modal name="Tambah Data" handler={handlerSubmit.bind(this)} />
          <table className="table table-zebra bg-slate-300">
            <thead>
              <tr className="text-center">
                <th></th>
                <th>Nama Petugas</th>
                <th>Tanggal Selanjutnya</th>
                <th>Keterangan</th>
                <th colSpan={2}>Aksi</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {data.length <= 0 ? (
                <tr className="text-center">
                  <th colSpan={4}>Data Kosong</th>
                </tr>
              ) : (
                data.map((item, index) => {
                  index++;
                  return (
                    <tr key={item._id}>
                      <th>{index}</th>
                      <td>{item.nama}</td>
                      <td>
                        {moment(item.tanggalPemeriksaanSelanjutnya).format(
                          "DD-MM-YYYY"
                        )}
                      </td>
                      <td>{item.keterangan}</td>
                      <td>
                        <button className="btn btn-info btn-sm">
                          <Link to={`/edit-sub-rekam-medis/${item._id}`}>
                            Edit
                          </Link>
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-error btn-sm"
                          id="delete"
                          onClick={handlerClik.bind(this, item._id)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
