import { useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [imageSrc, setImageSrc] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const resizeImage = (file, maxWidth, maxHeight) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        const canvas = document.createElement('canvas');
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
        const ctx = canvas.getContext('2d');
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

    const resizedImage = await resizeImage(file, 800, 800);

    const formData = new FormData();
    formData.append('file', resizedImage, file.name);

    const response = await axios.post("http://127.0.0.1:8080/api/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percentCompleted);
      }
    });

    if (response.data.filename) {
      setImageSrc(`http://127.0.0.1:8080/images/${response.data.filename}`);
    }
  };

  return (
    <div className="app-container">
      <div>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${uploadProgress}%` }}></div>
        </div>
      </div>
      <h1>Upload and Display Image</h1>
      <div className="upload-container">
        <input type="file" onChange={uploadImage} />
        {imageSrc && <img src={imageSrc} alt="Uploaded" />}
        {imageSrc && <a href={imageSrc} download="downloaded-image.jpg"><button>Download Image</button></a>}
      </div>
    </div>
  );

}

export default App;
