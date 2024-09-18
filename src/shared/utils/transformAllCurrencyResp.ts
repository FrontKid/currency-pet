import { ICurrency } from '@/entities/currency';

const transformAllCurrencyResp = (data?: ICurrency) => {
  if (!data) return [];
  return Object.keys(data);
};

export { transformAllCurrencyResp };
