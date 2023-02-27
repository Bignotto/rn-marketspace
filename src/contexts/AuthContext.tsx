import { IUserDTO } from "@dtos/IUserDTO";
import { api } from "@services/api";
import { createContext, ReactNode } from "react";

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
  //TODO: implement login and logout functions
  //TODO: implement session and user states

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password });
      return data.token;
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user: {
          avatar: "teste.jpeg",
          email: "teste@teste.com",
          tel: "55998743562",
          name: "Fulado",
        },
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
