import React, { Component } from 'react';

class ExchangeApiInputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exchanges: []
    }
  }

  componentDidMount() {
    const { exchanges } = this.props;
    let exchangesAsObjs = [];
    exchanges.map((e) =>
      exchangesAsObjs = [...exchangesAsObjs, { name: e}]
    );
    this.setState({
      exchanges: exchangesAsObjs
    });
  }
  
  getExchangeInState(str) {
    return this.state.exchanges.find((e) => e.name === str);
  }

  onInputChange = (ev) => {
    const dataKey = ev.target.dataset.key;
    const exchanges = this.state.exchanges;
    const exchangeInState = this.getExchangeInState(ev.target.name);

    if (dataKey === 'apiKey') {
      exchangeInState.apiKey = ev.target.value; 
    }
    if (dataKey === 'apiSecret') {
      exchangeInState.apiSecret = ev.target.value;
    }
    this.setState({
      exchanges
    });
  }

  onButtonClick = (ev) => {
    const exchangeInState = this.getExchangeInState(ev.target.dataset.provider);
    this.props.onSubmitForm(exchangeInState);
  }

  buttonDisabled(name) {
    if (name === 'Bitfinex' ||
        name === 'Bittrex') {
      return false;
    }
    return true;
  }

  render() {
    const { exchanges } = this.state;

    return (
      <div className="exchange-api-inputs">
        {exchanges.map((e) =>
          <div key={e.name} className="exchange-input-box-container">
            <div className="exchange-input-box-container-inner">
              <h3>{e.name}</h3>

              <label>API key</label>
              <input
                type="text"
                onChange={this.onInputChange}
                placeholder="asdfADSFasdfASDFasdfADSFasdfASDF"
                name={e.name}
                data-key="apiKey"
                className="input-on-dark"
              />

              <label>API secret</label>
              <input
                type="text"
                onChange={this.onInputChange}
                placeholder="FDSAfdsaFDSAfdsaFDSAfdsaFDSAfdsa"
                name={e.name}
                data-key="apiSecret"
                className="input-on-dark"
              />
              <button
                onClick={this.onButtonClick}
                data-provider={e.name}
                disabled={this.buttonDisabled(e.name)}
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ExchangeApiInputs;
