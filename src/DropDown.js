import React, { useState, useEffect } from 'react';
// for API fetching
import axios from 'axios';
// import chart components
import LineChart from './LineChart.js';
import BarChartGraph from './BarChart.js';


function DropDown() {
    // init states:
    // $countries: list of all countries
    // $pickedCountry: name of user-chosen country
    // $pickedCountryID: ID of user-chosen country
    const [countries, setCountries] = useState([]);
    const [pickedCountry, setPickedCountry] = useState("");
    const [pickedCountryID, setPickedCountryID] = useState(false);
    // $countryData1 & on: data for user-chosen country
    const [countryData1, setCountryData1] = useState([]);
    const [countryData2, setCountryData2] = useState([]);
    const [countryData3, setCountryData3] = useState([]);
    // $indicator1 & on: indicator
    const [indicator1, setIndicator1] = useState("");
    const [indicator2, setIndicator2] = useState("");
    const [indicator3, setIndicator3] = useState("");
    // $errorCatch1 & on: error state to display error message
    const [errorCatch1, setError1] = useState(false);
    const [errorCatch2, setError2] = useState(false);
    const [errorCatch3, setError3] = useState(false);

    // indicators and descriptions for indicators
    const indicators = [
        'NY.GDP.MKTP.CD',
        'EN.ATM.CO2E.PC',
        'SL.GDP.PCAP.EM.KD'
    ];
    const detail1 = "GDP at purchaser's prices is the sum of gross value added by all resident producers in the economy plus any product taxes and minus any subsidies not included in the value of the products.";
    const url1 = "https://datatopics.worldbank.org/world-development-indicators/themes/economy.html";

    const detail2 = "Carbon dioxide emissions are those stemming from the burning of fossil fuels and the manufacture of cement. They include carbon dioxide produced during consumption of solid, liquid, and gas fuels and gas flaring.";
    const url2 = "https://datatopics.worldbank.org/world-development-indicators/themes/environment.html";

    const detail3 = "GDP per person employed is gross domestic product (GDP) divided by total employment in the economy. Purchasing power parity (PPP) GDP is GDP converted to 2011 constant international dollars using PPP rates.";
    const url3 = "https://datatopics.worldbank.org/world-development-indicators/themes/economy.html";


    // when component is about to mount, fetch the full country list
    // and store the list in the 'countries' state
    useEffect(() => {
        axios.get('https://api.worldbank.org/v2/country?format=json&per_page=500')
            .then(res => {
                const countryList = res.data[1]; /* Used 1 due to object structure - [0] contains header/total information */

                // remove continents disguised as countries
                const removeContinents = countryList.filter(country => country.region.value !== "Aggregates");
                
                // then sort the list of countries by name, not by their ID
                removeContinents.sort(function(a, b) {
                    var nameA = a.name; // ignore upper and lowercase
                    var nameB = b.name; // ignore upper and lowercase
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                  
                    // names must be equal
                    return 0;
                  });

                  // and set state
                setCountries(removeContinents);
            })
            .catch(error => console.log(error));
    }, []);
    

    // on select change (user changes dropdown):
    // (1) set errors to false
    // (2) fetch, clean, and store data to states
    const storeChoice = e => {
        setPickedCountryID(e);

        setError1(false);
        setError2(false);
        setError3(false);

        function getCleanData(setData, setIndicator, setError, APIURL) {
            axios.get('https://api.worldbank.org/v2/country/' + e + '/indicator/' + APIURL + '?format=json&per_page=500')
            .then(res => {
                const countryData = res.data[1]; // [0] contains header/total information
                
                // get country name for chart title and set state
                setPickedCountry(countryData[0].country.value);

                // get indicator for chart title and set state
                setIndicator(countryData[0].indicator.value);

                // remove entries that have no value and set state
                const removeEmptyYears = countryData.filter(product => product.value !== null);
                setData(removeEmptyYears);
                
                if(removeEmptyYears.length===0) {
                    setError(true);
                }
                }
            )
            .catch(error => setError(true));
        }

        getCleanData(setCountryData1, setIndicator1, setError1, indicators[0]);
        getCleanData(setCountryData2, setIndicator2, setError2, indicators[1]);
        getCleanData(setCountryData3, setIndicator3, setError3, indicators[2]);
    };
    
    
    return (
        <div>
            <div className="dropdown-container">
                { pickedCountryID ? 
                    <p>Pick another country:</p>
                    : <p>Pick a country to start:</p> }

                <select
                    className="dropdown"
                    name="dropdown"
                    defaultValue={'none'}
                    onChange={e => storeChoice(e.target.value)}>

                    <option
                        value="none"
                        disabled
                        hidden>
                    </option>

                    { countries.map(country =>
                        <option
                            key={country.name}
                            value={country.id}>
                            {country.name}
                        </option>)
                    }
                </select>
            </div>
            <div className="chart-container">
                { pickedCountryID ?
                    <LineChart
                    detail={detail1}
                    url={url1}
                    countryName={pickedCountry}
                    indicator = {indicator1}
                    data={countryData1}
                    error={ errorCatch1 ? 
                        "error-show" : "error-hide" }>
                    </LineChart>
                : null }

                { pickedCountryID ?
                    <BarChartGraph
                    detail={detail2}
                    url={url2}
                    countryName={pickedCountry}
                    indicator = {indicator2}
                    data={countryData2}
                    error={ errorCatch2 ? 
                        "error-show" : "error-hide" }>
                    </BarChartGraph>
                : null }

                { pickedCountryID ?
                    <LineChart
                    detail={detail3}
                    url={url3}
                    countryName={pickedCountry}
                    indicator = {indicator3}
                    data={countryData3}
                    error={ errorCatch3 ? 
                        "error-show" : "error-hide" }>
                    </LineChart>
                : null }

            </div>
        </div>
    );
}



export default DropDown;