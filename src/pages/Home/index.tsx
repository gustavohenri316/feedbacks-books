import { useEffect, useState } from "react";
import { Search } from "../../components/Search";
import { api } from "../../services/api";

type BookSummaryResponse = {
  id: string;
  title: string;
  summary: string;
  bookName: string;
  bookAuthor: string;
  userId: string;
};

function Home() {
  const [bookSummary, setBookSummary] = useState<BookSummaryResponse[]>([]);
  async function getBooksFeedbacks() {
    const { data } = await api.get("/bookSummary");
    setBookSummary(data);
  }
  useEffect(() => {
    getBooksFeedbacks();
  }, []);

  return (
    <div className="p-4">
      <Search handleValue={() => {}} />

      {bookSummary.map((item) => (
        <div key={item.id}>{item.bookName}</div>
      ))}
    </div>
  );
}

export default Home;
