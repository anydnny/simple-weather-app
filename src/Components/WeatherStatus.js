import React from "react";

import "../CSS/WeatherStatus.css"


export default function WeatherStatus(props){

    

    return (
        <div className="weather__status" >
            {props.loader && <p className="weather_loading">Loading...</p>}
            {!props.found && <p className="weather_not-found">Not found</p>}
        </div>
    )
}