import { getUser } from "@/api/user";
import { User } from "@/types";
import { useCallback, useEffect, useState } from "react";

export const useAuthentication = (): {
  isAuthenticated: boolean | undefined;
  user: User | null;
} => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );
  const [user, setUser] = useState<User | null>(null);

  const authenticate = useCallback(async () => {
    try {
      const response = await getUser();
      const user: User = await response.json();
      if (response.ok) {
        setIsAuthenticated(true);
        setUser(user);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  return { isAuthenticated, user };
};
