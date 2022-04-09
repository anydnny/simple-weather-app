import React from "react";

import "../CSS/WeatherStatus.css"


export default function WeatherStatus(props){

    return (
        <div className="weather__status" >
            {/* {!props.found && <p className="weather_not-found">Not found</p>} */}
            {!props.found && props.connect ?  <p className="weather_not-found">Not found</p> : null}
            {!props.connect &&  <p className="weather_not-found">No internet</p>}
        </div>
    )
}