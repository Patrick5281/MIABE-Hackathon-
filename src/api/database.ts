import { supabase } from "@/config/supabase-config";

export const supabaseUpdateDocument = async (
  table: string,
  userId: string | undefined,
  data: any
) => {
  console.log("🚀 Début de supabaseUpdateDocument", { table, userId, data });

  if (!userId) {
    console.error("❌ Erreur: User ID manquant");
    throw new Error("User ID is required");
  }

  try {
    console.log("🔍 Vérification de l'existence de l'enregistrement...");
    // Vérifie d'abord si l'enregistrement existe
    const { data: existingRecord, error: fetchError } = await supabase
      .from(table)
      .select("*")
      .eq("user_id", userId)
      .single();

    if (fetchError) {
      console.error("❌ Erreur lors de la vérification:", fetchError);
      throw fetchError;
    }

    console.log("📝 Résultat de la vérification:", { existingRecord });

    if (existingRecord) {
      console.log("🔄 Mise à jour de l'enregistrement existant...");
      // Si l'enregistrement existe, on fait une mise à jour
      const updatePayload = {
        ...data,
        updated_at: new Date().toISOString()
      };
      console.log("📤 Données de mise à jour:", updatePayload);

      const { data: updatedData, error: updateError } = await supabase
        .from(table)
        .update(updatePayload)
        .eq("user_id", userId)
        .select()
        .single();

      if (updateError) {
        console.error("❌ Erreur lors de la mise à jour:", updateError);
        throw updateError;
      }

      console.log("✅ Mise à jour réussie:", updatedData);
      return { data: updatedData, error: null };
    } else {
      console.log("➕ Création d'un nouvel enregistrement...");
      // Si l'enregistrement n'existe pas, on fait une insertion
      const insertPayload = {
        ...data,
        user_id: userId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      console.log("📤 Données d'insertion:", insertPayload);

      const { data: insertedData, error: insertError } = await supabase
        .from(table)
        .insert([insertPayload])
        .select()
        .single();

      if (insertError) {
        console.error("❌ Erreur lors de l'insertion:", insertError);
        throw insertError;
      }

      console.log("✅ Insertion réussie:", insertedData);
      return { data: insertedData, error: null };
    }
  } catch (error: any) {
    console.error("❌ Erreur générale:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint
    });
    return { data: null, error };
  }
}; 