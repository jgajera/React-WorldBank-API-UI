import React from 'react';

import './index.css';


function Callout(props) {
  const { url, countryName, indicator, data, error} = props;
  // console.log(props.error)

//   const pop = props.data[0].value

  return(
    <div className="section-container">
        <div className={error}>
            <h2 className="chart-header">In {data}, the {indicator} in {countryName} was {data}.
            </h2>
            <a className="indicator-btn" href={url}>More details &#10230;</a>

            <p className="error-msg">No data was taken in {countryName} for <span>{indicator}</span>.</p>
        </div>
    </div>
  );
}

export default Callout;
