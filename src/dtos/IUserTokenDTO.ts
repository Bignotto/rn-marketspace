import { IUserDTO } from "./IUserDTO";

export interface IUserTokenDTO {
  id: string;
  expires_in: number;
  user_id: string;
  user: IUserDTO;
  token: string;
  created_at: Date;
}
