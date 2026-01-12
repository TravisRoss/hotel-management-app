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

export async function createEditCabin(cabinData, id = null) {
  const hasImagePath = cabinData?.image?.startsWith?.(supabaseUrl);

  const imageName = `${Date.now()}_${cabinData.image.name}`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? cabinData.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) {
    query = query.insert([{ ...cabinData, image: imagePath }]);
  }

  if (id) {
    query.update({ ...cabinData, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query;

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
