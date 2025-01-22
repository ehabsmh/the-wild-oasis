import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded.");
  }

  return cabins;
}

export async function createEditCabin(newCabin, id) {
  const hasImgPath = newCabin.image?.startsWith?.(supabaseUrl);

  const imgName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  const imgPath = hasImgPath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imgName}`;

  // 1. Create/edit cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imgPath }]);

  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imgPath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created.");
  }

  // 2. Upload image
  if (hasImgPath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imgName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading the image.
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created."
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Cabin could not be deleted.");
  }

  return data;
}
