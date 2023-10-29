import axios from "axios";

interface UserPayload {
  name: string;
  login: string;
  password: string;
  avatarURL: string;
}
const baseURL = "http://localhost:8080";

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
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  });

  return response.data;
}
