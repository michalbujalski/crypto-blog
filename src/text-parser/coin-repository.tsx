import { fetchCoins, fetchPrice } from '../api';

export interface Coin {
  id: string,
  symbol: string,
  name: string
}

export const saveCoinToCache = (coin: Coin) => {
  coinCache.set(coin.symbol, coin);
}

export const getCoinFromCache = (coinSymbol: string) => coinCache.get(coinSymbol);

export const clearCache = () => {
  priceCache.clear();
  coinCache.clear();
}

const coinCache = new Map<string, Coin>();

export const getCoin = async (coinSymbol: string): Promise<Coin> => {
  if (!getCoinFromCache(coinSymbol)) {
    const data = await fetchCoins();
    data.forEach(coin => saveCoinToCache(coin));
  }
  const currency = coinCache.get(coinSymbol);
  if (currency) {
    return currency;
  } else {
    throw new Error(`No coin with code ${coinSymbol}`);
  }
}

export const getCoinName = async (coinSymbol: string): Promise<string> => {
  const currency = await getCoin(coinSymbol);
  return currency.name;
}

export interface CoinPrice {
  value: number,
  currency: string,
  symbol: string
}

const priceCache = new Map<string, CoinPrice>();

export const savePriceToCache = (coinPrice: CoinPrice) => {
  priceCache.set(coinPrice.symbol, coinPrice);
}

export const getPriceFromCache = (coinSymbol: string) => priceCache.get(coinSymbol)

export const getCoinPrice = async (coinSymbol:string): Promise<number> => {
  if (!getPriceFromCache(coinSymbol)) {
    const coin: Coin = await getCoin(coinSymbol);
    const coinPrice: CoinPrice = await fetchPrice(coin.id);
    savePriceToCache(coinPrice);
    return coinPrice.value;
  }
  const price = getPriceFromCache(coinSymbol);
  if (price) {
    return price.value;
  }

  throw new Error(`No price with code ${coinSymbol}`);
}