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
      exchangesAsObjs = [...exchangesAsObjs, { exchange: e}]
    );
    this.setState({
      exchanges: exchangesAsObjs
    });
  }
  
  getExchangeInState(str) {
    return this.state.exchanges.find((e) => e.exchange === str);
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
    ev.preventDefault();
    const exchange = this.getExchangeInState(ev.target.dataset.provider);
    this.props.onSubmitForm(exchange);
  }

  buttonDisabled(exchange) {
    if (exchange === 'Bitfinex' ||
      exchange === 'Bittrex') {
      return false;
    }
    return true;
  }

  render() {
    const { exchangePromise } = this.props;
    const { exchanges } = this.state;

    return (
      <div className="exchange-api-inputs">

        {exchanges.map((e) =>
          <div key={e.exchange} className="exchange-input-box-container">
            <div className="exchange-input-box-container-inner">

              {(exchangePromise && exchangePromise.exchange == e.exchange) &&
                <div>
                  {exchangePromise.isLoading && <p>LOADING</p>}
                  {exchangePromise.hasError && <p>Error :(</p>}
                  {exchangePromise.isSuccess && <p>Success!</p>}
                </div>
              }

              <h3>{e.exchange}</h3>
              <form onSubmit={(ev) => this.onButtonClick(ev)}>
                <label>API key</label>
                <input
                  type="text"
                  onChange={this.onInputChange}
                  placeholder="asdfADSFasdfASDFasdfADSFasdfASDF"
                  name={e.exchange}
                  data-key="apiKey"
                  className="input-on-dark"
                />

                <label>API secret</label>
                <input
                  type="text"
                  onChange={this.onInputChange}
                  placeholder="FDSAfdsaFDSAfdsaFDSAfdsaFDSAfdsa"
                  name={e.exchange}
                  data-key="apiSecret"
                  className="input-on-dark"
                />
                <button
                  onClick={this.onButtonClick}
                  data-provider={e.exchange}
                  disabled={this.buttonDisabled(e.exchange)}
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ExchangeApiInputs;
