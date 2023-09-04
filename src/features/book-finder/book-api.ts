import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface GetBookQueryParams {
  query: string;
  startIndex?: number;
}

export interface Book {
  id: string;
  volumeInfo: BookInfo;
}

interface BookInfo {
  title: string;
  authors: string[];
  publishedDate: string;
  publisher: string;
  canonicalVolumeLink: string;
  imageLinks: BookImageLinks;
}

interface BookImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

interface BookResponse {
  totalItems: number;
  items: Book[];
}

export const bookApi = createApi({
  reducerPath: 'book-api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.googleapis.com/books/v1' }),
  endpoints: (builder) => ({
    getBooks: builder.query<BookResponse, GetBookQueryParams>({
      query: ({ query, startIndex = 0 }) =>
        `/volumes?q=${query}&startIndex=${startIndex}&key=AIzaSyAHpra2RWu8ibKS9ByPM8WjP5mCe38f_Ck`,
      keepUnusedDataFor: 3600,
    }),
  }),
});

export const { useGetBooksQuery } = bookApi;
