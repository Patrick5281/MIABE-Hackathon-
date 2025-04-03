import { auth, db } from "@/config/supabase-config";
import { User } from "@supabase/supabase-js";
import { userDocument, UserInterface } from "@/types/user";
import { useEffect, useState } from "react";
import { RealtimeChannel } from '@supabase/supabase-js';

// Interface for realtime subscription payload
interface RealtimePayload {
  new: Record<string, any>;
  old: Record<string, any>;
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
}

export default function useSupabaseAuth() {
  const [authUser, setAuthUser] = useState<UserInterface | null>(null);
  const [authUserIsLoading, setAuthUserIsLoading] = useState<boolean>(true);
  const [userDocumentChannel, setUserDocumentChannel] = useState<RealtimeChannel | null>(null);

  // Function to format authenticated user
  const formatAuthUser = (user: User): UserInterface => ({
    uid: user.id,
    email: user.email || "",
    displayName: user.user_metadata?.full_name || "",
    emailVerified: user.email_confirmed_at ? true : false,
    phoneNumber: user.phone || user.user_metadata?.phone || "",
    photoURL: user.user_metadata?.avatar_url || "",
    userDocument: {} as userDocument,
  });

  // Function to retrieve user document with realtime updates
  const getUserDocument = async (user: UserInterface) => {
    if (!user.uid) {
      setAuthUserIsLoading(false);
      return;
    }

    try {
      const { data, error } = await db
        .from('users')
        .select('*')
        .eq('id', user.uid)
        .single();

      if (error) throw error;

      if (data) {
        const compactUser = { ...user, userDocument: data as userDocument };
        setAuthUser(compactUser);

        // Unsubscribe from previous channel if exists
        if (userDocumentChannel) {
          userDocumentChannel.unsubscribe();
        }

        // Set up realtime subscription for user document
        const channel = db.channel(`user:${user.uid}`)
          .on(
            'postgres_changes', 
            { 
              event: '*', 
              schema: 'public', 
              table: 'users',
              filter: `id=eq.${user.uid}`
            },
            (payload: RealtimePayload) => {
              if (payload.eventType === 'UPDATE') {
                setAuthUser(prev => prev ? {
                  ...prev,
                  userDocument: payload.new as userDocument
                } : null);
              }
            }
          )
          .subscribe();

        setUserDocumentChannel(channel);
      }
    } catch (err) {
      console.error("Erreur lors de la récupération du document utilisateur:", err);
      setAuthUser(null);
    } finally {
      setAuthUserIsLoading(false);
    }
  };

  // Effect to listen to authentication state changes
  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        const { data: { user }, error } = await auth.getUser();
        
        if (error) {
          console.error("Erreur lors de la récupération de l'utilisateur:", error);
          if (isMounted) {
            setAuthUser(null);
            setAuthUserIsLoading(false);
          }
          return;
        }
        
        if (isMounted) {
          if (user) {
            const formattedUser = formatAuthUser(user);
            await getUserDocument(formattedUser);
          } else {
            setAuthUser(null);
            setAuthUserIsLoading(false);
          }
        }
      } catch (err) {
        console.error("Erreur d'initialisation de l'authentification:", err);
        if (isMounted) {
          setAuthUser(null);
          setAuthUserIsLoading(false);
        }
      }
    };

    // Initialiser l'état d'authentification
    initializeAuth();

    // Écouter les changements d'état d'authentification
    const { data: { subscription } } = auth.onAuthStateChange(
      async (event, session) => {
        console.log("Changement d'état d'authentification:", event, session);
        if (isMounted) {
          if (session?.user) {
            const formattedUser = formatAuthUser(session.user);
            await getUserDocument(formattedUser);
          } else {
            if (userDocumentChannel) {
              userDocumentChannel.unsubscribe();
              setUserDocumentChannel(null);
            }
            setAuthUser(null);
            setAuthUserIsLoading(false);
          }
        }
      }
    );

    // Nettoyage
    return () => {
      isMounted = false;
      subscription.unsubscribe();
      if (userDocumentChannel) {
        userDocumentChannel.unsubscribe();
        setUserDocumentChannel(null);
      }
    };
  }, []);

  return {
    authUser,
    authUserIsLoading,
    setAuthUser
  };
}