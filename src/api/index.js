import axios from 'axios';
//import CountryPicker from '../components/Covid19/CountryPicker/CountryPicker';

const url = 'https://covid19.mathdro.id/api'; //---------------------------- variable to hold the url to the api.

export const fetchData = async (country) => {

    let changableUrl = url;

    if(country){
        changableUrl = `${url}/countries/${country}`; //-------------------- Changing the url to access the specific country that we need.
    }

    try {
        const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changableUrl); //--------------------------- Fetching data and destructuring it immediately from the api declared earlier.
        return {confirmed, recovered, deaths, lastUpdate} //---------------------------------------------------------- returning the fetched data.
    } catch (error) {
        console.log(error);
        
    }
}

export const fetchDailyData = async () => {
    try {
        const {data} = await axios.get(`${url}/daily`); //------------------------------------------- Fetching daily data from the api and destructuring it.
        
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }))

        return modifiedData;
        
    } catch (error) {
        console.log(error);
        
    }
}

export const fetchCountries = async () => {
    try {
        const {data: {countries}} = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name);
        
    } catch (error) {
        console.log(error);
           
    }
}