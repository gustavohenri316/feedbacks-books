import axios from "axios";
import { baseURL } from "../assets/data";

type GetUser = {
  Token: string;
};
export async function getUserProfile({ Token }: GetUser) {
  const response = await axios.get(`${baseURL}/user/${Token}/profile`);

  return response.data;
}

type NewUserService = {
  payload: any;
};
export async function newUser({ payload }: NewUserService) {
  const response = await axios.post(`${baseURL}/user`, payload);
  return response.data;
}
