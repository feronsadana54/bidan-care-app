import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import {
  getSubRekamMedisId,
  updateSubRekamMedis,
} from "../services/rekamMedis";
import InputEdit from "../components/Elements/InputEdit";
import TextareaEdit from "../components/Elements/TextAreaEdit/Index";
import { Helmet } from "react-helmet-async";

export default function EditSubRekamMedis() {
  const { id } = useParams();
  const [nama, setNama] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [tanggalPemeriksaanSelanjutnya, setTanggalPemeriksaanSelanjutnya] =
    useState(new Date());

  useEffect(() => {
    // Mengambil data sub rekam medis berdasarkan id
    getSubRekamMedisId(id, (response) => {
      setNama(response.data.data.nama);
      setKeterangan(response.data.data.keterangan);
      setTanggalPemeriksaanSelanjutnya(
        new Date(response.data.data.tanggalPemeriksaanSelanjutnya)
      );
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      nama: nama,
      keterangan: keterangan,
      tanggalPemeriksaanSelanjutnya: tanggalPemeriksaanSelanjutnya,
    };
    updateSubRekamMedis(id, updatedData, (response) => {
      // Handle response or redirection after successful update
      console.log(response);
      window.location.href = `/sub-rekam-medis/${localStorage.getItem("idRM")}`;
    });
  };

  return (
    <>
      <Helmet>
        <title>Edit Sub Rekam Medis</title>
      </Helmet>
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Edit Sub Rekam Medis</h1>
        <form onSubmit={handleSubmit}>
          <InputEdit
            name="nama"
            type="text"
            placeholder="Nama Petugas"
            value={nama}
            setHandler={setNama}
          >
            Nama Petugas
          </InputEdit>
          <TextareaEdit
            placeholder="Masukkan Keterangan"
            name="keterangan"
            value={keterangan}
            setHandler={setKeterangan}
          >
            Keterangan
          </TextareaEdit>
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </>
  );
}
