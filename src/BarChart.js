import React from 'react';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


function BarChartGraph(props) {
  const { detail, url, countryName, indicator, data, error} = props;

  return(
    <div className="section-container">
        <div className={error}>
            <div className="grid">
                <div className="text">
                    <h2 className="chart-header">{countryName}</h2>
                    <h2>{indicator}</h2>
                    <p>{detail}</p>
                    <a className="indicator-btn" target="_blank" href={url}>More details &#10230;</a>
                </div>

                <div className="chart">                    
                    <p className="error-msg">No data was taken in {countryName} for <span>{indicator}</span>.</p>

                    <div className="chart-draw" style={{ width: '80%', height: 300, margin: '0 auto' }}>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart width={730} height={650} data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis
                                    // label={{ value: , position: 'top', offset:20 }}
                                    tickFormatter={(value) => new Intl.NumberFormat('en-US', {
                                    maximumFractionDigits: 0,
                                    }).format(value)}/>
                            <Tooltip formatter={(value) => new Intl.NumberFormat('en-US', {
                                    maximumFractionDigits: 0,
                                    }).format(value)}/>
                            {/* <Legend /> */}
                            <Bar dataKey="value" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default BarChartGraph;
