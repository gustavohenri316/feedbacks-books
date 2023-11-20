import { MagnifyingGlass } from "phosphor-react";
import React from "react";

interface ISearch {
  handleValue: (_value: string) => void;
}
export function Search({ handleValue }: ISearch) {
  const [value, setValue] = React.useState("");

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-neutral-600 rounded-md border border-neutral-600">
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Buscar livros, altores"
          className="bg-transparent w-full h-full p-2 rounded-md"
        />
      </div>
      <button className="bg-violet-800 p-2 rounded-md border border-violet-800">
        <MagnifyingGlass size={22} onClick={() => handleValue(value)} />
      </button>
    </div>
  );
}
