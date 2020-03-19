This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Descirption

## Description

This is a simple input text parsert that inserts fetched values according to specified rules.

## Assumptions

- Site containes two fields - input and output
- You can input any text into left field
- The text is parsed acordding to these rules:

```{{ Name/<crypto_code> }}```

returns currency name e. g. `{{ Name/BTC }}` returns `Bitcoin`

```{{ Price/<crypto_code> }}```

returns currency name e. g. `{{ Price/BTC }}` returns `$6110.12`

- All the data is fetched from https://api.coinpaprika.com

## Demo 

See working code at:

https://michalbujalski.github.io/crypto-blog-site/

### Run dev

`npm start`

### Run tests

`npm test`

### Build production

`npm run build`

