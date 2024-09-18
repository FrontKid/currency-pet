import { baseApi } from '@/shared/api';

interface ICurrency {
  [key: string]: string;
}

interface ICurrencyRates {
  [currency: string]: { [key: string]: number };
}

const CURRENCY_ENDPOINT = 'currencies';

const currencyApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllCurrency: builder.query<ICurrency, void>({
      query: () => `${CURRENCY_ENDPOINT}.json`,
      keepUnusedDataFor: 0,
    }),
    getExchangeRateData: builder.query<ICurrencyRates, string>({
      query: currencyAbbr => `${CURRENCY_ENDPOINT}/${currencyAbbr}.json`,
      keepUnusedDataFor: 0,
    }),
  }),

  overrideExisting: false,
});

export type { ICurrency, ICurrencyRates };
export const { useGetAllCurrencyQuery, useGetExchangeRateDataQuery } =
  currencyApi;
