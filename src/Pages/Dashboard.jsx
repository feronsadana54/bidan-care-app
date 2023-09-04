import { useEffect, useState } from "react";
import { getBlog, getTopBlogs } from "../services/blogAPI";
import { Link } from "react-router-dom";
import moment from "moment";
import LoginHook from "../hooks/LoginHook";
import { Helmet } from "react-helmet-async";

export default function Dashboard() {
  LoginHook();
  const [topBlog, setTopBlog] = useState([]);
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopBlogs((response) => {
      if (Array.isArray(response.data)) {
        setTopBlog(response.data);
      } else {
        setTopBlog([]);
      }
    });
    getBlog((response) => {
      if (Array.isArray(response)) {
        setBlog(response);
      }
      setLoading(false);
    });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Hitung total halaman setelah data blog tersedia
  const totalPages = Math.ceil(blog.length / itemsPerPage);

  const currentBlogPage = blog.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className="h-screen p-3">
        <div className="artikel-populer md:flex md:justify-end mt-3 mb-3">
          <h2 className="ml-3 mt-3 text-lg font-bold text-center md:text-2xl md:p-2 md:justify-start">
            Artikel Populer
          </h2>
          <div className="card-populer p-4 overflow-auto h-56 md:w-72 lg:w-3/5 lg:h-72 m-3">
            {loading ? (
              <p>Loading...</p>
            ) : topBlog.length === 0 ? (
              <p className="text-xl font-semibold">Data Kosong.</p>
            ) : (
              topBlog.map((item, index) => {
                return (
                  <Link to={`/blog/${item._id}`} key={index}>
                    <div className="card card-side bg-base-100 shadow-xl h-72 mb-3 md:w-72 lg:w-full lg:content-center md:h-64 md-m-3 p-1">
                      <figure>
                        <img
                          src={item.gambarBlog}
                          className="rounded-xl"
                          alt={`Blog ${item}`}
                        />
                      </figure>
                      <div className="card-body">
                        <h2 className="card-title">{item.judul}</h2>
                        <p className="text-sm">
                          Ditulis oleh <b>{item.penulis}</b> pada tanggal{" "}
                          {moment(item.createdAt).format("DD-MM-YYYY")}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
        <div className="h-full">
          <p className="font-bold text-lg md:text-3xl text-center">
            Daftar Artikel
          </p>
          <div className="flex flex-col h-full md:grid md:grid-cols-3 lg:grid-rows-2 overflow-y-auto items-center md:justify-items-center mt-2">
            {loading ? (
              <p>Loading...</p>
            ) : blog.length === 0 ? (
              <p className="text-xl font-semibold">Data Kosong.</p>
            ) : (
              currentBlogPage.map((item, index) => {
                return (
                  <Link key={index} to={`/blog/${item._id}`}>
                    <div className="card w-80 bg-base-100 shadow-xl h-80 mb-3 mx-2 m-3 md:w-64 lg:w-80">
                      <figure>
                        <img
                          src={item.gambarBlog}
                          className="object-fill h-56 w-full"
                          alt={`gambar ${item.judul}`}
                        />
                      </figure>
                      <div className="card-body">
                        <h2 className="card-title">{item.judul}</h2>
                        <p className="text-sm">
                          Ditulis pada tanggal{" "}
                          {moment(item.createdAt).format("DD-MM-YYYY")}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
          <div className="flex justify-center">
            {currentPage > 1 && (
              <button
                onClick={handlePrevPage}
                className="mr-2 bg-gray-300 px-3 py-1 rounded-md my-3"
              >
                Prev
              </button>
            )}
            {totalPages > 1 && currentPage < totalPages && (
              <button
                onClick={handleNextPage}
                className="bg-gray-300 px-3 py-1 rounded-md my-3"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
