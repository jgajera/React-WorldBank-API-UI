import React, { useState, useEffect } from 'react';

import axios from 'axios';

import LineChart from './LineChart.js';

import BarChartGraph from './BarChartGraph.js';

// import { getDefaultNormalizer } from '@testing-library/dom';

import Callout from './Callout.js';

function DropDown() {
    const [countries, setCountries] = useState([]);
    const [pickedCountry, setPickedCountry] = useState("");
    const [pickedCountryID, setPickedCountryID] = useState(false);

    const [countryData1, setCountryData1] = useState([]);
    const [countryData2, setCountryData2] = useState([]);
    const [countryData3, setCountryData3] = useState([]);

    const [indicator1, setIndicator1] = useState("");
    const [indicator2, setIndicator2] = useState("");
    const [indicator3, setIndicator3] = useState("");

    const [errorCatch1, setError1] = useState(false);
    const [errorCatch2, setError2] = useState(false);
    const [errorCatch3, setError3] = useState(false);


    useEffect(() => {
            axios.get('https://api.worldbank.org/v2/country?format=json')
            .then(res => {
                const countryList = res.data[1]; /* Used 1 due to object structure - [0] contains header/total information */
                console.log(countryList)             

                // remove continents disguised as countries and set state
                var removeContinents = countryList.filter(country => country.region.value !== "Aggregates");
                setCountries(removeContinents);
                // console.log(countries);
            })
            .catch(error => console.log(error));
    }, []);
    

    const storeChoice = e => {

        setError1(false);
        setError2(false);
        setError3(false);

        const indicators = [
            'NY.GDP.MKTP.CD',
            'SM.POP.REFG',
            'SP.POP.TOTL'
        ];

        function getCleanData(setData, setIndicator, setError, APIURL) {
            axios.get('https://api.worldbank.org/v2/country/' + e + '/indicator/' + APIURL + '?format=json')
            .then(res => {
                const countryData = res.data[1]; // [0] contains header/total information
                // console.log(countryData);
                setPickedCountry(countryData[0].country.value);
                setPickedCountryID(countryData[0].countryiso3code);

                // remove entries that have no value and set state
                const removeEmptyYears = countryData.filter(product => product.value !== null);
                setData(removeEmptyYears);

                if(setData===setCountryData3) {
                    setCountryData3(removeEmptyYears[0].value);
                }
                
                // // get country name for chart title and set state
                // setPickedCountry(countryData1[0].country.value);

                // get indicator for chart title and set state
                setIndicator(removeEmptyYears[0].indicator.value);
                }
            )
            .catch(error => setError(true));
        }

        if(e!=="") {
            getCleanData(setCountryData1, setIndicator1, setError1, indicators[0]);
            getCleanData(setCountryData2, setIndicator2, setError2, indicators[1]);
            getCleanData(setCountryData3, setIndicator3, setError3, indicators[2]);
            console.log(countryData3)
        }
    };


    const detail1 = "GDP at purchaser's prices is the sum of gross value added by all resident producers in the economy plus any product taxes and minus any subsidies not included in the value of the products.";
    const url1 = "https://datatopics.worldbank.org/world-development-indicators/themes/economy.html";

    const detail2 = "Refugees are people who are recognized as refugees under the 1951 Convention Relating to the Status of Refugees or its 1967 Protocol, the 1969 Organization of African Unity Convention Governing the Specific Aspects of Refugee Problems in Africa, people recognized as refugees in accordance with the UNHCR statute, people granted refugee-like humanitarian status, and people provided temporary protection.";
    const url2 = "https://datatopics.worldbank.org/world-development-indicators/themes/global-links.html";

    const url3 = "https://datatopics.worldbank.org/world-development-indicators/themes/people.html";

    // console.log(countryData3);

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
                    xAxis="GDP ($)"
                    yAxis="Year"
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
                    xAxis="Number of Refugees ($)"
                    yAxis="Year"
                    detail={detail2}
                    url={url2}
                    countryName={pickedCountry}
                    indicator = {indicator2}
                    data={countryData2}
                    error={ errorCatch2 ? 
                        "error-show" : "error-hide" }>
                    </BarChartGraph>
                : null }
            </div>
        </div>
    );
}



export default DropDown;