import React, { useState } from "react";
import { apiData } from "./staticData";
import Highcharts from "highcharts";


import Chart from "./Chart";
import exporting from "highcharts/modules/exporting";
import highchartsMore from "highcharts/highcharts-more";
import Modal from "./Modal";

exporting(Highcharts);
highchartsMore(Highcharts);

const transformData = () => {
  return apiData.map((item) => ({
    symbol: item.symbol,
    iconURL: item.image,
    name: item.name,
    value: parseFloat(item.current_price.toFixed(2)),
    changes: item.price_change_percentage_24h,
    marketCap: item.market_cap,
    color: "transparent",
    marker: {
      lineWidth: 4,
      lineColor: item.price_change_percentage_24h > 0 ? "green" : "red",
    },
  }));
};

const BubbleChart = () => {
  const [open, setOpen] = useState(false);
  const [selectedBubble, setSelectedBubble] = useState(null);
  const handleBubbleClick = (event) => {
    setSelectedBubble(event.point);
    setOpen(true);
  };

  const chartOptions = {
    chart: {
      type: "packedbubble",
      height: "80%",
      margin: "0",
      spacing: ["0", "0", "0", "0"],
    },
    title: {
      text: "",
    },
    tooltip: {
      useHTML: true,
      pointFormat:
        "<b>{point.name}:</b> <br/> Symbol: {point.symbol} <br/> Price: {point.value}",
    },
    plotOptions: {
      packedbubble: {
        minSize: "40%",
        maxSize: "80%",
        zMin: 0,
        zMax: 1000,
        layoutAlgorithm: {
          splitSeries: false,
          gravitationalConstant: 0.02,
        },
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          formatter: function () {
             const contentHTML = `
            <div>
            ${this.point.symbol}
            </br>
            ${this.point.value}
            </div>
              `;
             return contentHTML;
          },
          style: {
            color: "#f7f7f7",
            textOutline: "none",
            fontWeight: "bold",
            fontSize: "20px",
          },
        },
        point: {
          events: {
            click: handleBubbleClick,
          },
        },
      },
    },
    series: [
      {
        data: transformData(),
      },
    ],
  };
  return (
    <div>
      <Chart options={chartOptions} highcharts={Highcharts} />
      {open && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <div className="flex flex-col justify-center items-center">
            <img
              src={selectedBubble.iconURL}
              alt={selectedBubble.iconURL}
              className="w-24 h-24 mb-12"
            />
            <div className="grid grid-cols-4 gap-12 m-auto">
              <div>
                <p className="font-semibold">Name:</p>
                <p>{selectedBubble.name}</p>
              </div>
              <div>
                <p className="font-semibold">Market Cap:</p>
                <p>{selectedBubble.marketCap}</p>
              </div>
              <div>
                <p className="font-semibold">Price:</p>
                <p>${selectedBubble.value}</p>
              </div>
              <div>
                <p className="font-semibold">Change:</p>
                <p>%{selectedBubble.changes}</p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BubbleChart;
