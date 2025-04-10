import { supabase } from '@/config/supabase-config';
import { storageService } from './storage.service';

export interface WasteItem {
  id: string;
  category_id: string;
  image_url: string;
  description?: string;
  created_at: string;
  user_id: string;
}

export interface WasteCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export const wasteManagementService = {
  async getCategories(): Promise<WasteCategory[]> {
    const { data, error } = await supabase
      .from('waste_categories')
      .select('*');

    if (error) throw error;
    return data;
  },

  async getWastesByCategory(categoryId: string): Promise<WasteItem[]> {
    const { data, error } = await supabase
      .from('waste_items')
      .select('*')
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async addWaste(
    categoryId: string,
    imageFile: File,
    description?: string
  ): Promise<WasteItem> {
    try {
      // 1. Upload l'image
      const imageUrl = await storageService.uploadWasteImage(imageFile);

      // 2. Créer l'enregistrement du déchet
      const { data, error } = await supabase
        .from('waste_items')
        .insert([
          {
            category_id: categoryId,
            image_url: imageUrl,
            description,
            user_id: (await supabase.auth.getUser()).data.user?.id,
          },
        ])
        .select()
        .single();

      if (error) {
        // Si l'insertion échoue, supprimer l'image
        await storageService.deleteWasteImage(imageUrl);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error adding waste:', error);
      throw error;
    }
  },

  async deleteWaste(wasteItem: WasteItem): Promise<void> {
    try {
      // 1. Supprimer l'image
      await storageService.deleteWasteImage(wasteItem.image_url);

      // 2. Supprimer l'enregistrement
      const { error } = await supabase
        .from('waste_items')
        .delete()
        .eq('id', wasteItem.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting waste:', error);
      throw error;
    }
  },
}; 