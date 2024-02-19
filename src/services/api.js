import axios from "axios";

const getData = async () => {
  const requestData = {
    method: "GET",
    url: "https://yahoo-finance15.p.rapidapi.com/api/v1/markets",
    params: { search: "AA" },
    headers: {
      "X-RapidAPI-Key": "SIGN-UP-FOR-KEY",
      "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(requestData);
    return response.data;
  } catch (error) {
    throw error; 
  }
};

export default getData;
