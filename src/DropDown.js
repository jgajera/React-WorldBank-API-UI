import React from 'react';

import axios from 'axios';

import Chart from './Chart.js';
// import { getDefaultNormalizer } from '@testing-library/dom';


export default class DropDown extends React.Component {
    state = {
        countries: [],
        pickedCountryID: false, // set this to false to conditionally hide sections until user chooses country
        countryData: [],
        indicator: ""
    }

    componentDidMount() {
        axios.get('https://api.worldbank.org/v2/country?format=json')
            .then(res => {
                const countries = res.data[1]; /* Used 1 due to object structure - [0] contains header/total information */

                var removeContinents = countries.filter(product => product.capitalCity !== "");
                this.setState({ countries : removeContinents});

                // console.log(countries)             
            })
    }

    storeChoice(e) {
        this.setState({ pickedCountryID: e });
        if(e==="") {
            console.log('error');
        } else {
            axios.get('https://api.worldbank.org/v2/country/' + e + '/indicator/NY.GDP.MKTP.CD?format=json')
            .then(res => {
                const countryData = res.data[1]; // [0] contains header/total information
                this.setState({ pickedCountry: countryData[0].country.value });

                // remove entries that have no value and set state
                var removeEmptyYears = countryData.filter(product => product.value !== null);
                this.setState({ countryData : removeEmptyYears});
                
                // console.log(this.state.countryData);
                var indictor = this.state.countryData[0].indicator.value;
                this.setState({ indicator : indictor});
                }
            )
        }
    }

    render() {     
        var countryName=this.state.pickedCountry;
        var indicator = this.state.indicator;

        return (
            <div>
                <div className="dropdown-container">
                    { this.state.pickedCountryID ? 
                    <p>Pick another country:</p>
                    : <p>Pick a country to start:</p> }

                    <select className="dropdown" name="dropdown" defaultValue={'none'} onChange={(event)=>this.storeChoice(event.target.value)}>
                        <option value="none" disabled hidden></option>
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
                    { this.state.pickedCountryID ? 
                    <p className="explore-header">{countryName}'s {indicator}</p>
                    : null }


                    { this.state.pickedCountryID ?
                    <Chart data={this.state.countryData}></Chart>
                    : null }
                </div>
            </div>
        )
    }
}

