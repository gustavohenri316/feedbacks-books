import axios from "axios";
import { api } from "./api";

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

export async function fetchBooks() {
  const { data } = await api.get(`/bookSummary`);
  return data;
}

type CreateFeedbackBooksTypes = {
  payload: {
    summary: string;
    bookName: string;
    bookAuthor: string;
    bookImage: string;
  };
  userId: string | null;
};
export async function createFeedbackBooks({
  payload,
  userId,
}: CreateFeedbackBooksTypes) {
  const { data } = await api.post("/bookSummary/" + userId, payload);
  return data;
}

export async function findByIdFeedbackBooks(id: string) {
  const { data } = await api.get(`/bookSummary/${id}`);
  return data;
}

type BookCommentProps = {
  text: string;
  idUser: string;
  idBookSummary: string;
};
export async function bookComment({
  idBookSummary,
  idUser,
  text,
}: BookCommentProps) {
  const { data } = await api.post("/bookSummary/commentBookSummary", {
    idBookSummary,
    idUser,
    text,
  });
  return data;
}

type LikesBookSummaryProps = {
  bookId: string;
  userId: string;
};
export async function likesBookSummary({
  bookId,
  userId,
}: LikesBookSummaryProps) {
  const { data } = await api.post(
    `/bookSummary/likeBookSummary/${bookId}/${userId}`
  );
  return data;
}

type SendEmailBookProps = {
  bookId: string;
  userId: string;
};
export async function sendEmailBook({ bookId, userId }: SendEmailBookProps) {
  const { data } = await api.post(
    `/bookSummary/sendSummaryEmail/${bookId}/${userId}`
  );
  return data;
}
