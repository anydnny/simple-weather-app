import React from "react";

import "../CSS/WeatherForm.css";
export default function WeatherForm (props) {

    return (
        <form onSubmit={props.onFormSubmit} className="weather__form">
            <input ref={props.inputRef} className="weather__input" type="text" value={props.city} onChange={props.onCityChange} placeholder= "enter city name"/>
            <button className="weather__btn" type="submit" disabled={!props.city}>s</button>
        </form>
    )
}