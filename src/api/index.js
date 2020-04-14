import axios from "axios";
const url = "https://covid19.mathdro.id/api";

export const fetchData = async country => {
  let countryURL = url;

  if (country) {
    countryURL = `${url}/countries/${country}`;
  }
  try {
    const {
      data: { confirmed, deaths, recovered, lastUpdate }
    } = await axios.get(countryURL);

    return {
      confirmed,
      deaths,
      recovered,
      lastUpdate
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    const alteredData = data.map(item => ({
      confirmed: item.confirmed.total,
      deaths: item.deaths.total,
      date: item.reportDate
    }));

    return alteredData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries }
    } = await axios.get(`${url}/countries`);

    return countries.map(country => country.name);
  } catch (error) {
    console.log(error);
  }
};
