import React, { Component } from 'react';
import Odometer from 'react-odometerjs';

import './PopularStatsItem.css';

class PopularStatsItem extends Component {
  constructor(props) {
    super(props)
    this.handleGoToStat = this.handleGoToStat.bind(this);
  }
  handleGoToStat(url) {
    console.log('Go to:', url);
  }
  render() {
    const {info, title, unit, explanation} = this.props;
    return (
      <div className="PopularStatsItem-column" onClick={() => this.handleGoToStat('marketPrice Url')}>
        <div className="PopularStatsItem-title">{title}</div>
        <div className="PopularStatsItem-link">
          {/*<span>{this.props.inDollars ? '$' : null}</span>*/}
          <Odometer value={info} />
          <div>{unit}</div>
        </div>
        <div className="PopularStatsItem-explanation">{explanation}</div>
      </div>
    )
  }
}

export default PopularStatsItem;