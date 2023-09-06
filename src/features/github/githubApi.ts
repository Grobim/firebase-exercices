import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface GithubUserResponse {
  login: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  name: string;
}

interface GithubRepos {
  name: string;
  watchers_count: number;
  forks_count: number;
  html_url: string;
}

export const githubApi = createApi({
  reducerPath: 'github-api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com' }),
  endpoints: (builder) => ({
    getUser: builder.query<GithubUserResponse, string>({
      query: (userName) => `/users/${userName}`,
    }),
    getUserRepos: builder.query<GithubRepos[], string>({
      query: (userName) => `/users/${userName}/repos`,
    }),
  }),
});

export const { useGetUserQuery, useGetUserReposQuery } = githubApi;
