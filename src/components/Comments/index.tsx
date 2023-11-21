import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { bookComment } from "../../services/books.service";

type Props = {
  idBookSummary: string;
  handleLoading: () => void;
};

export default function Comments({ idBookSummary, handleLoading }: Props) {
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  function handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const inputText = event.target.value;
    const limitedText = inputText.slice(0, 200);
    setComment(limitedText);
  }

  const delay = (amount = 750) =>
    new Promise((resolve) => setTimeout(resolve, amount));

  async function addComment() {
    try {
      setLoading(true);
      await delay();
      await bookComment({
        idBookSummary,
        idUser: user?.id as string,
        text: comment,
      });
      handleLoading();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-neutral-300 rounded-md py-4">
      <div className="flex items-start gap-4 px-4">
        <img src={user?.avatarURL} className="w-10 h-10 rounded-full" alt="" />
        <div className="relative flex-1">
          <textarea
            rows={3}
            value={comment}
            onChange={handleInputChange}
            className="p-2 rounded-md w-full"
            placeholder="Adicione um comentário"
          />
          <div className="absolute bottom-1 right-2 text-gray-500 text-sm">
            {comment.length}/200
          </div>
        </div>
        <button
          className="p-2 bg-violet-800 rounded-md text-white disabled:opacity-50"
          onClick={addComment}
          disabled={loading}
        >
          {loading ? "Carregando..." : "Adicionar comentário"}
        </button>
      </div>
    </div>
  );
}
