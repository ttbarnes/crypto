import React, { Component } from 'react';
import {
  API_ROOT,
  API_ROOT_BITTREX,
  API_ROOT_GDAX,
  POSSIBLE_EXCHANGES
} from '../../constants';


const isBitfinex = (str) => str === POSSIBLE_EXCHANGES[0];
const isBittrex = (str) => str === POSSIBLE_EXCHANGES[1];
const isGDAX = (str) => str === POSSIBLE_EXCHANGES[2];

class Balances extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bitfinexData: [],
      bittrexData: [],
      gdaxData: []
    }
  }

  getExchangeData = (exchange) => {
    const params = {
      name: exchange.name,
      secret: exchange.apiSecret,
      key: exchange.apiKey
    };

    if (isBitfinex(exchange.name)) {
      const url = new URL(API_ROOT);
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      fetch(url).then(res => res.json()).then((data) => {
        this.setState({
          bitfinexData: data
        });
      });
    } else if (isBittrex(exchange.name)) {
      const url = new URL(API_ROOT_BITTREX);
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      fetch(url).then(res => res.json()).then((data) => {
        this.setState({
          bittrexData: data
        });
      });
    } else if (isGDAX(exchange.name)) {
      const url = new URL(API_ROOT_GDAX);
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      fetch(url).then(res => res.json()).then((data) => {
        this.setState({
          gdaxData: data
        });
      });
    }
  }
 
  render() {
    const {
      bitfinexData,
      bittrexData
    } = this.state;

    return (
      <div className="App">
        <h2>Balances</h2>

        <div className="balances-input-container">
          {!bitfinexData.length && <p><small>Connect with an exchange to get your balances</small></p>}

          {bitfinexData.length ? (
            <div>
              <h5>Bitfinex Balances</h5>
              <ul>
                {bitfinexData.map((d) =>
                  <li key={d.currency}>
                    <b>{d.currency.toUpperCase()}</b>: {d.amount}
                  </li>
                )}
              </ul>
            </div>
          ) : null}

          {bittrexData.result ? (
            <div>
              <h5>Bittrex Balances</h5>
              {bittrexData.result === [] &&
                <div>0 monies - empty</div>
              }
              {(bittrexData && bittrexData.result && bittrexData.result.length) &&
                <ul>
                  {bittrexData.result.map((d) =>
                    <li key={d.currency}>
                      <b>{d.currency.toUpperCase()}</b>: {d.amount}
                    </li>
                  )}
                </ul>
              }
            </div>
          ) : null}
        </div>
       
      </div>
    )
  };
}

export default Balances;
