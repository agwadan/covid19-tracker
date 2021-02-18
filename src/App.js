import React from 'react';
import { Cards, Chart, CountryPicker } from './components/Covid19';
import styles from './App.module.css'; //----------------------------------------------------- Styling for the app.
import { fetchData } from './api';
import coronaImage from './components/Covid19/Images/image.png';
class App extends React.Component {

  state = {
    data: {}, //--------------------------------------------------- data object initialized to be filled with data fetched from the api.
    country: ''
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData }) //---------------------------- Filling the data object initialized inside state with the data fetched from the api.
  }

  /* Function to handle change when a different country is picked. */
  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({
      data: fetchedData,
      country: country
    }); //------------------------ Assigning fetched data for the specified country to the state.
  }

  render() {

    const { data, country } = this.state;//---------------------------------- Destructuring the data and to be passed to the Cards and chart components.

    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="CoViD-19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;