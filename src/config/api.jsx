export const coinlist = (currency)=>`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&price_change_percentage=1h`

export const singleCoin = (id) =>`https://api.coingecko.com/api/v3/coins/${id}`

export const trendingCoins = (currency)=>`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`

export const historicChart = (id,days = 365,currency)=>`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`