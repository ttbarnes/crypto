import React, { Component } from 'react';
import './App.css';
import ExchangeApiInputs from './ExchangeApiInputs';

const EXCHANGES = [
  'Bitfinex',
  'Exchange 2',
  'Test 3',
  'Something 4'
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bitfinexData: []
    }
  }

  getData = (exchange) => {
    if (exchange.name === EXCHANGES[0]) {
      const endpoint = `http://localhost:8080/api/poc`

      const params = {
        name: exchange.name,
        secret: exchange.apiSecret,
        key: exchange.apiKey
      }

      var url = new URL('http://localhost:8080/api/poc'), params;
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      fetch(url).then(res => res.json()).then((data) => {
        this.setState({
          bitfinexData: data
        });
      });
    }
  }

  render() {
    const { bitfinexData } = this.state;

    return (
      <div className="App">
        <h1>Crypto app</h1>

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
          </div>

        </div>

      </div>
    );
  }
}

export default App;
