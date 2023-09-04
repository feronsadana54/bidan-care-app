/* eslint-disable react/prop-types */

import moment from "moment";

function BlogCard({ blog }) {
  return (
    <div className="card w-80 bg-base-100 shadow-xl h-80 mb-3 mx-2 m-3 md:w-64 lg:w-80">
      <figure>
        <img
          src={blog.gambarBlog}
          className="object-fill h-56 w-full"
          alt={`gambar ${blog.judul}`}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{blog.judul}</h2>
        <p className="text-sm">
          Ditulis oleh <b>{blog.penulis}</b> pada tanggal{" "}
          {moment(blog.createdAt).format("DD-MM-YYYY")}
        </p>
      </div>
    </div>
  );
}

export default BlogCard;
