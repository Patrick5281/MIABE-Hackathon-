import { supabase } from "@/config/supabase-config"; 

export const storageService = {
  async uploadWasteImage(file: File): Promise<string> {
    try {
      console.log('Début de l\'upload du fichier:', {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type
      });

      // Vérifier que le fichier est une image
      if (!file.type.startsWith('image/')) {
        throw new Error('Le fichier doit être une image');
      }

      // Générer un nom de fichier unique
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `waste-images/${fileName}`;

      console.log('Tentative d\'upload vers Supabase:', { filePath });

      // Upload du fichier
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('waste-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Erreur lors de l\'upload:', uploadError);
        throw uploadError;
      }

      console.log('Upload réussi:', uploadData);

      // Récupérer l'URL publique
      const { data: urlData } = supabase.storage
        .from('waste-images')
        .getPublicUrl(filePath);

      if (!urlData.publicUrl) {
        throw new Error('Impossible d\'obtenir l\'URL publique');
      }

      console.log('URL publique générée:', urlData.publicUrl);

      return urlData.publicUrl;
    } catch (error) {
      console.error("Erreur détaillée:", error);
      if (error instanceof Error) {
        throw new Error(`Echec de upload de image: ${error.message}`);
      } else {
        throw new Error("Echec de upload de image");
      }
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