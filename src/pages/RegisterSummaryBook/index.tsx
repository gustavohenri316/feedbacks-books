import React, { useState } from "react";
import { Image as ImgIcon } from "phosphor-react";
import { createFeedbackBooks } from "../../services/books.service";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { uploadImages } from "../../components/upload-images";
import { EditorMessages } from "../../components/EditorText";

export default function RegisterSummaryBook() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formState, setFormState] = useState({
    bookImage: "",
    summary: "",
    bookName: "",
    bookAuthor: "",
  });

  const [formErrors, setFormErrors] = useState({
    bookImage: "",
    summary: "",
    bookName: "",
    bookAuthor: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputChangeSummary = (value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      summary: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImages(e, setImage);
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const result = event.target?.result as string;
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const createBookFeedback = async () => {
    const { summary, bookName, bookAuthor } = formState;
    console.log(formState);
    if (!image || !summary || !bookName || !bookAuthor) {
      setFormErrors({
        bookImage: !summary ? "Campo obrigatório" : image,
        summary: !summary ? "Campo obrigatório" : formErrors.summary,
        bookName: !bookName ? "Campo obrigatório" : formErrors.bookName,
        bookAuthor: !bookAuthor ? "Campo obrigatório" : formErrors.bookAuthor,
      });
      return;
    }

    const payload = {
      summary,
      bookName,
      bookAuthor,
      bookImage: image,
    };

    try {
      if (!user?.id) return;
      await createFeedbackBooks({ payload, userId: user?.id });
      toast.success("Resumo do livro criado com sucesso");
      navigate("/");
    } catch (err) {
      toast.error("Erro no servidor: " + err);
    }
  };

  return (
    <div className="flex gap-4 flex-col w-full p-4 bg-neutral-300">
      <div className="flex gap-4 w-full max-lg:flex-col-reverse">
        <div className="flex flex-col w-full gap-4 ">
          <div className="flex flex-col gap-2">
            <span className="text-lg">Nome do livro</span>
            <input
              type="text"
              className="p-2 rounded bg-neutral-100 "
              name="bookName"
              value={formState.bookName}
              onChange={handleInputChange}
            />
            {formErrors.bookName && (
              <span className="text-red-500">{formErrors.bookName}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-lg">Autor</span>
            <input
              type="text"
              className="p-2 rounded bg-neutral-100 "
              name="bookAuthor"
              value={formState.bookAuthor}
              onChange={handleInputChange}
            />
            {formErrors.bookAuthor && (
              <span className="text-red-500">{formErrors.bookAuthor}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-lg">Resumo</span>
            <div className="h-auto">
              <EditorMessages
                onChange={handleInputChangeSummary}
                value={formState.summary}
              />
            </div>

            {formErrors.summary && (
              <span className="text-red-500">{formErrors.summary}</span>
            )}
          </div>
        </div>
        <div className="w-1/2 max-lg:w-full max-lg:h-96">
          <div className="border p-4 rounded-md w-full h-full flex items-center justify-center cursor-pointer">
            <div className="w-full h-full max-lg:w-full rounded-lg flex items-center justify-center">
              <div
                className="cursor-pointer w-full h-full flex justify-center items-center  rounded-md"
                onClick={handleClick}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover  rounded-md"
                  />
                ) : (
                  <ImgIcon
                    size={200}
                    weight="thin"
                    className="text-neutral-100"
                  />
                )}
              </div>
              <input
                id="fileInput"
                type="file"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 flex justify-end gap-2">
        <button
          className="border rounded-md p-2 bg-transparent border-neutral-100"
          onClick={() => navigate(-1)}
        >
          Cancelar
        </button>
        <button
          className="border rounded-md p-2 bg-violet-800 border-violet-800 hover:bg-violet-900 text-white"
          onClick={createBookFeedback}
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
}
