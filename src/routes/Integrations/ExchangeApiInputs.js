import React, { Component } from 'react';
import { connect } from 'react-redux';

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

  getUserExchange(name) {
    const { userExchanges } = this.props;
    return userExchanges.find(e => e.exchange === name);
  }

  userExchangeExists(exchangeName) {
    const { userExchanges } = this.props;
    if (
      (userExchanges && userExchanges.length) &&
      this.getUserExchange(exchangeName)
    ) {
      return true;
    }
    return false;
  }

  render() {
    const {
      exchangePromise,
      userExchanges
    } = this.props;

    const {
      exchanges
    } = this.state;

    if (!userExchanges) { return null; }

    return (
      <div className="exchange-api-inputs">

        {exchanges.map((e) => 
          <div key={e.exchange} className="exchange-input-box-container">
            <div className="exchange-input-box-container-inner">

              {(exchangePromise && exchangePromise.exchange === e.exchange) &&
                <div>
                  {exchangePromise.isLoading &&
                    <div className="exchange-input-box-promise-state-overlay">
                      <p style={{ opacity: '.8' }}><small>Connecting antimatter particles</small></p>
                      <div className="loader" />
                    </div>
                  }
                  {exchangePromise.hasError &&
                    <div className="exchange-input-box-promise-state-overlay"><p>Error :(</p></div>
                  }
                  {exchangePromise.isSuccess &&
                    <div className="exchange-input-box-promise-state-overlay"><p>Success! 🚀</p></div>
                  }
                </div>
              }
              

              <h3>{e.exchange}</h3>

              {this.userExchangeExists(e.exchange) ? 
                <div>
                  <p>Already integrated, awesome! 😊 🎉</p>
                  <p><small>API key: {this.getUserExchange(e.exchange).key}</small></p>
                  <p><small>API secret: {this.getUserExchange(e.exchange).secret}</small></p>
                </div>
              :
                <div>
                  <form onSubmit={ev => this.onButtonClick(ev)}>
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
              }
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userExchanges: state.user.profile.keys
  }
}

export default connect(
  mapStateToProps,
  null
)(ExchangeApiInputs);
