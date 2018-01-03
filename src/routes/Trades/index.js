import React, { Component } from 'react';
import {
  CMC_BASE
} from '../../constants';

// Need to be able to POST trades made to BE and be maintainable.
// No. of Coins, Price, Date (Optional), Time (Optional)
// CMC Data needed for calculating gains / losses in selected currency and satoshi

class Trades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setCurrency: 'GBP',
      coinList: ['bitcoin', 'tron', 'iota', 'ethereum', 'ripple'],
    };
    this.getCMCData();
  }

  // Move to redux action at some point
  getCMCData = () => {
    const setCurrency = this.state;

    const url = new URL(`${CMC_BASE}?convert=${setCurrency}`);

    fetch(url).then(res => res.json()).then((data) => {
      this.setState({
        coinMarketCapData: data
      });
      console.log(data);
    });
  }
 
  render() {
    return (
      <div className="App">
        <h2>Trades</h2>   
      </div>
    )
  };
}

export default Trades;
