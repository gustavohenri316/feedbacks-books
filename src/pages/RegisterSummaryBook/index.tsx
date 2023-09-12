export default function RegisterSummaryBook() {
  const genres = [
    "Ficção",
    "Não Ficção",
    "Romance",
    "Aventura",
    "Mistério",
    "Suspense",
    "Terror",
    "Ficção Científica",
    "Fantasia",
    "Poesia",
    "Drama",
    "Comédia",
    "Policial",
    "História Alternativa",
    "Ficção Histórica",
    "Biografia",
    "Autobiografia",
    "Ficção Política",
    "Filosofia",
    "Espiritualidade",
    "Religião",
    "Ciência",
    "Matemática",
    "Economia",
    "Negócios",
    "Autoajuda",
    "Psicologia",
    "Sociologia",
    "Antropologia",
    "Educação",
    "Culinária",
    "Viagem",
    "Esportes",
    "Meio Ambiente",
    "Jornalismo",
    "Crítica Literária",
    "Artes Plásticas",
    "Música",
    "Teatro",
    "Cinema",
    "Fotografia",
    "Quadrinhos",
    "Mangá",
    "Literatura Infantil",
    "Literatura Juvenil",
    "Ficção Feminina (Chick Lit)",
    "Ficção Masculina",
    "Ficção LGBTQ+",
    "Ficção de Guerra",
    "Ficção de Fãs (Fanfiction)",
  ];

  return (
    <div>
      <h1 className="text-xl">Registrar novo resumo</h1>
      <div className="flex items-start gap-4">
        <div className="flex flex-col gap-2 items-center w-full">
          <div className="flex flex-col gap-2 mt-2 w-full">
            <span>Nome do livro</span>
            <input
              type="search"
              className="rounded-md p-2 bg-neutral-700 text-white"
            />
          </div>
          <div className="flex flex-col gap-2 mt-2 w-full">
            <span>Autor</span>
            <input
              type="search"
              className="rounded-md p-2 bg-neutral-700 text-white"
            />
          </div>
          <div className="flex flex-col gap-2 mt-2 w-full">
            <span>Ano de publicação</span>
            <input
              type="date"
              className="rounded-md p-2 bg-neutral-700 text-white"
            />
          </div>
          <div className="flex flex-col gap-2 mt-2 w-full">
            <span>Gênero</span>
            <select className="rounded-md p-2 bg-neutral-700 text-white">
              <option value="">Selecione um gênero</option>
              {genres.map((genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-2 items-center w-full">
          <div className="flex flex-col gap-2 mt-2 w-full">
            ADICIONE AQUI A IMAGEM
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-2 w-full">
        <span>Resumo</span>
        <textarea
          name=""
          id=""
          cols={30}
          rows={10}
          className="rounded-md bg-neutral-700 text-white"
        ></textarea>
      </div>
    </div>
  );
}
