import React from "react";
import "../CSS/WeatherCard.css"

export default function WeatherCard ({result, found}){

    if(!found || !result) {
        return null;
    }
    
    return (
        <div className="weather__card">
            <p className="weather__temp" >{result.temp}<span>℃</span></p>
            <p className="weather__weather">{result.weather}</p>
        </div>
    )
}