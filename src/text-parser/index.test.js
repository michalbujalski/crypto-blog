import * as textParser from './index';
import { Method } from './index';
import * as coinRepository from './coin-repository';

describe('text parser',() => {
  it('parses Tag from string', () => {
    const testString = '{{ Name/BTC }}';
    const result = textParser.parseTag(testString);

    expect(result).toMatchObject({ method: Method.Name, argument: 'BTC'});
  })
  it('finds all tags in input text with properly formatted tags', () => {
    const testString = '{{ Name/BTC }}, {{ Price/CES }} some other text';
    const result = textParser.findTags(testString);

    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({ method: Method.Name, argument: 'BTC'});
    expect(result[1]).toMatchObject({ method: Method.Price, argument: 'CES'});
  })
  it('finds all tags in input text with tags with unexpected whitespaces', () => {
    const testString = '{{Price /BTC  }}, {{Name  /  LTC   }} some other text';
    const result = textParser.findTags(testString);

    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({ method: Method.Price, argument: 'BTC'});
    expect(result[1]).toMatchObject({ method: Method.Name, argument: 'LTC'});
  })
  it('parses method Name correctly', () => {
    const methodName = "Name";
    expect(textParser.parseMethod(methodName)).toBe(Method.Name)
  })
  it('parses method Price correctly', () => {
    const methodName = "Price";
    expect(textParser.parseMethod(methodName)).toBe(Method.Price)
  })
  it(`calls get currency for tag`, () => {
    jest.spyOn(coinRepository, 'getCoinName')
      .mockImplementation((symbol) => {
        return Promise.resolve('coin name'+symbol)
      });
    jest.spyOn(coinRepository, 'getCoinPrice')
      .mockImplementation(() => {
        return Promise.resolve(100.01)
      });

    const tags = [
      { method: Method.Price, argument: 'BTC' },
      { method: Method.Name, argument: 'MON' },
      { method: Method.Name, argument: 'LTC' }
    ];
    const result = textParser.createRequests(tags);
    expect(result).toHaveLength(3);
    expect(coinRepository.getCoinName.mock.calls).toHaveLength(2)
    expect(coinRepository.getCoinPrice.mock.calls).toHaveLength(1)
  })
  it(`returns fetch price function for method Name`, async () => {
    const tag = { method: Method.Name, argument: 'BTC' };
    jest.spyOn(coinRepository, 'getCoinName')
      .mockImplementation(name=>Promise.resolve(name));
    const result = await textParser.getCurrencyData(tag);
    expect(result).toBe('BTC')
  })
})