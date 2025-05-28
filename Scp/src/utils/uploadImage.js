// utils/uploadImage.js
export async function uploadImageFile(file, supabase, userId) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}-${Date.now()}.${fileExt}`;
  const filePath = `images/${fileName}`;

  const { data, error } = await supabase.storage
    .from('buck')
    .upload(filePath, file, { upsert: true });

  if (error) {
    console.error("Upload Error:", error.message);
    throw error;
  }

  console.log("Upload Success:", data);
  return filePath;
}

export function getPublicUrl(path, supabase) {
  const { data } = supabase.storage.from('buck').getPublicUrl(path);
  return data.publicUrl;
}
