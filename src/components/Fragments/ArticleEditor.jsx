/* eslint-disable react/prop-types */
// src/components/molecules/ArticleEditor.js
import { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function ArticleEditor({ value, onChange }) {
  const quillRef = useRef();

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Article
      </label>
      <p>Maximal size gambar 5mb</p>
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={onChange}
        theme="snow"
        modules={{
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],

              [{ header: 1 }, { header: 2 }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ direction: "rtl" }],

              [{ size: ["small", false, "large", "huge"] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],

              [{ color: [] }, { background: [] }],
              [{ font: [] }],
              [{ align: [] }],
              ["link", "image", "video"],

              ["clean"],
            ],
          },
        }}
      />
    </div>
  );
}
