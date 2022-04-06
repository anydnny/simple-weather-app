import React from "react";
import { createRoot } from "react-dom/client";
import WeatherApp from "./Components/WeatherApp.js";

import "./CSS/index.css"

function App(){
    return (
        <WeatherApp />
    )
}
const root = createRoot(document.querySelector("#root"));
root.render(<App />)