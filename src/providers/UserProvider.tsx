"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { createLocalClient } from "@/lib/supabase/supabase-local-client";

interface IUserProvider {
  user: User | null;
  session: Session | null;
}

const UserContext = createContext<IUserProvider>({
  user: null,
  session: null,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createLocalClient();

  useEffect(() => {
    const fetchUser = async () => {
      await supabase.auth.getUser().then((res) => {
        setUser(res.data.user);
      });
      await supabase.auth.getSession().then((res) => {
        setSession(res.data.session);
      });
    };

    fetchUser();
  }, [supabase.auth]);

  return (
    <UserContext.Provider value={{ user, session }}>
      {children}
    </UserContext.Provider>
  );
};

export default function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserSessionProvider");
  }
  return context;
}
