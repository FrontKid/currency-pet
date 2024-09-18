const getDataWithoutSourceCurrency = (
  data: string[],
  sourceCurrency: string,
) => {
  return data.filter(currency => currency !== sourceCurrency);
};

export { getDataWithoutSourceCurrency };
