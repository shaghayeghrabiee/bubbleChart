import React from "react";
import TableContent from "./TableContent1";
import ChartD3 from "./ChartD3";
import { apiData } from "./staticData";
import BubbleChart from "./BubbleChart";


const Landing = () => {

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {/* <ChartD3 data={apiData} /> */}
        <BubbleChart/>
        <TableContent />
      </div>
    </div>
  );
};

export default Landing;
