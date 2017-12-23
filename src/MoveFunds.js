import React, { Component } from 'react';
import { EXCHANGES } from './constants';

let MOCK_EXCHANGES_WITH_BALANCES = [];

EXCHANGES.map((e) => {
  const newObj = {
    name: e,
    balances: [
     {
        name: 'bitcoin',
        amount: 8.99992
      },
      {
        name: 'litecoin',
        amount: 0.4342411
      },
      {
        name: 'iota',
        amount: 2.889
      } 
    ]
  };
  if (e === 'Bittrex') {
    newObj.balances = [
      {
        amount: 0, 
        name: 'bitcoin'
      },
      {
        name: 'iCoin',
        amount: 8.99992
      },
      {
        name: 'crypCoin',
        amount: 0.4342411
      },
      {
        name: 'anotherCoin',
        amount: 2.889
      }
    ]
  }
  MOCK_EXCHANGES_WITH_BALANCES.push(newObj);
  return e;
});

class MoveFunds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromSelected: '',
      toSelected: '',
      fromSelectedFinal: {},
      toSelectedFinal: {}
    }
  };

  onExchangeWalletSelect(ev, relevance) {
    const value = ev.target.value;
    if (relevance === 'from') {
      this.setState({
        fromSelected: value
      })
    } else if (relevance === 'to') {
      this.setState({
        toSelected: value
      })
    }
  }

  getExchangeWallet(str) {
    return MOCK_EXCHANGES_WITH_BALANCES.find((e) => e.name === str);
  }

  onExchangeWalletCurrencySelected(wallet, currency, amount, relevance) {
    if (relevance === 'from') {
      this.setState({
        fromSelectedFinal: {
          wallet,
          currency,
          amount
        }
      })
    } else if (relevance === 'to') {
      this.setState({
        toSelectedFinal: {
          wallet,
          currency,
          amount
        }
      })
    }
  }

  render() {
    const {
      fromSelected,
      toSelected,
      fromSelectedFinal,
      toSelectedFinal
    } = this.state;

    const fromSelectedWallet = this.getExchangeWallet(fromSelected);
    const toSelectedWallet = this.getExchangeWallet(toSelected);

    return (
      <div className="move-funds">

        <div className="flex-cols-container">

          <div>
            <h4>From</h4>
            <select onChange={(ev) => this.onExchangeWalletSelect(ev, 'from')}>
              <option defaultValue>Select exchange wallet</option>
              {MOCK_EXCHANGES_WITH_BALANCES.map((o) =>
                <option key={o.name} value={o.name}>{o.name}</option>
              )}
            </select>
            {fromSelectedWallet &&
              <div>
                <ul>
                  {fromSelectedWallet.balances.map((b) =>
                    <li key={b.name}
                        style={{ display: 'flex', margin: '.5em 0' }}
                        className={(toSelectedFinal.currency && b.name !== toSelectedFinal.currency) ? 'selected-wallet-list-item-disabled' : ''}
                    >
                      {b.name}: {b.amount}
                      <button
                        onClick={() => this.onExchangeWalletCurrencySelected(fromSelectedWallet.name, b.name, b.amount, 'from')}
                        className="button-sm"
                        disabled={(toSelectedFinal.currency && b.name !== toSelectedFinal.currency)}
                      >select</button>
                    </li>
                  )}
                </ul>
              </div>
            }
          </div>

          <div>
            <h4>To</h4>
            <select onChange={(ev) => this.onExchangeWalletSelect(ev, 'to')}>
              <option defaultValue>Select exchange wallet</option>
              {MOCK_EXCHANGES_WITH_BALANCES.map((o) =>
                <option key={o.name} value={o.name}>{o.name}</option>
              )}
            </select>
            {toSelectedWallet &&
              <div>
                <ul>
                  {toSelectedWallet.balances.map((b) =>
                    <li key={b.name}
                        style={{ display: 'flex', margin: '.5em 0' }}
                        className={(fromSelectedFinal.currency && b.name !== fromSelectedFinal.currency) ? 'selected-wallet-list-item-disabled' : ''}>
                      {b.name}: {b.amount}
                      <button
                        onClick={() => this.onExchangeWalletCurrencySelected(toSelectedWallet.name, b.name, b.amount, 'to')}
                        className="button-sm"
                        disabled={b.name !== fromSelectedFinal.currency}
                      >select</button>
                    </li>
                  )}
                </ul>
              </div>
            }
          </div>

        </div>

        {(fromSelectedFinal.amount || toSelectedFinal.amount) &&
          <div className="flex-cols-container move-funds-summary">
            <div>
              <h4>...Moving...</h4>
              {fromSelectedFinal.wallet &&
                <div>
                  <p>{fromSelectedFinal.amount} {fromSelectedFinal.currency} from {fromSelectedFinal.wallet}</p>
                </div>
              }
              {' '}to...{' '}
              {!toSelectedFinal.wallet && <p>please select</p>}
              {toSelectedFinal.wallet &&
                <div>
                  <p>{toSelectedFinal.wallet} {toSelectedFinal.currency} wallet</p>
                </div>
              }
              <button
                className="block"
                disabled={!fromSelectedFinal.currency || !toSelectedFinal.currency}
              >Make it happen</button>
            </div>
          </div>
        }

      </div>
    );
  }
}

export default MoveFunds;
