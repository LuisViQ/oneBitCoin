import { useState, useEffect } from 'react';

import { StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';

import CurrentPrice from './src/components/CurrentPrice';
import HistoryGraphic from './src/components/HistoryGraphic';
import QuotationsList from './src/components/QuotationsList';

function addZero(number) {
  return (number <= 9) ? "0" + number : number;
}

function convertDate(date) {
  return `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`;
}


function url(qtdDays) {
  return `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${qtdDays}`;
}

function normalizeDailyPrices(prices) {
  const pricesByDay = new Map();

  prices.forEach((item) => {
    const date = new Date(item[0]);
    const dayKey = convertDate(date);

    pricesByDay.set(dayKey, { timestamp: item[0], value: item[1] });
  });

  return Array.from(pricesByDay.values()).sort((a, b) => a.timestamp - b.timestamp);
}

async function getMarketChartData(apiUrl) {
  let response = await fetch(apiUrl);
  let returnApi = await response.json();

  if(returnApi.prices) {
    return normalizeDailyPrices(returnApi.prices);
  }

  return [];
}

function getQuotationList(prices) {
  return prices.map((item) => {
    const date = new Date(item.timestamp);
    return {
      date: `${addZero(date.getDate())}/${addZero(date.getMonth()+1)}/${date.getFullYear()}`,
      value: item.value.toFixed(2),
    };
  }).reverse();
}

function getGraphicList(prices) {
  return prices.map((item) => item.value);
}

function limitByDays(prices, totalDays) {
  if(prices.length <= totalDays) {
    return prices;
  }

  return prices.slice(prices.length - totalDays);
}

export default function App() {
  const [coinsList, setCoinsList] = useState([]);
  const [coinsGraphicList, setCoinsGraphicList] = useState([0]);
  const [days, setDays] = useState(30);
  const [price, setPrice] = useState("0.0000");

  function updateDay(number) {
    setDays(number);
  }

  useEffect(() => {
    let active = true;

    async function loadData() {
      const marketData = limitByDays(await getMarketChartData(url(days)), days);
      if(!active) return;

      setCoinsList(getQuotationList(marketData));
      setCoinsGraphicList(getGraphicList(marketData));

      if(marketData.length > 0) {
        setPrice(marketData[marketData.length - 1].value.toFixed(4));
      } else {
        setPrice("0.0000");
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, [days]);

  return (
    <SafeAreaView style={styles.container}>
      <CurrentPrice lastCotation={price}  />
      <HistoryGraphic infoDataGraphic={coinsGraphicList} />
      <QuotationsList
        filterDay={updateDay}
        listTransactions={coinsList}
        selectedDays={days}
      />
      <StatusBar
        backgroundColor="#f50d41"
        barStyle="light-content"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ?  40 : 0,
  },
});
