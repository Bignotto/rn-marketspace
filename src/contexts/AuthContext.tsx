import { IUserDTO } from "@dtos/IUserDTO";
import { api } from "@services/api";
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from "@storage/storageAuth";
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from "@storage/storageUser";
import { createContext, ReactNode, useEffect, useState } from "react";

export type AuthContextDataProps = {
  user: IUserDTO;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);
/*
obter o token OK
salvar o token OK
  - storage OK
implementar useEffect pra carregar o token
validar o token
*/
export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<IUserDTO>({} as IUserDTO);
  const [isLoading, setIsLoading] = useState(false);

  function updateSession(userData: IUserDTO, token: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setUser(userData);
  }

  function destroySession() {
    api.defaults.headers.common["Authorization"] = `Bearer `;

    setUser({} as IUserDTO);
  }

  async function refreshUser() {
    setIsLoading(true);
    try {
      const loggedUser = await storageUserGet();
      const { token } = await storageAuthTokenGet();

      //TODO: validate token!!
      if (token && loggedUser) updateSession(loggedUser, token);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    refreshUser();
  }, []);

  async function signIn(email: string, password: string) {
    setIsLoading(true);
    try {
      const { data } = await api.post("/sessions", { email, password });

      if (data.user && data.token && data.refresh_token) {
        await storageUserSave(data.user);
        await storageAuthTokenSave({
          token: data.token,
          refresh_token: data.refresh_token,
        });
        updateSession(data.user, data.token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function signOut() {
    setIsLoading(true);
    try {
      await storageAuthTokenRemove();
      await storageUserRemove();
      destroySession();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
