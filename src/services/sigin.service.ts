import axios from "axios";


type SigInProps = {
  email: string;
  password: string;
};

const baseURL = "http://localhost:8080";

type SigInResponse = {
  token: string
  userId: string
}

export async function sigInRequest({ email, password }: SigInProps):Promise<SigInResponse> {
  const payload = {
    login:email,
    password,
  };
 const response =  await axios.post(`${baseURL}/auth/login`, payload)
    return response.data
}
