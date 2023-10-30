
import { api } from "./api";

interface UserPayload {
  name: string;
  login: string;
  password: string;
  avatarURL: string;
}


export async function userRegister({
  avatarURL,
  login,
  name,
  password,
}: UserPayload) {
  const response = await api.post(`/auth/register`, {
    avatarURL,
    login,
    name,
    password,
  });

  return response.data;
}
