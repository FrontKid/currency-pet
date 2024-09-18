import { ICurrencyRates } from '../model/slice';

const getMultiplier = (
  isLoading: boolean,
  allCurrency: ICurrencyRates | undefined,
  keys: {
    keyTo: string;
    keyFrom: string;
  },
) => {
  if (!isLoading && allCurrency) {
    const rate = allCurrency[keys.keyFrom];

    if (rate && rate[keys.keyTo]) {
      return rate[keys.keyTo];
    }
  }

  return 1;
};

export { getMultiplier };
