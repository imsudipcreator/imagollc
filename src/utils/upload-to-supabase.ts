import { supabase } from "@/lib/supabase";

export const uploadToSupabase = async (fileBody: File): Promise<string> => {
  const { data: fileData, error: uploadError } = await supabase.storage
    .from("appsbucket")
    .upload(`public/${fileBody.name}`, fileBody, {
      cacheControl: "3600",
      upsert: true,
    });

  if (uploadError || !fileData) {
    throw new Error("File could not be uploaded to supabase", {
      cause: uploadError,
    });
  }

  const filePath = fileData.path;

  const {
    data: { publicUrl },
  } = supabase.storage.from("appsbucket").getPublicUrl(filePath);

  return publicUrl;
};
