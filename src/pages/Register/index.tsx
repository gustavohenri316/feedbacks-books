import { Link } from "react-router-dom";
import { useState } from "react";
import { userRegister } from "../../services/auth";
import { uploadImages } from "../../components/upload-images";
import { useAuth } from "../../context/AuthContext";

interface FormData {
  name: string;
  login: string;
  password: string;
  avatarURL: string;
}

interface FormErrors {
  name?: string;
  login?: string;
  password?: string;
  avatarURL?: string;
}

interface PasswordRequirement {
  label: string;
  satisfied: boolean;
}

export default function Register() {
  const [image, setImage] = useState("");
  const { signUp } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    login: "",
    password: "",
    avatarURL: "",
  });
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    login: "",
    password: "",
    avatarURL: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImages(e, setImage);
      const reader = new FileReader();
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "O name é obrigatório";
    }

    if (!formData.login.trim()) {
      newErrors.login = "O login é obrigatório";
    } else if (!isValidlogin(formData.login)) {
      newErrors.login = "login inválido";
    }

    if (!formData.password) {
      newErrors.password = "A password é obrigatória";
    } else if (formData.password.length < 8) {
      newErrors.password = "A password deve ter pelo menos 8 caracteres";
    } else if (!hasUpperCase(formData.password)) {
      newErrors.password =
        "A password deve conter pelo menos uma letra maiúscula";
    } else if (!hasNumber(formData.password)) {
      newErrors.password = "A password deve conter pelo menos um número";
    } else if (!hasSpecialChar(formData.password)) {
      newErrors.password =
        "A password deve conter pelo menos um caractere especial";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const payload = {
        name: formData.name,
        login: formData.login,
        password: formData.password,
        avatarURL: image,
      };
      await signUp(payload);
    }

    try {
      await userRegister(formData);
    } catch (err) {
      console.error(err);
    }
  };

  const isValidlogin = (login: string) => {
    const loginPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return loginPattern.test(login);
  };

  const hasUpperCase = (str: string) => /[A-Z]/.test(str);
  const hasNumber = (str: string) => /\d/.test(str);
  const hasSpecialChar = (str: string) =>
    /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(str);

  const passwordRequirements: PasswordRequirement[] = [
    {
      label: "Deve ter pelo menos 8 caracteres",
      satisfied: formData.password.length >= 8,
    },
    {
      label: "Deve conter pelo menos uma letra maiúscula",
      satisfied: hasUpperCase(formData.password),
    },
    {
      label: "Deve conter pelo menos um número",
      satisfied: hasNumber(formData.password),
    },
    {
      label: "Deve conter pelo menos um caractere especial",
      satisfied: hasSpecialChar(formData.password),
    },
  ];

  const checkAllRequirementsSatisfied = (
    requirements: PasswordRequirement[]
  ): boolean => {
    return requirements.every((requirement) => requirement.satisfied);
  };

  const TrueValidationPassword =
    checkAllRequirementsSatisfied(passwordRequirements);

  return (
    <div className="bg-neutral-900 w-screen h-screen text-white flex items-center justify-center">
      <div className="p-12 bg-neutral-800 rounded-md w-1/4">
        <Link to="/" className="text-center">
          <h1 className="text-3xl cursor-pointer hover:text-violet-800">
            Feedback Books
          </h1>
        </Link>
        <h2 className="text-xl text-center mb-4">Criar Conta</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="bg-white rounded-md p-2 text-neutral-900"
              placeholder="name"
            />
            {errors.name && <span className="text-red-500">{errors.name}</span>}

            <input
              type="text"
              name="login"
              value={formData.login}
              onChange={handleInputChange}
              className="bg-white rounded-md p-2 text-neutral-900"
              placeholder="login"
            />
            {errors.login && (
              <span className="text-red-500 text-sm">{errors.login}</span>
            )}

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="bg-white rounded-md p-2 text-neutral-900"
              placeholder="password"
            />
            {formData.password.length > 0 && !TrueValidationPassword && (
              <div className="text-sm">
                {passwordRequirements.map((requirement, index) => (
                  <div key={index}>
                    <span
                      className={
                        requirement.satisfied
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {requirement.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <input
              type="file"
              name="avata"
              value={formData.avatarURL}
              onChange={handleImageChange}
              className="bg-white rounded-md p-2 text-neutral-900"
              placeholder="link da foto"
            />
            {errors.avatarURL && (
              <span className="text-red-500 text-sm">{errors.avatarURL}</span>
            )}

            <button className="p-2 rounded-md w-full bg-violet-800 hover:bg-violet-900">
              Criar conta
            </button>
          </div>
        </form>
        <div className="flex flex-col gap-1 mt-1">
          <span className="flex items-center justify-center">ou</span>
          <Link to="/login">
            <button className="p-2 rounded-md w-full bg-blue-800 hover:bg-blue-900">
              Entrar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
