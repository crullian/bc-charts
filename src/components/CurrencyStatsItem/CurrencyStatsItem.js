import React, { Component } from 'react';
import { Line as LineChart } from 'react-chartjs';
import moment from 'moment';

import './CurrencyStatsItem.css';


class CurrencyStatsItem extends Component {
  constructor(props) {
    super(props)
    this.handleGoToChart = this.handleGoToChart.bind(this);
  }

  handleGoToChart(url) {
    console.log('Go to:', url);
  }

  render() {
    const {chartData, title, explanation} = this.props;
    let fallbackData = null;
    let chartDataValues = null;
    let options = {
      scaleShowGridLines: false,
      scaleShowLabels: false,
      pointDot: false,
      scales: {
        yAxes: [{
          ticks: {
              beginAtZero: false
          }
        }]
      }
    };

    if (chartData) {
      chartDataValues = {};
      chartDataValues.datasets = [];
      chartDataValues.datasets[0] = {};
      chartDataValues.datasets[0].fillColor = "#10ADE4";
      chartDataValues.labels = [];
      chartDataValues.datasets[0].data = chartData.values.map(value => {
        chartDataValues.labels.push(''); // moment((value.x)*1000).format('MMM D YYYY'));
        return (value.y - 16150000) /100;
      });
      Object.assign(options, {
        scaleOverride: true,
        scaleSteps: 2250,
        scaleStepWidth: 2
      });
    } else {
      fallbackData = {
        labels: ['', '', '', '', '', '', ''],
        datasets: [
          {
            fillColor: "#10ADE4",
            data: Array.from({length: 7}, () => Math.floor(Math.random() * 60))
          }
        ]
      };
    }
    
    return (
      <div className="CurrencyStatsItem-column" onClick={() => this.handleGoToChart('Url')}>
        <div className="CurrencyStatsItem-title">{title || 'Loading...'}</div>
        <LineChart data={chartDataValues || fallbackData} options={options} width="240" height="250" />
        <div className="CurrencyStatsItem-explanation">{explanation}</div>
      </div>
    )
  }
}

export default CurrencyStatsItem;