import React, { useState, useEffect, createContext } from "react";
import  getData from "../services/api";

export const dataCoinsProvider = createContext();
const DataContextProvider = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const fetchedData = await getData();
      console.log(fetchedData);
      setData(fetchedData);
    };
    fetchApi();
  }, []);
  return (
    <dataCoinsProvider.Provider value={[data, setData]}>
      {props.children}
    </dataCoinsProvider.Provider>
  );
};

export default DataContextProvider;
