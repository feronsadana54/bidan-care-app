import { useParams } from "react-router-dom";
import LoginHook from "../hooks/LoginHook";
import { useEffect, useState } from "react";
import { editUser, getDataById } from "../services/userAPI";
import { convertToBase64 } from "../helper/convertImage";
import { Helmet } from "react-helmet-async";

export default function EditProfile() {
  LoginHook();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [alamat, setAlamat] = useState("");
  const [nomorHandphone, setNomorHandphone] = useState("");
  const [noIdentitas, setNoIdentitas] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    getDataById(id, (response) => {
      setUser(response);
      setNama(response.nama);
      setEmail(response.email);
      setUsername(response.username);
      setTanggalLahir(response.tanggalLahir || "");
      setAlamat(response.alamat || "");
      setNomorHandphone(response.nomorHandphone || "");
      setNoIdentitas(response.noIdentitas || "");
      setUploadedImage(response.fotoProfil);
      setLoading(false);
    });
  }, [id]);

  const handleUploadImage = async (e) => {
    const path = [...e.target.files][0];
    const sizeInBytes = path.size;
    const sizeInMegabytes = sizeInBytes / (1024 * 1024);
    if (Math.floor(sizeInMegabytes) <= 5) {
      const convert = await convertToBase64(path);
      await setUploadedImage(convert);
    } else {
      alert(`Gambar harus maximal 5mb!`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      nama,
      email,
      username,
      tanggalLahir,
      alamat,
      nomorHandphone,
      noIdentitas,
      fotoProfil: uploadedImage,
    };
    editUser(id, data, (response) => {
      console.log(response);
      window.location.href = "/dashboard";
    });
  };

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="container mx-auto flex justify-center h-full">
        <div className="w-full max-w-xs p-4">
          <h1 className="font-semibold text-xl text-center mb-6">
            Edit Profile
          </h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={handleSubmit.bind(this)} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    <b>Nama</b>
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    <b>Email</b>
                  </span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full max-w-xs"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    <b>Username</b>
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {!user.isAdmin && (
                <>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        <b>Tanggal Lahir</b>
                      </span>
                    </label>
                    <input
                      type="date"
                      className="input input-bordered w-full max-w-xs"
                      value={tanggalLahir}
                      onChange={(e) => setTanggalLahir(e.target.value)}
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        <b>Alamat</b>
                      </span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                      value={alamat}
                      onChange={(e) => setAlamat(e.target.value)}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        <b>Nomor Handphone</b>
                      </span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                      value={nomorHandphone}
                      onChange={(e) => setNomorHandphone(e.target.value)}
                    />
                  </div>
                </>
              )}

              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    <b>Nomor Identitas</b>
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={noIdentitas}
                  onChange={(e) => setNoIdentitas(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs mb-3"
                  name="fotoProfil"
                  id="fotoProfil"
                  accept=".jpeg, .png, .jpg"
                  onChange={handleUploadImage}
                />
              </div>
              <p className="mb-2">Gambar Sebelumnya</p>
              <img
                src={
                  uploadedImage === ""
                    ? `/src/assets/img/user.png`
                    : uploadedImage
                }
                alt="Gambar upload"
                className="w-20 mb-2 rounded-md"
              />
              <button
                type="submit"
                className="btn btn-primary w-full max-w-xs mx-auto"
              >
                Simpan
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
