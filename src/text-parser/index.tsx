import { getCoinName, getCoinPrice } from './coin-repository';

export enum Method {
  Name = 'Name',
  Price = 'Price'
};

export interface Tag {
  method: Method,
  argument: string
}

export const parseMethod = (rawMethod: string): Method => {
  switch(rawMethod){
    case Method.Name:
      return Method.Name;
    case Method.Price:
      return Method.Price;
    default:
      throw new Error(`Unknown method ${rawMethod}`);
  }
}

export const parseTag = (rawTag: string): Tag => {
  const sanitized = rawTag.replace(/[ {}]/g,'').split('/');
  return { method: parseMethod(sanitized[0]), argument: sanitized[1] };
}

export const findTags = (text: string): Tag[] => {
  const regex = /{{( +)?\w+( +)?\/( +)?\w+( +)?}}/g;
  let match = regex.exec(text);
  let tags: Array<Tag> = [];
  while( match != null ){
    tags.push(parseTag(match[0]));
    match = regex.exec(text);
  }
  return tags;
}

export const createRequests = (
  tags: Tag[]
):Array<Promise<number>|Promise<string>> => (
  tags.map((tag: Tag) => getCurrencyData(tag))
)

export const getCurrencyData = (tag: Tag):Promise<number>|Promise<string> => {
  switch(tag.method){
    case Method.Name:
      return getCoinName(tag.argument);
    case Method.Price:
      return getCoinPrice(tag.argument);
    default:
      throw new Error(`Unknown method ${Method.Name}`);
  }
};