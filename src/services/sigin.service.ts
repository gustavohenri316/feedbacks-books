type SigInProps = {
  email: string;
  password: string;
};

const credentials = {
  email: "gustavohenri316@gmail.com",
  password: "Bara98ks",
};
export async function sigInRequest({ email, password }: SigInProps) {
  if (email === credentials.email && password === credentials.password) {
    return {
      token: "WEFCMWEOVWEDJsacsaVWEDVC518ascNjnaqdhcqabswcac",
      user: {
        name: "Gustavo Henrique Gonçalves de Oliveira",
        email: "gustavohenri316@gmail.com",
        avatarUrl: "https://github.com/gustavohenri316.png",
        id: 1,
      },
    };
  } else {
    return {
      error: "Usuário ou senha inválidos",
    };
  }
}
