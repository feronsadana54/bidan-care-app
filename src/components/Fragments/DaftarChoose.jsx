import { Link } from "react-router-dom";

export default function DaftarChoose() {
  return (
    <>
      <div className="flex flex-col">
        <div className="py-5">
          <h3 className="py-5">Jika anda pegawai. silahkan klik dibawah ini</h3>
          <Link
            to={"/daftar-pegawai"}
            className="mt-3 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Daftar
          </Link>
        </div>
        <div className="">
          <h3 className="py-5">
            Jika anda pengguna. silahkan klik dibawah ini
          </h3>
          <Link
            to={"/daftar-user"}
            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
          >
            Daftar
          </Link>
        </div>
      </div>
    </>
  );
}
