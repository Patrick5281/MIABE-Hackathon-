// src/api/authentication.tsx
import { auth } from "@/config/supabase-config";
import { getSupabaseErrorMessage } from "@/utils/getSupabaseErrorMessage";

export const supabaseCreateUser = async (email: string, password: string) => {
  try {
    const { data, error } = await auth.signUp({
      email,
      password,
    });
    
    if (error) throw error;
    return { data: data.user };
  } catch (error: any) {
    const errorMessage = getSupabaseErrorMessage("createUserWithEmailAndPassword", error.code);
    return {
      error: {
        code: error.code,
        message: errorMessage || error.message,
      },
    };
  }
};

export const supabaseSignInUser = async (email: string, password: string) => {
  try {
    const { data, error } = await auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return { data: data.user };
  } catch (error: any) {
    const errorMessage = getSupabaseErrorMessage("signInWithEmailAndPassword", error.code);
    return {
      error: {
        code: error.code,
        message: errorMessage || error.message,
      },
    };
  }
};

export const supabaseLogOutUser = async () => {
  try {
    const { error } = await auth.signOut();
    
    if (error) throw error;
    return { data: true };
  } catch (error: any) {
    const errorMessage = getSupabaseErrorMessage("signOut", error.code);
    return {
      error: {
        code: error.code,
        message: errorMessage || error.message,
      },
    };
  }
};

export const sendEmailToResetPassword = async (email: string) => {
  try {
    const { error } = await auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/connexion/reset-password`,
    });
    
    if (error) throw error;
    return { data: true };
  } catch (error: any) {
    const errorMessage = getSupabaseErrorMessage("sendPasswordResetEmail", error.code);
    return {
      error: {
        code: error.code,
        message: errorMessage || error.message,
      },
    };
  }
};

export const sendEmailVerificationProcedure = async () => {
  try {
    const { data: { user } } = await auth.getUser();
    
    if (!user) {
      return {
        error: {
          code: "unknown",
          message: "Aucun utilisateur connecté",
        },
      };
    }
    
    // Supabase envoie automatiquement un email de vérification lors de l'inscription
    // Pour renvoyer un email, vous pouvez utiliser cette méthode:
    const { error } = await auth.resend({
      type: 'signup',
      email: user.email as string,
    });
    
    if (error) throw error;
    return { data: true };
  } catch (error: any) {
    const errorMessage = getSupabaseErrorMessage("sendEmailVerification", error.code);
    return {
      error: {
        code: error.code,
        message: errorMessage || error.message,
      },
    };
  }
};

export const resetPassword = async (newPassword: string) => {
  try {
    const { error } = await auth.updateUser({
      password: newPassword
    });
    
    if (error) throw error;
    return { data: true };
  } catch (error: any) {
    const errorMessage = getSupabaseErrorMessage("resetPassword", error.code);
    return {
      error: {
        code: error.code,
        message: errorMessage || error.message,
      },
    };
  }
};