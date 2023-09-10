import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { ImageSquare, PencilLine } from "phosphor-react";
import { ImageUpload } from "../../components/ImageUpload";

export default function Profile() {
  const { user } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const openEdit = () => setIsEdit(true);
  const closeEdit = () => setIsEdit(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatarUrl: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, setImage] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        avatarUrl: user.avatarUrl || "",
      });
    }
  }, [user]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    void ImageUpload(e, setImage);
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Perfil</h1>
        <span
          onClick={openEdit}
          className="text-blue-800 flex items-center justify-center gap-2 cursor-pointer hover:text-white"
        >
          Editar
          <PencilLine />
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <b>Nome:</b>
        {user?.name && (
          <input
            type="text"
            disabled={!isEdit}
            className={`${
              isEdit
                ? "text-neutral-100 bg-neutral-600 rounded-md p-2"
                : "text-neutral-100 bg-transparent "
            } `}
            value={formData.name}
            onChange={handleInputChange}
          />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <b>Email:</b>
        {user?.email && (
          <input
            disabled={!isEdit}
            type="text"
            className={`${
              isEdit
                ? "text-neutral-100 bg-neutral-600 rounded-md p-2"
                : "text-neutral-100 bg-transparent "
            } `}
            value={formData.email}
            onChange={handleInputChange}
          />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <b>Foto:</b>
        <div className="border-dashed border-neutral-600 w-[210px] h-[210px]  border rounded-full flex items-center justify-center">
          <label
            htmlFor="photo"
            className="w-full h-full cursor-pointer flex items-center justify-center"
          >
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Preview"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <ImageSquare
                size={100}
                className="text-neutral-600 hover:text-neutral-400"
                onClick={handleIconClick}
              />
            )}
          </label>
          <input
            type="file"
            name="photo"
            id="photo"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onInput={handleFileChange}
          />
        </div>
      </div>
      {isEdit && (
        <div className="flex items-center justify-end w-full mt-4 gap-4">
          <button className="border rounded-md p-2" onClick={closeEdit}>
            Cancelar
          </button>
          <button className="border rounded-md p-2 bg-violet-800 border-violet-800">
            Salvar
          </button>
        </div>
      )}
    </div>
  );
}
