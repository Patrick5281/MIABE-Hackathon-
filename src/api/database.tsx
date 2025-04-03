// src/api/database.tsx
import { db } from "@/config/supabase-config";
import { getSupabaseErrorMessage } from "@/utils/getSupabaseErrorMessage"; 

export const supabaseCreateDocument = async (
  collectionName: string, 
  documentID: string, 
  data: object
) => {
  try {
    // Avec Supabase, vous pouvez utiliser l'UUID comme ID
    // ou spécifier une valeur pour la colonne id
    const { data: result, error } = await db
      .from(collectionName)
      .insert({ id: documentID, ...data })
      .select()
      .single();
    
    if (error) throw error;
    return { data: result };
  } catch (error: any) {
    return {
      error: {
        code: error.code,
        message: error.message,
      },
    };
  }
};

export const supabaseUpdateDocument = async (
  collectionName: string, 
  documentID: string, 
  data: object
) => {
  try {
    const { data: result, error } = await db
      .from(collectionName)
      .update(data)
      .eq('id', documentID)
      .select()
      .single();
    
    if (error) throw error;
    return { data: result };
  } catch (error: any) {
    return {
      error: {
        code: error.code,
        message: error.message,
      },
    };
  }
};

export const supabaseGetDocument = async (
  collectionName: string, 
  documentID: string
) => {
  try {
    const { data, error } = await db
      .from(collectionName)
      .select('*')
      .eq('id', documentID)
      .single();
    
    if (error) throw error;
    return { data };
  } catch (error: any) {
    return {
      error: {
        code: error.code,
        message: error.message,
      },
    };
  }
};

export const supabaseDeleteDocument = async (
  collectionName: string, 
  documentID: string
) => {
  try {
    const { error } = await db
      .from(collectionName)
      .delete()
      .eq('id', documentID);
    
    if (error) throw error;
    return { data: true };
  } catch (error: any) {
    return {
      error: {
        code: error.code,
        message: error.message,
      },
    };
  }
};