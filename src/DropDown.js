import React from 'react';

import axios from 'axios';

import Chart from './Chart.js';
import { getDefaultNormalizer } from '@testing-library/dom';

import * as d3 from "d3";


export default class DropDown extends React.Component {
    state = {
        countries: [],
        pickedCountry: [],
        countryData: []
    }

    componentDidMount() {
        axios.get('https://api.worldbank.org/v2/country?format=json')
            .then(res => {
                const countries = res.data[1]; /* Used 1 due to object structure - [0] contains header/total information */

                var removeContinents = countries.filter(product => product.capitalCity !== "");
                this.setState({ countries : removeContinents});

                console.log(countries)             
            })
    }

    storeChoice(e) {
        this.setState({ pickedCountry: e });
        // console.log(e) /* TODO: REMOVE */
        axios.get('https://api.worldbank.org/v2/country/' + e + '/indicator/NY.GDP.MKTP.CD?format=json')
            .then(res => {
                const countryData = res.data[1]; /* Used 1 due to object structure - [0] contains header/total information */

                var removeEmptyYears = countryData.filter(product => product.value !== null);
                this.setState({ countryData : removeEmptyYears});
                
                console.log(countryData)
                }
            )
    }

    render() {    
        return (
            <div>
                <p>Pick a country to start:</p>
                <select name="dropdown" onChange={(event)=>this.storeChoice(event.target.value)}>
                    <option defaultValue='' disabled hidden style={{display: "none"}} value=''></option>

                    { this.state.countries.map(country =>
                        <option
                            key={country.name}
                            value={country.id}>
                        {country.name}
                        </option>)
                    }
                </select>
                <ul>
                    { this.state.countryData.map(Data =>
                        <li key={Data.date}>
                        {Data.date}, {Data.value}
                        </li>)
                    }
                </ul>
            </div>
        )
    }
}

