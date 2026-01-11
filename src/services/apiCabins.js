import supabase from "./supabase.js";

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
  const { data, error } = await supabase.from("cabins").insert([cabinData]);

  if (error) {
    console.error("Error creating cabin:", error);
    throw new Error(error.message);
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
