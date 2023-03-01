import AsyncStorage from "@react-native-async-storage/async-storage";

import { IUserDTO } from "@dtos/IUserDTO";
import { USER_STORAGE } from "@storage/config";

export async function storageUserSave(user: IUserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function storageUserGet() {
  const storage = await AsyncStorage.getItem(USER_STORAGE);

  const user: IUserDTO = storage ? JSON.parse(storage) : {};

  return user;
}

export async function storageUserRemove() {
  await AsyncStorage.removeItem(USER_STORAGE);
}
