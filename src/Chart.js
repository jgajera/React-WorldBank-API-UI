import React, { useEffect } from 'react';
import * as d3 from 'd3';

import './index.css';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { autoType } from 'd3';

function Chart(props) {
  const { data } = props;

  return(
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
  );
}

export default Chart;
