import { useEffect, useState } from "react";
import { View } from "react-native";
import Account from "../components/Account";
import Auth from "../components/Auth";
import { supabase } from "../lib/supabase";

export default function Index() {
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Initialize current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserId(user.id);
        setEmail(user.email ?? undefined);
      }
    });

    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;
      if (user) {
        setUserId(user.id);
        setEmail(user.email ?? undefined);
      } else {
        setUserId(null);
        setEmail(undefined);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <View>
      {userId ? (
        <Account key={userId} userId={userId} email={email} />
      ) : (
        <Auth />
      )}
    </View>
  );
}
