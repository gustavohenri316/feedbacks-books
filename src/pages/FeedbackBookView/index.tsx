import { useEffect, useState } from "react";
import {
  findByIdFeedbackBooks,
  likesBookSummary,
  sendEmailBook,
} from "../../services/books.service";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Heart, PaperPlaneTilt } from "phosphor-react";
import { format } from "date-fns";
import { useAuth } from "../../context/AuthContext";
import ptLocale from "date-fns/locale/pt";
import CommentsViews from "../../components/CommentsViews";

export interface BookSummaryResponse {
  id: string;
  summary: string;
  bookName: string;
  bookAuthor: string;
  bookImage: string;
  summaryDate: string;
  user: User;
  comments: Comment[];
  likes: Likes[];
}

interface User {
  id: string;
  name: string;
  login: string;
  avatarURL: string;
  role: string;
}

interface Comment {
  id: string;
  text: string;
  user: User;
  commentDate: string;
  bookSummaryId: string;
}
interface Likes {
  id: string;
  text: string;
  user: User;
  likeDate: string;
  bookSummaryId: string;
}

export default function FeedbackBookView() {
  const { id } = useParams();
  const [book, setBook] = useState<BookSummaryResponse | null>(null);
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleLoading = () => setLoading(!loading);
  const navigate = useNavigate();

  async function getBook(): Promise<void> {
    const response = await findByIdFeedbackBooks(id as string);
    setBook(response);
  }

  useEffect(() => {
    void getBook();
  }, [loading]);

  useEffect(() => {
    if (book && book.likes.some((like) => like.user.id === user?.id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [book, user]);

  async function likeBook() {
    try {
      await likesBookSummary({
        bookId: book?.id as string,
        userId: user?.id as string,
      });
      setIsLiked(true);
      void getBook();
    } catch (err) {
      console.log(err);
    }
  }

  async function sendEmail() {
    try {
      await sendEmailBook({
        bookId: book?.id as string,
        userId: user?.id as string,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4 p-4 bg-neutral-300 rounded-md mb-4">
        <div className="flex justify-between">
          <ArrowLeft
            size={32}
            className="cursor-pointer text-neutral-500"
            onClick={() => navigate(-1)}
          />
          <div className="flex flex-col items-end gap-2 ">
            <span className="text-sm">
              {book?.summaryDate &&
                format(
                  new Date(book.summaryDate),
                  "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
                  { locale: ptLocale }
                )}
            </span>
            <div className="flex items-center gap-2 ">
              <span>{book?.user.name}</span>
              <img
                src={book?.user.avatarURL}
                alt=""
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <img
            src={book?.bookImage}
            className="w-full h-96 bg-transparent mix-blend-multiply object-scale-down flex items-center justify-center rounded-md"
          />
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl py-2">{book?.bookName}</h1>
              <div className="flex items-center gap-4">
                {book?.likes.length}
                <Heart
                  size={28}
                  weight={isLiked ? "fill" : "thin"}
                  onClick={() => (!isLiked ? likeBook() : {})}
                  className={`cursor-pointer ${isLiked ? "text-red-500" : ""}`}
                />
                <span title="Enviar para meu e-mail ">
                  <PaperPlaneTilt
                    size={28}
                    weight="thin"
                    onClick={sendEmail}
                    className="cursor-pointer"
                  />
                </span>
              </div>
            </div>
            <div
              className="text-lg py-2"
              dangerouslySetInnerHTML={{ __html: book?.summary as string }}
            />
          </div>
        </div>
      </div>

      <CommentsViews book={book} id={id} handleLoading={handleLoading} />
    </>
  );
}
