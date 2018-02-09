import React, { Component } from 'react';
import PopularStatsItem from './components/PopularStatsItem/PopularStatsItem';
import CurrencyStatsItem from './components/CurrencyStatsItem/CurrencyStatsItem';


import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marketPrice: 0,
      avgBlockSize: 0,
      transactionsPerDay: 0,
      mempoolSize: 0,
      totalBitCoinData: null
    };
    this.fetchChartsAndStats = this.fetchChartsAndStats.bind(this);
  }

  fetchChartsAndStats() {
    const statsUrl = 'https://api.blockchain.info/stats?format=json&cors=true';
    const chartsUrl = 'https://api.blockchain.info/charts/transactions-per-second?timespan=5weeks&rollingAverage=8hours&format=json&cors=true';
    const blockSizeUrl = 'https://api.blockchain.info/q/24hravgblocksize?cors=true';
    const mempoolSizeUrl = 'https://api.blockchain.info/charts/mempool-size?timespan=1days&format=json&cors=true';
    const totalBcUrl = 'https://api.blockchain.info/charts/total-bitcoins?cors=true&format=json&lang=en';
    const statsReq = fetch(statsUrl);
    const chartsReq = fetch(chartsUrl);
    const blockSizeReq = fetch(blockSizeUrl);
    const mempoolSizeReq = fetch(mempoolSizeUrl);
    const totalBcReq = fetch(totalBcUrl);

    Promise.all([statsReq, chartsReq, blockSizeReq, mempoolSizeReq, totalBcReq]).then(responses => responses.map(res => {
      if (res.ok === false) {
        console.error(`Network response was not ok: ${res}`)
      }
      return res.json();
    }))
    .then(jsonPromises => Promise.all(jsonPromises))
    .then(jsonResponses => {
      // console.log('response', jsonResponses);
      this.setState({
        marketPrice: Number((Math.ceil(jsonResponses[0].market_price_usd * 1000) / 1000).toFixed(2)),
        avgBlockSize: Number(Math.max( Math.round(jsonResponses[2] * 100) / 100).toFixed(2)),
        transactionsPerDay: jsonResponses[0]['n_tx'],
        mempoolSize: Math.ceil(jsonResponses[3].values[jsonResponses[3].values.length - 1].y),
        totalBitCoinData: jsonResponses[4] 
      })
    })
    .catch(err => console.error('Error in fetch :_(', err));
  }

  componentWillMount() {
    this.fetchChartsAndStats();
  }

  render() {
    const {
      marketPrice,
      avgBlockSize,
      transactionsPerDay,
      mempoolSize,
      totalBitCoinData
    } = this.state;

    // console.log('STATE', this.state);

    return (
      <div className="App">
        <header className="App-header">
        </header>

        <section className="App-section popular">
          <h2 className="App-section-title">Popular Stats</h2>

          <div className="App-stat-row">

            <PopularStatsItem 
              info={marketPrice}
              inDollars={true}
              title={'Market Price (USD)'}
              unit={'USD'}
              explanation={'Average USD market price across major bitcoin exchanges.'}
            />

            <PopularStatsItem
              info={avgBlockSize}
              title={'Average Block Size'}
              unit={'Megabytes'}
              explanation={'The 24 hour average block size in MB.'}
            />

            <PopularStatsItem
              info={transactionsPerDay}
              title={'Transactions per Day'}
              unit={'Transactions'}
              explanation={'The aggregate number of confirmed Bitcoin transactions in the past 24 hours.'}
            />

            <PopularStatsItem
              info={mempoolSize}
              title={'Mempool Size'}
              unit={'Bytes'}
              explanation={'The aggregate size of transactions waiting to be confirmed.'}
            />

          </div>
        </section>

        <section className="App-section currency">
          <h2 className="App-section-title">Currency Statistics</h2>
          <div className="App-stat-row">

            <CurrencyStatsItem
              chartData={totalBitCoinData}
              title={totalBitCoinData ? totalBitCoinData.name : null}
            />

            <CurrencyStatsItem
              title={'Market Price (USD)'}
            />

            <CurrencyStatsItem
              title={'Market Capitalization'}
            />

            <CurrencyStatsItem
              title={'USD Exchange Trade Volume'}
            />

          </div>
        </section>
      </div>
    );
  }
}

export default App;
