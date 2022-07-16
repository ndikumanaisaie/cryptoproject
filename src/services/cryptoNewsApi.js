/* eslint-disable no-undef */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
	'X-BingApis-SDK': 'true',
	'X-RapidAPI-Key': 'f785069e79msh30a64ed9d6f5737p1a19dajsn9013dcc0b1ab',
	'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
};

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
	reducerPath: 'cryptoNewsApi',
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		getCryptosNews: builder.query({
			query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=off&textFormat=Raw&freshness=Day&count=${count}`),
		}),
	}),
});

export const {
	useGetCryptosNewsQuery,
} = cryptoNewsApi;