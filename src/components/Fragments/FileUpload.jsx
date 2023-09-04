/* eslint-disable react/prop-types */
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function FileUpload({ onDrop, handler }) {
  const [uploadedFile, setUploadedFile] = useState(null);

  const onDropCallback = useCallback(
    (acceptedFiles) => {
      const uploadedFile = acceptedFiles[0];
      const sizeInBytes = uploadedFile.size;
      const sizeInMegabytes = sizeInBytes / (1024 * 1024);
      if (Math.floor(sizeInMegabytes) <= 5) {
        setUploadedFile(uploadedFile);
      }
      onDrop(acceptedFiles);
    },
    [onDrop]
  );

  const removeUploadedFile = () => {
    setUploadedFile(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
  });

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Image Upload
      </label>
      <div
        {...getRootProps()}
        className={`cursor-pointer border-dashed border-2 ${
          isDragActive ? "border-green-500" : "border-gray-300"
        } p-4 rounded`}
      >
        <p>Maximal size gambar 5mb</p>
        <input
          type="file"
          label="Image"
          name="imageBlog"
          id="imageBlog"
          accept=".jpeg, .png, .jpg"
          {...getInputProps()}
          onChange={(e) => {
            handler(e);
          }}
        />
        {isDragActive ? (
          <p className="text-green-500">Silahkan upload file disini.</p>
        ) : (
          <p>Silahkan upload file disini.</p>
        )}
      </div>
      {uploadedFile && (
        <div className="mt-2">
          <div className="flex items-center justify-between bg-blue-100 p-2 rounded">
            <div className="flex items-center">
              <span className="text-blue-500 mr-2">{uploadedFile.name}</span>
              <button onClick={removeUploadedFile} className="text-red-500">
                Cancel
              </button>
            </div>
            <div>
              {uploadedFile.type.startsWith("image/") && (
                <img
                  src={URL.createObjectURL(uploadedFile)}
                  alt="Uploaded"
                  className="w-10 h-10 object-contain"
                />
              )}
              {uploadedFile.type.startsWith("video/") && (
                <video
                  src={URL.createObjectURL(uploadedFile)}
                  alt="Uploaded"
                  className="w-10 h-10 object-contain"
                  controls
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
