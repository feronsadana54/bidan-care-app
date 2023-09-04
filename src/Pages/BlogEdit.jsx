import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogId, updateBlog } from "../services/blogAPI";
import InputBlog from "../components/Elements/InputBlog/Index";
import ArticleEditor from "../components/Fragments/ArticleEditor";
import ButtonBlog from "../components/Elements/ButtonBlog/Index";
import { convertToBase64 } from "../helper/convertImage";
import { Helmet } from "react-helmet-async";

export default function BlogEdit() {
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Destructuring id from useParams

  const handleImageValidation = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const images = tempDiv.querySelectorAll("img");

    for (let image of images) {
      const src = image.getAttribute("src");
      if (src.startsWith("data:image/") && src.includes(";base64,")) {
        let base64Content = src.split(";base64,")[1];
        const sizeInBytes = base64Content.length * 0.75;
        const sizeInMegabytes = sizeInBytes / (1024 * 1024);

        if (sizeInMegabytes > 5) {
          alert("Gambar harus maximal 5 MB");
          window.location.reload();
        }
      }
    }
  };

  const handleArticleChange = (content) => {
    handleImageValidation(content);
    setArticle(content);
  };

  const handleUploadImage = async (e) => {
    const path = [...e.target.files][0];
    const sizeInBytes = path.size;
    const sizeInMegabytes = sizeInBytes / (1024 * 1024);
    if (Math.floor(sizeInMegabytes) <= 5) {
      const convert = await convertToBase64(path);
      setUploadedImage(convert);
    } else {
      alert(`Gambar harus maximal 5mb!`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      judul: title,
      artikel: article,
      gambarBlog: uploadedImage,
    };

    updateBlog(id, data, (response) => {
      const data = response;
      window.location.href = "/blog";
    });
  };

  useEffect(() => {
    getBlogId(id, (response) => {
      setLoading(false);
      setTitle(response.data.data.judul);
      setArticle(response.data.data.artikel);
      setUploadedImage(response.data.data.gambarBlog);
    });
  }, [id]);

  if (loading) {
    return <p className="text-center font-semibold text-2xl">Loading...</p>;
  }

  return (
    <>
      <Helmet>
        <title>Blog Edit</title>
      </Helmet>
      <h1 className="font-semibold text-2xl text-center mt-2">Edit Data</h1>
      <div className="container p-3 ">
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <InputBlog
            label="Judul"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
          <ArticleEditor value={article} onChange={handleArticleChange} />
          <div className="mb-4">
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs mb-3"
              name="imageBlog"
              id="imageBlog"
              accept=".jpeg, .png, .jpg"
              onChange={handleUploadImage}
            />
          </div>
          <p className="mb-2">Gambar Sebelumnya</p>
          <img
            src={uploadedImage}
            alt="Gambar upload"
            className="w-20 mb-2 rounded-md"
          />
          <ButtonBlog type="submit">Edit Blog</ButtonBlog>
        </form>
      </div>
    </>
  );
}
