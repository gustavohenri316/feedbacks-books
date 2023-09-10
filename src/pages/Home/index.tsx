import { useEffect, useState } from "react";
import { Search } from "../../components/Search";
import { getBooks } from "../../services/books.service";
import { ListBooks } from "../../components/ListBooks";

function Home() {
  const [books, setBooks] = useState<BookResponse | undefined>();
  const [search, setSearch] = useState<string>("Deuses Americanos");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const pageSize = 20;

  async function fetchBooks() {
    if (!loading && hasMore) {
      setLoading(true);
      try {
        const response = await getBooks({
          maxResults: pageSize,
          page: page,
          searchParams: search,
        });

        if (response) {
          setBooks((prevBooks) => ({
            kind: response.kind,
            totalItems: response.totalItems,
            items: [...(prevBooks?.items || []), ...response.items],
          }));
          setPage(page + 1);
          setHasMore(response.items.length === pageSize);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    fetchBooks();
  }, [search]);

  function handleValue(value: string) {
    setSearch(value);
    setBooks(undefined);
    setPage(1);
    setHasMore(true);
  }

  function handleLoadMore() {
    fetchBooks();
  }

  return (
    <div>
      <Search handleValue={handleValue} />
      <div className="flex flex-col gap-2 mt-4">
        {books &&
          books.items.map((book: BookItem) => {
            return <ListBooks book={book} />;
          })}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-4 w-full">
          <button
            className="border rounded-md bg-violet-800 w-full border-violet-800 p-1"
            onClick={handleLoadMore}
          >
            {loading ? "Carregando..." : "Carregar mais"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
