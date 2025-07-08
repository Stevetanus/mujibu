import apiRoutes, { baseURL } from '@/routes/apiRoutes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const paymentApiService = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation<{ clientSecret: string }, { amount: number; email: string }>({
      query: (body) => ({
        url: `${apiRoutes.paymentURL}/create-payment-intent`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useCreatePaymentIntentMutation,
  util: { getRunningQueriesThunk },
} = paymentApiService;
