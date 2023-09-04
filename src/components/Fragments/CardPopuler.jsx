export default function CardPopuler() {
  return (
    <>
      <div className="card card-side bg-base-100 shadow-xl h-72 mb-3 md:w-72 lg:w-full lg:content-center md:h-64 md-m-3 p-1">
        <figure>
          <img
            src="/src/assets/img/tiger.jpg"
            className="rounded-xl"
            alt="Movie"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">New movie is released!</h2>
          <p>Click the button to watch on Jetflix app.</p>
        </div>
      </div>
    </>
  );
}
