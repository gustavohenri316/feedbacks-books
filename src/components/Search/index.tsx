import { MagnifyingGlass } from "phosphor-react";
import React, { SetStateAction } from "react";

interface ISearch {
  handleValue: React.Dispatch<SetStateAction<string>>;
  value: string;
}
export function Search({ handleValue, value }: ISearch) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="flex-1 bg-neutral-200 rounded-md border border-neutral-200">
        <input
          type="search"
          value={value}
          onChange={(e) => handleValue(e.target.value)}
          placeholder="Buscar livros pelo nome..."
          className="bg-transparent w-full h-full p-2 rounded-md"
        />
      </div>
      <button className="bg-violet-800 p-2 rounded-md border border-violet-800 text-white">
        <MagnifyingGlass size={22} onClick={() => handleValue(value)} />
      </button>
    </div>
  );
}
