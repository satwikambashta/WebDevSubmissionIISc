import React, { useState, useRef } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [imageSrc, setImageSrc] = useState("");
  const [originalImageSrc, setOriginalImageSrc] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUploaded, setImageUploaded] = useState(false);

  const fileInputRef = useRef(null);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const resizeImage = (file, maxWidth, maxHeight) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        const canvas = document.createElement("canvas");
        let width = image.width;
        let height = image.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, width, height);

        canvas.toBlob((blob) => {
          resolve(blob);
        }, file.type);
      };
    });
  };

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setOriginalImageSrc(URL.createObjectURL(file));

    const resizedImage = await resizeImage(file, 800, 800);

    const formData = new FormData();
    formData.append("file", resizedImage, file.name);

    const response = await axios.post(
      "http://127.0.0.1:8080/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      }
    );

    if (response.data.filename) {
      setImageSrc(`http://127.0.0.1:8080/images/${response.data.filename}`);
      setImageUploaded(true);
    }
  };

  return (
    <div className="app-container">
      <div className="title">
        <h1>Face Detection with OpenCV</h1>
        <div className="upload-container">
          <input
            type="file"
            className="custom-file-input"
            onChange={uploadImage}
            ref={fileInputRef}
          />
          {!originalImageSrc && (
            <div className="uploadimgfirst">
              <h3>Upload an image </h3>
              <button
                type="button"
                className="custom-file-button"
                onClick={triggerFileInput}
              >
                Upload Image
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="images-container">
        <div className="uploaded-image">
          {imageSrc && <h3>Original Image</h3>}
          {originalImageSrc && <img src={originalImageSrc} alt="Original" />}
          <div className="upload-container">
            <input
              type="file"
              className="custom-file-input"
              onChange={uploadImage}
              ref={fileInputRef}
            />
            {originalImageSrc && (
              <button
                type="button"
                className="custom-file-button"
                onClick={triggerFileInput}
              >
                Upload Image
              </button>
            )}
          </div>
        </div>
        <div className="processed-image">
          {imageSrc && <h3>Processed Image</h3>}
          {imageSrc && <img src={imageSrc} alt="Processed" />}
          {imageSrc && (
            <a href={imageSrc} download="downloaded-image.jpg">
              <button className="custom-file-button">Download Image</button>
            </a>
          )}
        </div>
      </div>

      <div className="footer">
        <p>
          &copy; <a href="https://github.com/satwikambashta">Satwik Saurav</a>{" "}
        </p>
      </div>
    </div>
  );
}

export default App;
