import { supabase } from "@/config/supabase-config"; 

export const storageService = {
  async uploadWasteImage(file: File): Promise<string> {
    try {
      // Générer un nom de fichier unique
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `waste-images/${fileName}`;

      // Upload du fichier
      const { error: uploadError } = await supabase.storage
        .from('waste-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      // Récupérer l'URL publique
      const { data } = supabase.storage
        .from('waste-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload image');
    }
  },

  async deleteWasteImage(imageUrl: string): Promise<void> {
    try {
      // Extraire le chemin du fichier de l'URL
      const filePath = imageUrl.split('waste-images/').pop();
      if (!filePath) throw new Error('Invalid image URL');

      const { error } = await supabase.storage
        .from('waste-images')
        .remove([`waste-images/${filePath}`]);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      throw new Error('Failed to delete image');
    }
  }
}; 