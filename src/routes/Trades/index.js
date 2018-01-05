import React, { Component } from 'react';
import {
  CMC_BASE
} from '../../constants';
import './Trades.css';
import trades from './trades';

// Need to be able to POST trades made to BE and be maintainable.
// No. of Coins, Price, Date (Optional), Time (Optional)
// CMC Data needed for calculating gains / losses in selected currency and satoshi
// Track fiat purchases first and manually manage additional trades within the app

class Trades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setCurrency: 'GBP',
      coinList: [],
      loading: true,
      trades,
    };
    this.getCMCData();
  }

  // Move to redux action at some point
  getCMCData() {
    const { setCurrency } = this.state;

    const url = new URL(`${CMC_BASE}?convert=${setCurrency}&limit=80`);

    fetch(url).then(res => res.json()).then((data) => {
      this.setState({
        coinList: data,
        bitcoin: data[0],
      });
      this.calculateTrades();
      this.setState({
        loading: false,
      });
    });
  }

  calculateTrades() {
    const { trades, bitcoin } = this.state;
    trades.forEach((trade, i) => {
      const coin = this.getCoin(trade.to);
      trades[i].currentValue = (coin.price_btc * trade.coinAmount).toFixed(8);
    })
  }

  getCoin(coinSymbol) {
    const { coinList } = this.state;
    return coinList.find((coin) => {
      if (coin.symbol === coinSymbol) return coin;
    });
  };
 
  render() {
    const { trade, loading } = this.state;

    return (
      <div className="App">
        <h2>Trades</h2>
        <div className='trades-container'>
          <table>
            <tbody>
              <tr>
                <th>Purchase Type</th>
                <th>Amount</th>
                <th>Coin</th>
                <th>Coin Amount</th>
                <th>Current Value</th>
                <th>Trade Difference</th>
              </tr>
              {trades.map((trade) => (
                <tr key={trade.tradeId}>
                  <td>{trade.from} -> {trade.to}</td>
                  <td>{trade.currencyAmount}</td>
                  <td>{trade.to}</td>
                  <td>{trade.coinAmount}</td>
                  <td>{trade.currentValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>  
      </div>
    )
  };
}

export default Trades;
