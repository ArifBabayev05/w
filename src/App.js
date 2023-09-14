import React, { useState, useEffect } from 'react';
import watermarkImage from './watermark.webp'; 
import './App.css'; // Import your CSS file for styling

const App = () => {
  const [images, setImages] = useState([]);
  const [watermarkImageElement, setWatermarkImageElement] = useState(null);

  
  const handleImageUpload = (event) => {
    const uploadedImages = [];

    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const imgDataUrl = e.target.result;
          uploadedImages.push(imgDataUrl);
          if (uploadedImages.length === event.target.files.length) {
            setImages(uploadedImages);
          }
        };

        reader.readAsDataURL(file);
      }
    }
  };

 const addWatermark = (imageDataUrl) => {
  const img = new Image();
  img.src = imageDataUrl;

  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(img, 0, 0);

    if (watermarkImageElement) {
      // Static size for the watermark image (e.g., 250x250 pixels)
      const watermarkWidth = 250;
      const watermarkHeight = 250;

      // Calculate the position to place the watermark on the left-bottom side
      const x = 10; // Adjust left position as needed
      const y = img.height - watermarkHeight - 10; // Adjust bottom position as needed

      // Draw the watermark image with the static size and position
      ctx.drawImage(watermarkImageElement, x, y, watermarkWidth, watermarkHeight);
    }

    // Add borders to the right and left sides with border-radius for a cute appearance
    const borderSize = 5;
    ctx.fillStyle = '#fff'; // Match the background color
    ctx.fillRect(0, 0, borderSize, canvas.height);
    ctx.fillRect(canvas.width - borderSize, 0, borderSize, canvas.height);
    canvas.style.borderRadius = '10px'; // Apply border-radius

    const watermarkedDataUrl = canvas.toDataURL('image/png', 1);

    const a = document.createElement('a');
    a.href = watermarkedDataUrl;
    a.download = 'watermarked_image.jpg';
    a.innerHTML = '<i class="fa fa-download"></i>'; // Download icon
    a.classList.add('instagram-download-button'); // Apply download button style

    const previewSection = document.getElementById('previewSection');
    const instagramPostContainer = document.createElement('div');
    instagramPostContainer.classList.add('instagram-post-container'); // Apply Instagram post container style
    instagramPostContainer.classList.add('mb-2'); // Apply Instagram post container style

    // Example Instagram-like content
    const username = document.createElement('div');
    username.classList.add('instagram-post-username');
    username.textContent = 'mesyacake'; // Instagram username
    instagramPostContainer.appendChild(username);

    const watermarkedImage = new Image();
    watermarkedImage.src = watermarkedDataUrl;
    watermarkedImage.classList.add('instagram-post-image'); // Apply Instagram post image style
    instagramPostContainer.appendChild(watermarkedImage);

    const caption = document.createElement('div');
    caption.classList.add('instagram-post-caption');
    caption.textContent = ''; // Caption
    instagramPostContainer.appendChild(caption);

    // Remove the icons at the bottom and place the download button there
    const downloadContainer = document.createElement('div');
    downloadContainer.classList.add('instagram-download-container');
    downloadContainer.appendChild(a); // Place the download button
    instagramPostContainer.appendChild(downloadContainer);

    const counts = document.createElement('div');
    counts.classList.add('instagram-post-counts');
    counts.textContent = ''; // Like and comment counts
    instagramPostContainer.appendChild(counts);

    // Prepend the Instagram-like post to the top
    previewSection.insertBefore(instagramPostContainer, previewSection.firstChild);
  };
};

  // Load the watermark image when the component mounts
  useEffect(() => {
    const watermarkImg = new Image();
    watermarkImg.src = watermarkImage;
    // watermarkImg.src = "https://i.ibb.co/G9jPtVn/watermark.webp";

    watermarkImg.onload = () => {
      setWatermarkImageElement(watermarkImg);
    };
  }, []);

  // Automatically add watermark when images are uploaded
  useEffect(() => {
    if (images.length > 0) {
      images.forEach((image) => {
        addWatermark(image);
      });
    }
  }, [images]);

  return (
    <div className="instagram-app-container">
    <h1 className="instagram-app-title">@MESYACAKE</h1>
    <input
      type="file"
      accept="image/*"
      multiple
      onChange={handleImageUpload}
      id="fileInput"
      style={{ display: 'none' }}
    />
    <label htmlFor="fileInput" className="instagram-choose-file-button">
      <i className="fa fa-camera"></i> Choose Photo
    </label>
    <div id="previewSection" ></div>
  </div>
  
  );
};

export default App;
