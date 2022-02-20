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
        colors: ["#556ee6"],
        legend: {
          position: "bottom",
        },
        fill: {
          opacity: 1,
        },
      },
      series: [
        {
          name: "Enquiries",
          data: [0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
