import {React, useEffect, useState, useRef} from "react";

import WeatherForm from "./WeatherForm";
import WeatherStatus from "./WeatherStatus";
import WeatherCard from "./WeatherCard";

import "../CSS/WeatherApp.css";

export default function WeatherApp(){

    const [city, setCity] = useState("");
    const [result, setResult] = useState();
    const [coord, setCoord] = useState();
    const [found, setFound] = useState(true);
    const [loader, setLoader] = useState(false);
    const [connect, setConnect] = useState(true);
    const api_key = "6dfef43cbe7ca052107e6c14992fa2ee"; 
    

    const inputRef = useRef();
    useEffect(()=>{
        inputRef.current.focus()
    }, [])

    function handleCityChange(e){
        setCity(e.target.value);
    }

    function handleFormSubmit(e){
        if(e){
            e.preventDefault();
        }

        (async () => {
            try{
                await fetch('https://jsonplaceholder.typicode.com/todos/1');
                setConnect(true)
            }
            catch{
                setConnect(false);
            }
        }) (); 

        (async ()=>{
            try{
                setLoader(true);
                setFound(true);
                const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city.toLowerCase()}&limit=1&appid=${api_key}`)
                const data = await response.json();
                if(data){
                    setFound(true);
                    setCoord({lat: data[0].lat, lon: data[0].lon})
                }
            }
            catch (error){
                setFound(false)
                console.log(error)
            }
            finally{
                setLoader(false)
            }
        }) ();
    }
    useEffect(()=>{
        if(result){
            document.title = `${city}: ${result.temp}℃`
        } else {
            document.title = "simple weather app"
        }
    },[result])
    useEffect(()=>{
        if (coord) {
            (async () => {
                const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&appid=${api_key}`)
                const data = await response.json();
                setResult({city: data.name, temp: Math.round(data.main.temp - 273.15), weather: data.weather[0].main})
            }) ()
        }
       
    },[coord])
    
    useEffect(()=>{
        if(!found){
            document.querySelector(".weather__status").style.top = "200%";
            setResult()
        }
    },[found])

    useEffect(()=>{
        if(!city){
            if(!found){
                document.querySelector(".weather__status").style.top = "50%";
            }
            const timer = setTimeout(()=>{
                setFound(true);
            }, 1000)
           return (
               clearTimeout(timer)
           )
        }
    }, [city])

    useEffect(()=>{
        const btn = document.querySelector(".weather__btn");
        if(city){
            btn.style.left = "calc(95% - 1.5rem)"
        } else {
            btn.style.left = "calc(70% - 1.5rem)"
        }
    }, [city])

    useEffect(()=>{
        if(!city && result){
            document.querySelector(".weather__card").style.top = "50%"
            const timer = setTimeout(()=>{
                setResult();
            },800)
            return () => {
                clearTimeout(timer)
            }
        }
    },[city])

    useEffect(()=>{
        if(city){
            const timer = setTimeout(()=>{
                handleFormSubmit()
             }, 1500)
             return ()=>{
                 clearTimeout(timer)
             };
        }
    },[city])
    useEffect(()=>{
        if(result){
            const timer = setTimeout(()=>{
                 document.querySelector(".weather__card").style.top = "200%";
            },800);
            return () => {
                clearTimeout(timer)
            }
        }

    }, [result])

   useEffect(()=>{
    const weather__input = document.querySelector(".weather__input");

    if(loader){
        weather__input.classList.add("input-load")
    } else {
        const timerId = setTimeout(() => {
            weather__input.classList.remove("input-load");
          }, 1000)
        return () => {
            clearTimeout(timerId);
        }
    }
   }, [loader])
    
    return(
        <div className="weather__app"> 
          <WeatherForm onFormSubmit = {handleFormSubmit}  inputRef={inputRef} city = {city} onCityChange = {handleCityChange} loader={loader}/> 
          <WeatherStatus  found = {found} connect={connect} />
          <WeatherCard found = {found} result = {result}/>
        </div>
    )
}