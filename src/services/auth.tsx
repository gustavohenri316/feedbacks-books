import axios from "axios";

interface UserPayload {
  name: string;
  login: string;
  password: string;
  avatarURL: string;
}
const baseURL = "http://192.168.100.64:8080";

export async function userRegister({
  avatarURL,
  login,
  name,
  password,
}: UserPayload) {
  const response = await axios.post(`${baseURL}/auth/register`, {
    avatarURL,
    login,
    name,
    password,
  });

  return response.data;
}
