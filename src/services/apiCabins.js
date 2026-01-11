import supabase, { supabaseUrl } from "./supabase.js";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error("Error fetching cabins:", error);
    throw new Error(error.message);
  }

  console.log("Fetched cabins:", data);

  return data ?? [];
}

export async function createCabin(cabinData) {
  const imageName = `${Date.now()}_${cabinData.image.name}`.replaceAll("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabinData, image: imagePath }]);

  if (error) {
    console.error("Error creating cabin:", error);
    throw new Error(error.message);
  }

  // upload image to storage
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabinData.image);

  // delete the cabin if image upload fails
  if (storageError) {
    console.error("Error uploading cabin image:", storageError);
    await supabase.from("cabins").delete().eq("id", data[0].id);
    throw new Error(storageError.message);
  }

  return data;
}

export async function deleteCabin(cabinId) {
  const { error } = await supabase.from("cabins").delete().eq("id", cabinId);

  if (error) {
    console.error("Error deleting cabin:", error);
    throw new Error(error.message);
  }
}
