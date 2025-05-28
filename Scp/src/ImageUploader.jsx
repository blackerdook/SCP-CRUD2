// components/ImageUploader.jsx
import React, { useState } from 'react';
import { uploadImageFile, getPublicUrl } from './utils/uploadImage';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://afxcoepxmivdtbyaxisg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmeGNvZXB4bWl2ZHRieWF4aXNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2MDM2NTQsImV4cCI6MjA2MzE3OTY1NH0.ceWnxg92DegLV2El4qFitmz8NcHucCmELyVv-9AWm4c'
);

function ImageUploader({ setImageUrl }) {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("No file selected");
      return;
    }

    setLoading(true);
    try {
      const userId = 'guest'; // static ID for now
      const path = await uploadImageFile(file, supabase, userId);
      const url = getPublicUrl(path, supabase);
      console.log("Image URL:", url);
      setImageUrl(url);
    } catch (error) {
      console.error("Upload failed:", error.message);
      alert("Upload failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {loading && <p>Uploading...</p>}
    </div>
  );
}

export default ImageUploader;
