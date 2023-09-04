/* eslint-disable react/prop-types */
export default function RekamMedisIsConfirm(props) {
  const { handler } = props;
  return (
    <>
      {/* card */}
      <div className="hero min-h-screen bg-base-300">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Rekam Medis</h1>
            <p className="py-6">
              Pada saat ini anda belum membuat janji untuk rekam medis. Silahkan
              klik tombol di bawah ini untuk membuat janji
            </p>
            <button className="btn btn-primary" onClick={handler}>
              Go
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
