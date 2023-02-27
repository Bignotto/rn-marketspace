import { IUserDTO } from "@dtos/IUserDTO";
import { createContext, ReactNode } from "react";

export type AuthContextDataProps = {
  user: IUserDTO;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

//TODO: implement login and logout functions
//TODO: implement session and user states

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  return (
    <AuthContext.Provider
      value={{
        user: {
          avatar: "teste.jpeg",
          email: "teste@teste.com",
          tel: "55998743562",
          name: "Fulado",
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
