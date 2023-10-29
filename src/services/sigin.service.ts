

type SigInProps = {
  email: string;
  password: string;
};

const baseURL = "http://localhost:8080";

export async function sigInRequest({ email, password }: SigInProps) {
  const payload = {
    login:email,
    password,
  };
  await fetch(`${baseURL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

        'Access-Control-Allow-Origin': '*'
      
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}
