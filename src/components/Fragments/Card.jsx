export default function Card() {
  return (
    <>
      <div className="card w-80 bg-base-100 shadow-xl h-80 mb-3 mx-2 m-3 md:w-64 lg:w-80">
        <figure>
          <img
            src="/src/assets/img/tiger.jpg"
            className="object-fill h-56 w-full"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            Shoes!
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">Fashion</div>
            <div className="badge badge-outline">Products</div>
          </div>
        </div>
      </div>
    </>
  );
}
