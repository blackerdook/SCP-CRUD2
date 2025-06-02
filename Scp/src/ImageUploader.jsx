import React, { useState } from 'react';
import { uploadImageFile, getPublicUrl } from './utils/uploadImage';
import { createClient } from '@supabase/supabase-js';

// Supabase client for file uploads
const supabase = createClient(
  'https://afxcoepxmivdtbyaxisg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmeGNvZXB4bWl2ZHRieWF4aXNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2MDM2NTQsImV4cCI6MjA2MzE3OTY1NH0.ceWnxg92DegLV2El4qFitmz8NcHucCmELyVv-9AWm4c'
);

function ImageUploader({ setImageUrl }) {
  const [loading, setLoading] = useState(false);

  // Handle file selection and upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("No file selected");
      return;
    }

    setLoading(true);
    try {
      const userId = 'guest';
      const path = await uploadImageFile(file, supabase, userId); // Upload to Supabase
      const url = getPublicUrl(path, supabase); // Get public URL
      console.log("Image URL:", url);
      setImageUrl(url); // Pass URL to parent
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
