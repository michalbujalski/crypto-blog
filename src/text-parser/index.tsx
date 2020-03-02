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


const regex = /{{( +)?\w+( +)?\/( +)?\w+( +)?}}/g;

export const findTags = (text: string): Tag[] => {
  let match = regex.exec(text);
  let tags: Array<Tag> = [];
  while( match != null ){
    tags.push(parseTag(match[0]));
    match = regex.exec(text);
  }
  return tags;
}

export const replaceTagsWithValues = (
  arr: string[], text: string
): string => {
  arr = arr.reverse();
  let match = regex.exec(text);
  let parsedText = text;
  while( match != null ){
    const value = arr.pop()
    parsedText = parsedText.replace(match[0], value || '');
    match = regex.exec(text);
  }
  return parsedText;
}

export const parseText = async (rawText:string): Promise<string> => {
  const tags = findTags(rawText);
  const requests = createRequests(tags);
  const values = await Promise.all(requests);
  return replaceTagsWithValues(values, rawText);
}

export const createRequests = (
  tags: Tag[]
):Array<Promise<string>> => (
  tags.map((tag: Tag) => getCurrencyData(tag))
)

export const getCurrencyData = (tag: Tag):Promise<string> => {
  switch(tag.method){
    case Method.Name:
      return getCoinName(tag.argument);
    case Method.Price:
      return getCoinPrice(tag.argument);
    default:
      throw new Error(`Unknown method ${Method.Name}`);
  }
};