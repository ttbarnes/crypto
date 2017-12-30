import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExchangeApiInputs from './ExchangeApiInputs';
import { postExchangeData } from '../../actions';
import {
  POSSIBLE_EXCHANGES
} from '../../constants';

class Integrations extends Component {

  onPostExchangeData = (exchange) => {
    this.props.onSubmitExchange(exchange);
  }

  render() {
    const { exchangePromise } = this.props;

    return (
      <div className="App">

        <h2>Integrations</h2>    

        <ExchangeApiInputs
          exchanges={POSSIBLE_EXCHANGES}
          onSubmitForm={this.onPostExchangeData}
          exchangePromise={exchangePromise}
        />
    
      </div> 
    )
  };
}

const mapStateToProps = (state) => {
  return {
    exchangePromise: state.uiState.exchangePromise
  }
}

const mapDispatchToProps = {
  onSubmitExchange: (exchange) => postExchangeData(exchange)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Integrations);


