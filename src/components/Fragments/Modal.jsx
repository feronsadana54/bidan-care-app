/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "../Elements/Button";
import Input from "../Elements/Input";
import Textarea from "../Elements/TextArea/Index";

export default function Modal(props) {
  const { name, handler } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (event) => {
    handler(event);
    closeModal(); // Close the modal after submitting
  };

  return (
    <>
      {/* The button to open modal */}
      <label
        htmlFor="my_modal_7"
        className="btn btn-primary m-3"
        onClick={openModal}
      >
        {name}
      </label>

      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      {isModalOpen && ( // Render modal only when isModalOpen is true
        <div className="modal">
          <div className="modal-box">
            <form
              method="dialog"
              className="modal-box h-full w-full"
              onSubmit={handleSubmit}
            >
              <h3 className="font-bold text-lg">Daftar Rekam Medis</h3>
              <div className="py-4">
                <Input name="nama" type="text" placeholder="ex.Fulan...">
                  Nama Petugas
                </Input>
                <Input
                  name="tanggalPemeriksaanSelanjutnya"
                  type="date"
                  placeholder=""
                >
                  Tanggal Pemeriksaan Selanjutnya
                </Input>
                <Textarea placeholder="Masukkan Keterangan" name="keterangan">
                  Keterangan
                </Textarea>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </div>
          <label
            className="modal-backdrop"
            htmlFor="my_modal_7"
            onClick={closeModal}
          >
            Close
          </label>
        </div>
      )}
    </>
  );
}
