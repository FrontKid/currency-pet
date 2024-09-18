import { Formik, Form } from 'formik';
import React, { useState } from 'react';

import {
  CURRENCY_VALUE_FROM,
  CURRENCY_VALUE_MAX_LENGTH,
  CURRENCY_VALUE_TO,
  getMultiplier,
  PRECISION,
  useGetAllCurrencyQuery,
  useGetExchangeRateDataQuery,
} from '@/entities/currency';

import { InputField, SelectField } from '@/shared/ui';
import {
  getDataWithoutSourceCurrency,
  transformAllCurrencyResp,
} from '@/shared/utils';

const Home = () => {
  const [currencyFrom, setCurrencyFrom] = useState('usd');
  const [currencyTo, setCurrencyTo] = useState('uah');

  const { data: allCurrency } = useGetAllCurrencyQuery();
  const { data: currencyByQuery, isLoading } =
    useGetExchangeRateDataQuery(currencyFrom);

  const availableCurrency = transformAllCurrencyResp(allCurrency);
  const dataWithoutSourceCurrency = getDataWithoutSourceCurrency(
    availableCurrency,
    currencyFrom,
  );

  const multiplier = getMultiplier(isLoading, currencyByQuery, {
    keyTo: currencyTo,
    keyFrom: currencyFrom,
  });
  return (
    <Formik
      initialValues={{
        currencyValueFrom: 0,
        currencyValueTo: 0,
      }}
      onSubmit={() => {}}
    >
      {({ values, setFieldValue }) => {
        const handleCurrencyValueFromChange = (value: string) => {
          if (value.length > CURRENCY_VALUE_MAX_LENGTH || isNaN(+value)) {
            return;
          }

          const convertedValue = +(+value * multiplier).toFixed(5);
          setFieldValue(CURRENCY_VALUE_FROM, +value);
          setFieldValue(CURRENCY_VALUE_TO, convertedValue);
        };

        const handleCurrencyValueToChange = (value: string) => {
          if (value.length > CURRENCY_VALUE_MAX_LENGTH || isNaN(+value)) {
            return;
          }

          const convertedValue = +(+value / multiplier).toFixed(5);
          setFieldValue(CURRENCY_VALUE_TO, +value);
          setFieldValue(CURRENCY_VALUE_FROM, convertedValue);
        };

        return (
          <Form className="p-8 flex flex-col gap-8 max-w-4xl mx-auto">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">
                Currency Converter
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <SelectField
                    label="From"
                    id="currency-from"
                    name="currencyFrom"
                    data={availableCurrency}
                    value={currencyFrom}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setFieldValue(CURRENCY_VALUE_FROM, 0);
                      setFieldValue(CURRENCY_VALUE_TO, 0);

                      setCurrencyFrom(e.target.value);
                    }}
                  />

                  <InputField
                    name={CURRENCY_VALUE_FROM}
                    value={values.currencyValueFrom}
                    onBlur={() => {
                      setFieldValue(
                        CURRENCY_VALUE_FROM,
                        +(values.currencyValueTo / multiplier).toFixed(
                          PRECISION,
                        ),
                      );
                    }}
                    onClick={() => {
                      setFieldValue(
                        CURRENCY_VALUE_FROM,
                        Math.round(values.currencyValueFrom),
                      );
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleCurrencyValueFromChange(e.target.value);
                    }}
                  />
                </div>

                <div className="flex flex-col">
                  <SelectField
                    label="To"
                    id="currency-to"
                    name="currencyTo"
                    value={currencyTo}
                    data={dataWithoutSourceCurrency}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setCurrencyTo(e.target.value);
                      setFieldValue(CURRENCY_VALUE_FROM, 0);
                      setFieldValue(CURRENCY_VALUE_TO, 0);
                    }}
                  />

                  <InputField
                    name={CURRENCY_VALUE_TO}
                    value={values.currencyValueTo}
                    onBlur={() => {
                      setFieldValue(
                        CURRENCY_VALUE_TO,
                        +(values.currencyValueFrom * multiplier).toFixed(
                          PRECISION,
                        ),
                      );
                    }}
                    onClick={() => {
                      setFieldValue(
                        CURRENCY_VALUE_TO,
                        Math.round(values.currencyValueTo),
                      );
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleCurrencyValueToChange(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export { Home };
