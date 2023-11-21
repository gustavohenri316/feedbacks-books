import Comments from "../Comments";
import { format } from "date-fns";
import ptLocale from "date-fns/locale/pt";
import { BookSummaryResponse } from "../../pages/FeedbackBookView";

type Props = {
  book: BookSummaryResponse | null;
  id: string | undefined;
  handleLoading: () => void;
};

export default function CommentsViews({ book, id, handleLoading }: Props) {
  const sortedComments = book?.comments?.slice().sort((a, b) => {
    const dateA = new Date(a.commentDate).getTime();
    const dateB = new Date(b.commentDate).getTime();
    return dateB - dateA;
  });

  return (
    <div className="my-4 bg-neutral-300 p-4 rounded-md">
      <h1 className="text-xl">Comentários</h1>
      <Comments idBookSummary={id as string} handleLoading={handleLoading} />
      {sortedComments &&
        sortedComments.map((item) => (
          <div key={item.id} className="border rounded-md p-4">
            <div className="flex justify-between">
              <div className="flex gap-8">
                <div className="flex items-center gap-4 border-r px-4 w-48">
                  <img
                    src={item.user.avatarURL}
                    className="w-10 h-10 rounded-full"
                    alt=""
                  />
                  <div className="flex flex-col">
                    <span>{item.user.name}</span>
                  </div>
                </div>
                <span className="flex-1">{item.text}</span>
              </div>
              <div className="w-40 text-end whitespace-nowrap ml-4">
                <span className="text-sm">
                  {format(new Date(item.commentDate), "dd/MM/yy 'às' HH:mm", {
                    locale: ptLocale,
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
