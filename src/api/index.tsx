import { Coin, CoinPrice } from "../text-parser/coin-repository";

const BASE_URL = 'https://api.coinpaprika.com/v1'

export const fetchCoins = async (): Promise<Array<Coin>> => {
  const response = await fetch(`${BASE_URL}/coins`);
  const data = await response.json();
  return data as Array<Coin>;
}

export const fetchPrice = async (coinId: string): Promise<CoinPrice> => {
  const response = await fetch(`${BASE_URL}/exchanges/${coinId}`);
  const data = await response.json();

  return {
    symbol: data.symbol,
    value: data.quotes['USD'].price,
    currency: 'USD'
  } as CoinPrice
};

export const fetchName = (currencySYmbol: string): Promise<string> => {
  return Promise.resolve(currencySYmbol);
};
