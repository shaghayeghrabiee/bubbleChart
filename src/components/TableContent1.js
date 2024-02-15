import React from 'react'
import { tableColumns,apiData } from "./staticData";

const TableContent1 = () => {

  const fetchedData= apiData;
  console.log(fetchedData);
  return (
    <div className="my-4 lg:mx-60 md:mx-44 ">
      <div className="overflow-x-auto">
        <table className="scroll w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-x-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="bg-gray-800 text-white">
              {tableColumns.map((tC, index) => (
                <th key={index} scope="col" className="px-4 py-3">
                  {tC}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {apiData.map((tD, index) => (
              <tr
                key={index}
                className="bg-black border-b  border-gray-800 text-white hover:bg-gray-800"
              >
                <td className="px-4 py-4 ">{tD.id}</td>
                <td className="px-4 py-4 flex items-center">
                  <img
                    className="w-6 h-6 mr-2"
                    src={tD.image}
                    alt={tD.symbol}
                  />
                  {tD.name}
                </td>
                <td className="px-4 py-4">
                  $ {tD.current_price.toLocaleString()}
                </td>
                <td className="px-4 py-4">
                  $ {tD.market_cap.toLocaleString()}
                </td>
                <td className="px-4 py-4">$ {tD.current_price.toFixed(2)}</td>
                <td
                  className={
                    tD.price_change_percentage_24h > 0
                      ? "bg-green-600 px-4 py-4"
                      : "bg-red-600 px-4 py-4"
                  }
                >
                  %{tD.price_change_percentage_24h.toFixed(4)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableContent1