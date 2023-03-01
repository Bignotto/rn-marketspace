import { IUserDTO } from "@dtos/IUserDTO";
import { api } from "@services/api";
import { createContext, ReactNode, useState } from "react";

export type AuthContextDataProps = {
  user: IUserDTO;
  signIn: (email: string, password: string) => Promise<string>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<IUserDTO>({} as IUserDTO);

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password });
      setUser(data.user);
      return data.token;
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
