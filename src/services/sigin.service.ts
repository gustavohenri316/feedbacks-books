import axios from "axios";

type SigInProps = {
  email: string;
  password: string;
};

const baseURL = "http://192.168.100.64:8080";

export async function sigInRequest({ email, password }: SigInProps) {
  const payload = {
    email,
    password,
  };
  await fetch(`${baseURL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}
