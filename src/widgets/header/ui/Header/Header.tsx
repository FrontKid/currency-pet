import { useGetExchangeRateDataQuery } from '@/entities/currency';
import { FC } from 'react';

type THeaderProps = object;

const Header: FC<THeaderProps> = () => {
  const { data: euroCurrency, isLoading: isLoadingEuro } =
    useGetExchangeRateDataQuery('eur');
  const { data: usdCurrency, isLoading: isLoadingUsd } =
    useGetExchangeRateDataQuery('usd');

  const eur = !isLoadingEuro && euroCurrency ? euroCurrency['eur']['uah'] : 0;
  const usd = !isLoadingUsd && usdCurrency ? usdCurrency['usd']['uah'] : 0;
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-semibold">Currency Exchange Rates</div>
      <div className="flex space-x-8">
        <span className="flex items-center space-x-2">
          <span className="font-medium">USD:</span>
          <span id="usd-rate" className="text-green-400">
            {usd.toFixed(2)}
          </span>
        </span>
        <span className="flex items-center space-x-2">
          <span className="font-medium">EUR:</span>
          <span id="eur-rate" className="text-blue-400">
            {eur.toFixed(2)}
          </span>
        </span>
      </div>
    </header>
  );
};
export { Header };
