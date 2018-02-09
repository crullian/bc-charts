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

  componentWillMount() {
    // console.log('CHART DATA', this.props.chartData);
  }

  componentWillReceiveProps(nextProps) {
    // console.log('NEW CHART DATA', nextProps.chartData);
  }

  render() {
    // console.log('Chart Data', this.props.chartData);
    const {chartData, title} = this.props;
    let options = null;
    let fallbackData = null;
    let chartDataValues = null;

    if (chartData) {
      chartDataValues = {};
      chartDataValues.datasets = [];
      chartDataValues.datasets[0] = {};
      chartDataValues.datasets[0].fillColor = "#10ADE4"; //"#004a7c";
      chartDataValues.labels = [];
      chartDataValues.datasets[0].data = chartData.values.map(value => {
        chartDataValues.labels.push(''); // moment((value.x)*1000).format('MMM D YYYY'));
        return (value.y - 16150000) /100;
      });
      options = {
        scaleShowGridLines: false,
        scaleShowLabels: false,
        pointDot: false,
        // responsive: true,
        scaleOverride: true,
        scaleSteps: 2250,
        scaleStepWidth: 2,
        scales: {
          yAxes: [{
            ticks: {
                beginAtZero: false
            }
          }]
        }
      }
      console.log('chartDataValues', chartDataValues);
    } else {
      fallbackData = {
        labels: ['', '', '', '', '', '', ''],
        datasets: [
          {
            fillColor: "#10ADE4", //"#004a7c",
            data: Array.from({length: 40}, () => Math.floor(Math.random() * 60))
          }
        ]
      };
      options = {
        scaleShowGridLines: false,
        scaleShowLabels: false,
        pointDot: false,
        // responsive: true,
        scales: {
          yAxes: [{
            ticks: {
                beginAtZero: false
            }
          }]
        }
      }
      console.log('fallbackData', fallbackData);
    }
    
    return (
      <div className="CurrencyStatsItem-column" onClick={() => this.handleGoToChart('Url')}>
        <div className="CurrencyStatsItem-title">{title}</div>
        <LineChart data={chartDataValues || fallbackData} options={options} width="240" height="250" redraw />
      </div>
    )
  }
}

export default CurrencyStatsItem;