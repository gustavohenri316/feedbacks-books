import axios from "axios";

const baseUrl = "https://www.googleapis.com/books/v1";
const apiKey = "AIzaSyBLNJPlXt9oegE4HOsUJPmyt9owOEQbHAw";

interface IGetBooks {
  page?: number;
  maxResults?: number;
  searchParams: string;
}

export async function getBooks({
  page = 1,
  maxResults = 1,
  searchParams,
}: IGetBooks) {
  const startIndex = (page - 1) * maxResults;
  const language = "pt";
  const response = await axios.get(
    `${baseUrl}/volumes?q=${searchParams}&key=${apiKey}&langRestrict=${language}&startIndex=${startIndex}&maxResults=${maxResults}`
  );
  return response.data;
}
