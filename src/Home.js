import React, { Component } from 'react';
import ExchangeApiInputs from './ExchangeApiInputs';
import {
  API_ROOT,
  API_ROOT_BITTREX,
  API_ROOT_GDAX,
  EXCHANGES
} from './constants';
import './Home.css';


const isBitfinex = (str) => str === EXCHANGES[0];
const isBittrex = (str) => str === EXCHANGES[1];
const isGDAX = (str) => str === EXCHANGES[2];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bitfinexData: [],
      bittrexData: [],
      gdaxData: []
    }
  }

  getData = (exchange) => {
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
      // gdaxData
    } = this.state;

    return (
      <div className="App">

        <div className="balances-input-container">

          <div>
            <ExchangeApiInputs
              exchanges={EXCHANGES}
              onSubmitForm={this.getData}
            />
          </div>

          <div className="col-right">
            <h4>Balances</h4>

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

      </div>
    );
  }
}

export default App;
