import axios from "axios";

type SigInProps = {
  email: string;
  password: string;
};

const baseURL = "http://localhost:8080";

type SigInResponse = {
  token: string;
  userId: string;
};

export async function sigInRequest({
  email,
  password,
}: SigInProps): Promise<SigInResponse> {
  const payload = {
    login: email,
    password,
  };
  const { data } = await axios.post(`${baseURL}/auth/login`, payload);
  return data;
}

type SigUpProps = {
  name: string;
  login: string;
  password: string;
  avatarURL: string;
};

export async function sigUpRequest({
  login,
  password,
  avatarURL,
  name,
}: SigUpProps): Promise<SigInResponse> {
  const payload: SigUpProps = {
    login,
    password,
    avatarURL,
    name,
  };
  const { data } = await axios.post(`${baseURL}/auth/register`, payload);
  return data;
}
