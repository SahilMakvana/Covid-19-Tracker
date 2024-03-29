import React, { useEffect } from 'react';
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import coronaImage from './images/image.png';

class App extends React.Component{
    state = {
        data: {},
        country: '',
    }
    async componentDidMount() { 
        const fetchedData = await fetchData();
        this.setState({ data: fetchedData });
    }

    handleCountryChange = async (country) => {
        if(country !== "global"){
            const fetchedData = await fetchData(country);
            this.setState({ data: fetchedData, country: country });
        }else{
            const fetchedData = await fetchData();
            this.setState({ data: fetchedData, country: null });
        }
    }

    render(){
        const { data, country } = this.state;
        return(
            <div className={styles.container}>
                <img className={styles.image} src={coronaImage} alt="COVID-19" />
                <Cards data={this.state.data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country}/>
            </div>
        )
    }
}
export default App;

// Written by SahilMakvana