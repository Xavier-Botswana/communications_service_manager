import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class StackedColumnChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          height: 359,
          type: "bar",
          stacked: !0,
          toolbar: {
            show: 1,
          },
          zoom: {
            enabled: !0,
          },
        },
        plotOptions: {
          bar: {
            horizontal: !1,
            columnWidth: "15%",
            // endingShape: "rounded"
          },
        },
        dataLabels: {
          enabled: !1,
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        colors: ["#556ee6", "#f1b44c", "#34c38f"],
        legend: {
          position: "bottom",
        },
        fill: {
          opacity: 1,
        },
      },
      series: [
        {
          name: "E-money Requests",
          data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48],
        },
        {
          name: "Delivery Requests",
          data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22],
        },
        {
          name: "Withdrawal Requests",
          data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18],
        },
      ],
    };
  }

  render() {
    return (
      <React.Fragment>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height="359"
        />
      </React.Fragment>
    );
  }
}

export default StackedColumnChart;
