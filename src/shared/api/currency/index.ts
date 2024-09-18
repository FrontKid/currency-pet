import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_CURRENCY_API }),
  endpoints: () => ({}),
});

export { baseApi };
