import { useNavigate } from "react-router-dom";
import { noPhoto } from "../../assets/data";
import { useAuth } from "../../context/AuthContext";
import { truncateText } from "../../utils/TruncateText";

interface IListBooks {
  book: BookItem;
}
export function ListBooks({ book }: IListBooks) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSeeMore = () => {
    if (user) {
      return navigate(`/book/${book.id}`);
    }
    return navigate("/login");
  };

  return (
    <div key={book.id} className="flex  gap-4 w-full flex-col">
      <div className="flex items-start gap-4">
        <img
          src={book.volumeInfo?.imageLinks?.thumbnail || noPhoto}
          alt=""
          className="w-32 h-52 rounded-md object-contain"
        />
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-2xl">{book.volumeInfo.title}</h1>
          <h2 className="text-lg">{book.volumeInfo.subtitle}</h2>
          <div className="flex flex-col">
            <span>{book.volumeInfo.authors}</span>
            <span>{book.volumeInfo.categories}</span>
            <span>{book.volumeInfo.publishedDate}</span>
            <span>{book.volumeInfo.publisher}</span>
          </div>
          <span>{truncateText(book.volumeInfo.description, 300)}</span>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={handleSeeMore}
          className="border rounded-md bg-violet-800 border-violet-800 p-1"
        >
          Ver mais
        </button>
      </div>
    </div>
  );
}
