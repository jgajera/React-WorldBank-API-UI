import React, { useState } from 'react';

import './index.css';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function Chart(props) {
  const { xAxis, yAxis, detail, url, countryName, countryID, indicator, data, error} = props;
  console.log(props.indicator.substring(0,3))

  return(
    <div className="section-container">
        <div className={props.error}>
            <div className={props.indicator.substring(0,3) + " grid"}>
                <div className="text">
                    <h2 className="">{props.indicator}</h2>
                    <p>{props.detail}</p>
                    <a className="indicator-btn" href={props.url}>More details &#10230;</a>
                </div>

                <div className="chart">
                    <h2 className="chart-header">{props.countryName}</h2>
                    
                    <p className="error-msg">No data was taken in {props.countryName} for <span>{props.indicator}</span>.</p>

                    <div className="chart-draw" style={{ width: '80%', height: 300, margin: '0 auto' }}>
                        <ResponsiveContainer>
                            <AreaChart width={730} height={250} data={data}
                            margin={{ top: 10, right: 0, left: 20, bottom: 0 }}>
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
                                    // label={{ value: , position: 'top', offset:20 }}
                                    tickFormatter={(value) => new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    maximumFractionDigits: 0,
                                    }).format(value)}/>

                                <CartesianGrid  
                                    strokeDasharray="3 3" />

                                <Tooltip formatter={(value) => new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    maximumFractionDigits: 0,
                                    }).format(value)}/>

                                <Area type="monotone"      
                                    dataKey="value"       
                                    stroke="#022d5b" fillOpacity={1} fill="url(#colorUv)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Chart;
