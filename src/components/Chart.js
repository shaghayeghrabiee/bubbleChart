import React, { useRef } from "react";
import HighchartsReact from "highcharts-react-official";
import './ChartPlus.css';

const Chart = ({ options, highcharts}) => {
  const chartRef = useRef(null);


  return (
    <div>
      <HighchartsReact
        highcharts={highcharts}
        constructorType={"chart"}
        options={options}
        ref={chartRef}
      />
     
    </div>
  );
};

export default Chart;
