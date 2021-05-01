import React, { useState } from 'react';

import './index.css';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import axios from 'axios';


function Chart(props) {
  const { data, error, country, countrySet } = props;
  console.log(props.countrySet)

  const [pickedCountry, errorCatch] = useState(false);
  const [countryData] = useState([]);
  const [indicator] = useState("");


  if(props.countrySet!==undefined) {
    axios.get('https://api.worldbank.org/v2/country/' + props.countrySet + '/indicator/DT.ODA.ALLD.CD?format=json')
    .then(res => {
        const countryData = res.data[1]; // [0] contains header/total information
        pickedCountry(countryData[0].country.value);

        // remove entries that have no value and set state
        var removeEmptyYears = countryData.filter(product => product.value !== null);
        countryData(removeEmptyYears);
        
        console.log(this.state.countryData);

        // get indicator for chart title and set state
        var indictor = this.state.countryData[0].indicator.value;
        indicator(indicator);
        }
    )
    .catch(error => errorCatch(true));
}


  return(
    <div className="chart-container">
        <div className={errorCatch}>
            <p className="error-msg">No data for this country. Choose another country!</p>
            <p className="explore-header">{props.country}</p>

            <div className="chart-draw" style={{ width: '80%', height: 300, margin: '0 auto' }}>
                <ResponsiveContainer>
                    <AreaChart width={730} height={250} data={data}
                    margin={{ top: 10, right: 0, left: 50, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3fbbf3" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3fbbf3" stopOpacity={0.15}/>
                            </linearGradient>
                        </defs>

                        <XAxis                     
                            label={{ value: "Year", position: 'bottom' }}
                            reversed dataKey="date" />

                        <YAxis
                            label={{ value: "GDP ($)", position: 'top', offset:20 }}
                            tickFormatter={(value) => new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            maximumFractionDigits: 0,
                            }).format(value)}/>

                        <CartesianGrid strokeDasharray="3 3" />

                        <Tooltip formatter={(value) => new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            maximumFractionDigits: 0,
                            }).format(value)}/>

                        <Area type="monotone" dataKey="value"       
                            stroke="#022d5b" fillOpacity={1} fill="url(#colorUv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

        </div>

    </div>
  );
}

export default Chart;
