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
                    <a className="indicator-btn" target="_blank" href={url} rel="noreferrer">More details &#10230;</a>
                </div>

                <div className="chart">                    
                    <p className="error-msg">No data was taken in {countryName} for <span>{indicator}</span>.</p>

                    <div className="chart-draw" style={{ width: '85%', height: 400, margin: '0 auto' }}>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart width={730} height={400} data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis reversed dataKey="date" />
                            <YAxis
                                    // label={{ value: , position: 'top', offset:20 }}
                                    tickFormatter={(value) => new Intl.NumberFormat('en-US', {
                                    }).format(value)}/>
                            <Tooltip formatter={(value) => new Intl.NumberFormat('en-US', {
                                    }).format(value)}/>
                            {/* <Legend /> */}
                            <Bar animationDuration={1750} dataKey="value" fill="#022d5b" />
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
