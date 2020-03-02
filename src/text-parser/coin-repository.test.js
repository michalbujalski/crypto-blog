import * as coinRepository from './coin-repository';
import * as api from '../api';

describe('coin repository', () => {
  afterEach(() => {
    coinRepository.clearCache();
  })

  it('saving coin to cache', async () => {
    const coin = { id: 'coinId', symbol: 'BTC', name: 'bitcoin'};
    coinRepository.saveCoinToCache(coin);
    const cachedCoin = await coinRepository.getCoinFromCache('BTC')
    expect(cachedCoin).toMatchObject(coin);
  })

  it('saving coin price to cache', async () => {
    const coinPrice = { value: 123.11, currency: 'USD', symbol: 'BTC'};
    coinRepository.savePriceToCache(coinPrice);
    const cachedPrice = await coinRepository.getPriceFromCache('BTC')
    expect(cachedPrice).toEqual(coinPrice);
  })

  if('coin name not cached then fetch from api', async () => {
    const name = 'btc name';
    const coin = {
      id: 'coinId',
      name,
      symbol: 'BTC'
    };
    jest.spyOn(api, 'fetchCoins')
      .mockImplementation(() => Promise.resolve([coin]));
    
    const returnedName = await coinRepository.getCoinName('BTC');
    expect(returnedName).toEqual(name);
    expect(api.mock.calls).toHaveLength(1);
  })

  if('coin name cached then do not fetch them from api', async () => {
    const name = 'btc name';
    const coin = {
      id: 'coinId',
      name,
      symbol: 'BTC'
    };
    coinRepository.saveCoinToCache(coin);
    
    const returnedName = await coinRepository.getCoinName('BTC');
    expect(returnedName).toEqual(name);
    expect(api.mock.calls).toHaveLength(1);
  })

  it('if price not cached then fetch from price', async () => {
    const price = 333.21;
    const coinPrice = {value: price, currency: 'USD', symbol: 'BTC'};
    
    jest.spyOn(api, 'fetchPrice')
      .mockImplementation(() => Promise.resolve(coinPrice));
    
    const returnedPrice = await coinRepository.getCoinPrice('BTC');
    expect(api.fetchPrice.mock.calls).toHaveLength(1);
    expect(returnedPrice).toEqual(`$${price}`);
  })
  it('if price cached then do not fetch price from api', async () => {
    const price = 541.21;
    const coinPrice = {value: price, currency: 'USD', symbol: 'BTC'};
    coinRepository.savePriceToCache(coinPrice)
    
    const returnedPrice = await coinRepository.getCoinPrice('BTC');
    expect(api.fetchPrice.mock.calls).toHaveLength(1);
    expect(returnedPrice).toEqual(`$${price}`);
  })
})