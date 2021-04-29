import React, { useState } from 'react';

import axios from 'axios';


const Chart = (props) => {
    var currentChoiceId = props.message;
    var countrydata;
    var indicator;

    axios.get('http://api.worldbank.org/v2/country/' + currentChoiceId + '/indicator/NY.GDP.MKTP.CD?format=json')
    .then(res => {
        countrydata = res.data[1]; /* Used 1 due to object structure - [0] contains header/total information */
        // console.log(countrydata);
        }
    )

    console.log(countrydata);



    return(
          <h2> {currentChoiceId} </h2>
    );
}


export default Chart;


// export default class Chart extends React.Component {
//     state = {
//         pickedCountry: this.props.message,
//         countrydata: []
//     }

//     componentDidMount() {
//         axios.get('http://api.worldbank.org/v2/country/' + this.state.pickedCountry + '/indicator/NY.GDP.MKTP.CD?format=json')
//         .then(res => {
//             var countrydata = res.data[1]; /* Used 1 due to object structure - [0] contains header/total information */
//             this.setState({ countrydata });
//             console.log(countrydata)
//             }
//         )
//     }

//     render() {
//         return (
//             <div>
//                 <h2> {this.state.pickedCountry} </h2>
//             </div>
//         )
//     }
// }
