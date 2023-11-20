import { useState } from "react";

export default function RegisterSummaryBook() {
  const [formState, setFormState] = useState({
    title: "",
    summary: "",
    bookName: "",
    bookAuthor: "",
  });
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
            adicione uma foto de capa
          </div>
        </div>
      </div>
    </div>
  );
}
