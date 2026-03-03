import { supabase } from "./supabase";

/**
 * Sube un archivo a un bucket de Supabase Storage.
 * @param bucket El nombre del bucket (ej: 'avatars', 'kyc-documents')
 * @param path La ruta interna (ej: 'user_id/profile.jpg')
 * @param file El archivo a subir
 */
export async function uploadFile(bucket: string, path: string, file: File) {
    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
            cacheControl: "3600",
            upsert: true,
        });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

    return publicUrl;
}
