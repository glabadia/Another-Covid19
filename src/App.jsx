import React from "react";
import styles from "./App.module.css";

import { Cards, Chart, CountryPicker } from "./components";

import { fetchData } from "./api";

class App extends React.Component {
  state = {
    data: {},
    country: ""
  };

  async componentDidMount() {
    const rawData = await fetchData();
    this.setState({ data: rawData });
  }

  handleCountryChange = async country => {
    const fetchedCountry = await fetchData(country);

    this.setState({ country, data: fetchedCountry });
  };

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img
          className={styles.image}
          src="https://i.ibb.co/7QpKsCX/image.png"
          alt="virus"
        />
        <Cards data={data} />
        <CountryPicker onCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
