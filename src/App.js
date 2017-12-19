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
  
  componentDidMount(){
    /*
    if (!this.state.bitfinexData.length) {
      fetch('http://localhost:8080/api/poc').then(res => res.json()).then((data) => {
        this.setState({
          bitfinexData: data
        });
      });
    }
    */
  }

  render() {
    const { bitfinexData } = this.state;

    return (
      <div className="App">
        <h1>Crypto app</h1>

        <ExchangeApiInputs exchanges={EXCHANGES} />
      
        {bitfinexData.length ? (
          <div>
            {/* <h4>Bitfinex Balances</h4> */}
            <ul>
              {/*bitfinexData.map((d) =>
                <li key={d.currency}>
                  <b>{d.currency.toUpperCase()}</b>: {d.amount}
                </li>
              )*/}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
