import { useState } from "react";
import { uploadImages } from "../../components/upload-images";
import { Image as ImgIcon } from "phosphor-react";
export default function RegisterSummaryBook() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState("");
  const [formState, setFormState] = useState({
    title: "",
    summary: "",
    bookName: "",
    bookAuthor: "",
  });

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
    const fileInput = document.getElementById(
      "fileInput"
    ) as HTMLInputElement | null;
    if (fileInput) {
      fileInput.click();
    }
  };
  return (
    <div className="flex gap-4 flex-col w-full p-4 ">
      <div className="flex gap-4 w-full max-lg:flex-col-reverse">
        <div className="flex flex-col w-full gap-4 ">
          <div className="flex flex-col gap-2">
            <span className="text-lg">Nome do livro</span>
            <input
              type="text"
              className="p-2 rounded bg-neutral-700 text-white"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-lg">Autor</span>
            <input
              type="text"
              className="p-2 rounded bg-neutral-700 text-white"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-lg">Resumo</span>
            <textarea
              rows={15}
              className="p-2 rounded bg-neutral-700 text-white"
            />
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
                    className="text-neutral-300"
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
    </div>
  );
}
