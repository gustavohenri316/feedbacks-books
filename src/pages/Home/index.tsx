import { useEffect, useState } from "react";
import { Search } from "../../components/Search";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../../services/books.service";
import img from "../../assets/img.svg";
import ptLocale from "date-fns/locale/pt";
import { BookSummaryResponse } from "../FeedbackBookView";
import { api } from "../../services/api";

function Home() {
  const [search, setSearch] = useState("");
  const [bookSummary, setBookSummary] = useState<BookSummaryResponse[] | null>(
    null
  );

  console.log(search);

  async function getBooksFeedbacks() {
    try {
      const data = await fetchBooks();
      setBookSummary(data);
    } catch (err) {
      console.log(err);
    }
  }
  async function getBooksFeedbacksNameBook() {
    try {
      const { data } = await api.get("/bookSummary/bookName/" + search);
      setBookSummary(data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (search) {
      getBooksFeedbacksNameBook();
    } else {
      getBooksFeedbacks();
    }
  }, [search]);
  const navigate = useNavigate();

  const handleViewFeedback = (id: string) => navigate(`/feedback-book/${id}`);
  return (
    <div
      className={`${
        !bookSummary ? "flex items-center justify-center w-full h-full" : ""
      } p-4`}
    >
      {bookSummary && <Search handleValue={setSearch} value={search} />}

      {bookSummary ? (
        bookSummary?.map((item) => (
          <div
            key={item.id}
            onClick={() => handleViewFeedback(item.id)}
            className="flex items-center gap-8 cursor-pointer hover:shadow-lg py-2 hover:scale-105 transition-all hover:bg-neutral-400 hover:rounded-md mt-2 px-2"
          >
            <div className="py-4 w-44">
              <img
                src={item.bookImage}
                className="w-56 h-44 rounded-lg object-cover"
                alt=""
              />
            </div>
            <div className="w-full flex flex-col">
              <div className="justify-between flex w-full">
                <h1 className="text-2xl">{item.bookName}</h1>
                <div className="flex items-end gap-2 flex-col justify-end">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.user.avatarURL}
                      className="w-8 h-8 rounded-full"
                      alt={item.user.name}
                    />
                    <span>{item.user.name},</span>
                  </div>
                  <span className="text-xs">
                    {item?.summaryDate &&
                      format(
                        new Date(item.summaryDate),
                        "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
                        { locale: ptLocale }
                      )}
                  </span>
                </div>
              </div>
              <div className="flex items-start  flex-col">
                <span className="font-semibold">{item.bookAuthor}</span>
              </div>
              <span
                className="mt-4"
                dangerouslySetInnerHTML={{
                  __html:
                    item.summary.length > 400
                      ? `${item.summary.slice(0, 400)}...`
                      : item.summary,
                }}
              />
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center w-full h-full mt-14">
          <div className="flex items-center w-full h-full justify-between">
            <div className="flex flex-col gap-8 w-1/2 h-full">
              <h1 className="text-6xl">
                Resumos inteligentes, comunidade apaixonada:{" "}
                <span className="text-violet-800 font-bold capitalize">
                  Books Feedbacks.
                </span>
              </h1>
              <span className="text-xl mt-10">
                <p>
                  Explore o mundo dos livros de forma rápida e inteligente com o
                  Books Feedbacks! Aqui, mergulhe em resumos concisos que
                  capturam a essência de cada obra, permitindo que absorva
                  conhecimento em minutos.
                </p>
                <br />
                <p>
                  Além disso, seja parte de uma comunidade apaixonada por
                  leitura, compartilhando insights, recomendações e opiniões
                  sobre os livros que amamos.
                </p>
                <br />
                <p>
                  Juntos, expandimos horizontes literários e celebramos a magia
                  das palavras.
                </p>
              </span>
              <div className="flex gap-8 mt-8">
                <button
                  onClick={() => navigate("/login")}
                  className="p-2 border border-violet-800 bg-violet-800 text-white rounded-md w-52"
                >
                  Acessar
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="underline text-violet-800"
                >
                  Registra-se
                </button>
              </div>
            </div>
            <div className="w-1/2 h-full ">
              <img src={img} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
