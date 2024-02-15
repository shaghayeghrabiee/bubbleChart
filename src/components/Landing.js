import React from "react";
import TableContent from "./TableContent1";
import ChartBubble from "./ChartBubble";
import { apiData } from "./staticData";


const Landing = () => {

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <ChartBubble data={apiData} />
        <TableContent />
      </div>
    </div>
  );
};

export default Landing;
