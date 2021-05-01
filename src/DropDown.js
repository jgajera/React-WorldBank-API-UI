import React from 'react';

import axios from 'axios';

import Chart from './Chart.js';
// import { getDefaultNormalizer } from '@testing-library/dom';


export default class DropDown extends React.Component {
    state = {
        countries: [],
        pickedCountryID: false, // set this to false to conditionally hide sections until user chooses country
        countryData: [],
        indicator: "",
        errorCatch: false // set this to false to conditionally hide error message until API response comes back with success
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
        this.setState({ errorCatch : false});
        // if(e!=="") {
        //     axios.get('https://api.worldbank.org/v2/country/' + e + '/indicator/DT.ODA.ALLD.CD?format=json')
        //     .then(res => {
        //         const countryData = res.data[1]; // [0] contains header/total information
        //         this.setState({ pickedCountryID: countryData[0].country.value });

        //         // remove entries that have no value and set state
        //         var removeEmptyYears = countryData.filter(product => product.value !== null);
        //         this.setState({ countryData : removeEmptyYears});
                
        //         console.log(this.state.countryData);

        //         // get indicator for chart title and set state
        //         var indictor = this.state.countryData[0].indicator.value;
        //         this.setState({ indicator : indictor});
        //         }
        //     )
        //     .catch(error => this.setState({ errorCatch : true}));
        // }
    }

    render() {     
        var countryName = this.state.pickedCountry;
        var indicator = this.state.indicator;
        var countryData = this.state.countryData;
        var countrySet = this.state.pickedCountryID;
        var errorSet = this.state.errorCatch;

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
                            country={countryName}
                            countryID={countrySet}
                            indicator = {indicator}
                            data={countryData}
                            error={ errorSet ? 
                                "error-show" : "error-hide" }>
                        </Chart>
                    : null }
                </div>
            </div>
        )
    }
}

