import React from 'react';

import axios from 'axios';

import Chart from './Chart.js';
// import { getDefaultNormalizer } from '@testing-library/dom';

import Callout from './Callout.js';


export default class DropDown extends React.Component {
    state = {
        countries: [],
        pickedCountry: "",
        pickedCountryID: false, // set this to false to conditionally hide sections until user chooses country
        countryData1: [],
        indicator1: "",
        errorCatch1: false, // set this to false to conditionally hide error message until API response comes back with success
        countryData2: [],
        indicator2: "",
        errorCatch2: false, // set this to false to conditionally hide error message until API response comes back with success        
        countryData3: [],
        indicator3: "",
        errorCatch3: false // set this to false to conditionally hide error message until API response comes back with success
    }

    componentDidMount() {
        axios.get('https://api.worldbank.org/v2/country?format=json')
            .then(res => {
                const countries = res.data[1]; /* Used 1 due to object structure - [0] contains header/total information */
                console.log(countries)             

                // remove continents disguised as countries and set state
                var removeContinents = countries.filter(country => country.region.value !== "Aggregates");
                this.setState({ countries : removeContinents});

                // console.log(countries)             
            })
    }

    storeChoice(e) {
        this.setState({ pickedCountryID: e });

        this.setState({ errorCatch1 : false});
        this.setState({ errorCatch2 : false});
        this.setState({ errorCatch3 : false});

        if(e!=="") {
            axios.get('https://api.worldbank.org/v2/country/' + e + '/indicator/NY.GDP.MKTP.CD?format=json')
            .then(res => {
                const countryData = res.data[1]; // [0] contains header/total information
                this.setState({ pickedCountryID: countryData[0].country.value });

                // remove entries that have no value and set state
                const removeEmptyYears = countryData.filter(product => product.value !== null);
                this.setState({ countryData1 : removeEmptyYears});
                
                // get country name for chart title and set state
                const pickedCountry = this.state.countryData1[0].country.value;
                this.setState({ pickedCountry : pickedCountry});

                // get indicator for chart title and set state
                const indictor = this.state.countryData1[0].indicator.value;
                this.setState({ indicator1 : indictor});
                
                }
            )
            .catch(error => this.setState({ errorCatch : true}));

            axios.get('https://api.worldbank.org/v2/country/' + e + '/indicator/SM.POP.REFG?format=json')
            .then(res => {
                const countryData = res.data[1]; // [0] contains header/total information

                // remove entries that have no value and set state
                const removeEmptyYears = countryData.filter(product => product.value !== null);
                this.setState({ countryData2 : removeEmptyYears});
                
                // get indicator for chart title and set state
                const indictor = this.state.countryData2[0].indicator.value;
                this.setState({ indicator2 : indictor});
                
                }
            )
            .catch(error => this.setState({ errorCatch2 : true}));

            axios.get('https://api.worldbank.org/v2/country/' + e + '/indicator/SP.POP.TOTL?format=json')
            .then(res => {
                const countryData = res.data[1]; // [0] contains header/total information
                console.log(countryData)

                // remove entries that have no value and set state
                const removeEmptyYears = countryData.filter(product => product.value !== null);

                this.setState({ countryData3 : removeEmptyYears[0].value});
                // get indicator for chart title and set state

                const indictor = this.state.countryData3[0].indicator.value;
                this.setState({ indicator3 : indictor});
                
                }
            )
            .catch(error => this.setState({ errorCatch3 : true}));
        }
    }

    render() {     
        const countryName = this.state.pickedCountry;
        const indicator = this.state.indicator1;
        const countryData = this.state.countryData1;
        const countrySet = this.state.pickedCountryID;
        const errorSet = this.state.errorCatch1;
        const detail1 = "GDP at purchaser's prices is the sum of gross value added by all resident producers in the economy plus any product taxes and minus any subsidies not included in the value of the products.";
        const url1 = "https://datatopics.worldbank.org/world-development-indicators/themes/economy.html";


        const indicator2 = this.state.indicator2;
        const countryData2 = this.state.countryData2;
        const errorSet2 = this.state.errorCatch2;
        const detail2 = "Refugees are people who are recognized as refugees under the 1951 Convention Relating to the Status of Refugees or its 1967 Protocol, the 1969 Organization of African Unity Convention Governing the Specific Aspects of Refugee Problems in Africa, people recognized as refugees in accordance with the UNHCR statute, people granted refugee-like humanitarian status, and people provided temporary protection.";
        const url2 = "https://datatopics.worldbank.org/world-development-indicators/themes/global-links.html";

        const indicator3 = this.state.indicator3;
        const countryData3 = this.state.countryData3;
        const errorSet3 = this.state.errorCatch3;
        const url3 = "https://datatopics.worldbank.org/world-development-indicators/themes/people.html";

        return (
            <div>
                <div className="dropdown-container">
                    { countrySet ? 
                        <p>Pick another country:</p>
                        : <p>Pick a country to start:</p> }

                    <select
                        className="dropdown"
                        name="dropdown"
                        defaultValue={'none'}
                        onChange={(event)=>this.storeChoice(event.target.value)}>

                        <option
                            value="none"
                            disabled
                            hidden>
                        </option>

                        { this.state.countries.map(country =>
                            <option
                                key={country.name}
                                value={country.id}>
                                {country.name}
                            </option>)
                        }
                    </select>
                </div>
                <div className="chart-container">
                    { countrySet ?
                        <Chart
                        chartType = "AreaChart"
                        xAxis="GDP ($)"
                        yAxis="Year"
                        detail={detail1}
                        url={url1}
                        countryName={countryName}
                        countryID={countrySet}
                        indicator = {indicator}
                        data={countryData}
                        error={ errorSet ? 
                            "error-show" : "error-hide" }>
                    </Chart>
                : null }

                    { countrySet ?
                        <Callout
                        url={url3}
                        countryName={countryName}
                        indicator = {indicator3}
                        data={countryData3}
                        error={ errorSet3 ? 
                            "error-show" : "error-hide" }>
                    </Callout>
                : null }


                    { countrySet ?
                        <Chart
                        chartType = "BarChart"
                        xAxis="Number of Refugees ($)"
                        yAxis="Year"
                        detail={detail2}
                        url={url2}
                        countryName={countryName}
                        countryID={countrySet}
                        indicator = {indicator2}
                        data={countryData2}
                        error={ errorSet2 ? 
                            "error-show" : "error-hide" }>
                    </Chart>
                : null }
                </div>
            </div>
        )
    }
}

