// src/components/organisms/BlogForm.js
import { useState } from "react";
import InputBlog from "../Elements/InputBlog/Index";
import ArticleEditor from "./ArticleEditor";
import FileUpload from "./FileUpload";
import ButtonBlog from "../Elements/ButtonBlog/Index";
import { postBlog } from "../../services/blogAPI";
import { convertToBase64 } from "../../helper/convertImage";

export default function BlogForm() {
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

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

  const handleImageUpload = async (acceptedFiles) => {
    const uploadedImage = acceptedFiles[0];
    const sizeInBytes = uploadedImage.size;
    const sizeInMegabytes = sizeInBytes / (1024 * 1024);
    if (Math.floor(sizeInMegabytes) <= 5) {
      const conv = await convertToBase64(uploadedImage);
      setUploadedImage(conv);
    } else {
      alert(`Gambar harus maximal 5mb!`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploadedImage != null) {
      const data = {
        judul: title,
        artikel: article,
        gambarBlog: uploadedImage,
      };
      postBlog(data, (response) => {
        console.log(response);
      });
      window.location.href = "/blog";
    } else {
      const data = {
        judul: title,
        artikel: article,
      };
      postBlog(data, (response) => {
        console.log(response);
        window.location.href = "/blog";
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
      <InputBlog
        label="Title"
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Enter title"
        required
      />
      <ArticleEditor value={article} onChange={handleArticleChange} />
      <FileUpload onDrop={handleImageUpload} />
      <ButtonBlog type="submit">Create Blog</ButtonBlog>
    </form>
  );
}
