// import { useState } from 'react';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {PropTypes} from 'prop-types';

import clearsky_day from './asserts/icons/clearsky_day.png'
import clearsky_night from './asserts/icons/clearsky_night.png'
import fewclouds_day from './asserts/icons/fewclouds_day.png'
import fewclouds_night from './asserts/icons/fewclouds_night.png'
import mist_dn from './asserts/icons/mist_dn.png'
import rain_day from './asserts/icons/rain_day.png'
import rain_night from './asserts/icons/rain_night.png'
import scatteredclouds_dn from './asserts/icons/scatteredclouds_dn.png'
import showerrain_dn from './asserts/icons/showerrain_dn.png'
import snow_dn from './asserts/icons/snow_dn.png'
import thunderstorm_dn from './asserts/icons/thunderstorm_dn.png'
import brokenclouds_dn from './asserts/icons/brokenclouds_dn.png'
import windIcon from './asserts/icons/windIcon.png'
import humidityIcon from './asserts/icons/humidityIcon.png'

const WeatherDetails = ({ icon, temp, city, country, lat, log, humidity, wind, weatherCondition, weatherDescription,
  feelLike, tempMin, tempMax }) => {
  return (
    <>
      <div className='image'>
        <img src={icon} alt='clear' />
      </div>
      <div className='weather-condition'>{weatherCondition}</div>
      <div className='weather-description'>{weatherDescription}</div>
      <div className='temp'>{temp} °C</div>
      <div className='feelLike'>Feels Like: {feelLike} °C</div>
      <div className='temp-min-max'>Min: {tempMin}  °C Max: {tempMax}  °C</div>
      <div className='location'>{city}</div>
      <div className='country'>{country}</div>
      <div className='coord'>
        <div>
          <span className='lat'>Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className='log'>Longitude</span>
          <span>{log}</span>
        </div>
      </div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidityIcon} alt='humidity' className='icon' />
          <div className='data'>
            <div className='humidity-percent'>{humidity} %</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className='element'>
          <img src={windIcon} alt='wind' className='icon' />
          <div className='data'>
            <div className='wind-speed'>{wind} km/h</div>
            <div className='text'>Wind Speed</div>
          </div>
        </div>
      </div>

    </>
  )
};

WeatherDetails.propTypes = {
  icon: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  humidity: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  log: PropTypes.number.isRequired,
};

function App() {
  const [text, setText] = useState("chennai");
  const [icon, setIcon] = useState(clearsky_day);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState(text);
  const [country, setCountry] = useState("IN");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [weatherCondition, setWeatherCondition] = useState("")
  const [weatherDescription, setWeatherDescription] = useState("")
  const [feelLike, setFeelLike] = useState("")
  const [tempMin, setTempMin] = useState(0)
  const [tempMax, setTempMax] = useState(0)
  
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const weatherIconsMap = {
    "01d": clearsky_day,
    "01n": clearsky_night,
    "02d": fewclouds_day,
    "02n": fewclouds_night,
    "03d": scatteredclouds_dn,
    "03n": scatteredclouds_dn,
    "04d": brokenclouds_dn,
    "04n": brokenclouds_dn,
    "09d": showerrain_dn,
    "09n": showerrain_dn,
    "10d": rain_day,
    "10n": rain_night,
    "11d": thunderstorm_dn,
    "11n": thunderstorm_dn,
    "13d": snow_dn,
    "13n": snow_dn,
    "50d": mist_dn,
    "50n": mist_dn,
  };

  const search = () => {

     let api_key = "1291cc40dfef6d0a525ee7c23b544cfa"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`

    var data = axios(url)

    data.then((data) => {
      setLoading(true);
      setHumidity(data.data.main.humidity);
      setWind(data.data.wind.speed);
      setTemp(Math.floor(data.data.main.temp));
      setCity(data.data.name);
      setCountry(data.data.sys.country);
      setLat(data.data.coord.lat);
      setLog(data.data.coord.lon);
      setIcon(weatherIconsMap[data.data.weather[0].icon]);
      setWeatherCondition(data.data.weather[0].main)
      setWeatherDescription(data.data.weather[0].description)
      setFeelLike(Math.floor(data.data.main.feels_like))
      setTempMin(Math.floor(data.data.main.temp_min))
      setTempMax(Math.floor(data.data.main.temp_max))
      setCityNotFound(false)
    }
  ).catch((error) => {
      setCityNotFound(true);
      setLoading(false);
    }
  ).finally(() => {
      setLoading(false);
    })
    
  }

  const handleCity = (e) => {
    setText(e.target.value);
  }
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  }

  useEffect(() => {
    search();
  }, []);

  return (
    <div className="container">
      <div className='input-container'>
        <input value={text} type='text' className='cityInput' placeholder='Search City' onChange={handleCity} onKeyDown={handleKeyDown} />
        <div className='search-icon' onClick={() => { search() }}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAgtJREFUSEu11cvrTVEYxvHPDxnIpSiXkpAwcFcycAlFiJFyKRQJhQEx8AcQAxLCgEJS/gAZKYRMkBJRJJcBuUTu1/XWOjqO395nD85Zs3P22u93vc96nnd3aPPqaHN9ZYAhWI4FGJ8PcgvncRbPqhyuM0BvnMbikgK/cQ5r8KkM1AjogRsYg684hgN4lIsMx1asQ/e8dzq+F0EaAaewEk8xD/cKXhyHC+kAg7AP26oAxuIOfiSdpyD0HogjmImfuIL1eIUZuIRvGIYXnUHqOziITTiEzXnzduxtePE5JmbIGaxIkJ3Y3QzwECOy/nfrNi9B/O6SiyxCSLk6dTArdXIxdxYd/bfqO/iYThuX3BW/CjQdmgo/TpccXQxG39Tta7xBv2aA9+iFnghYlRV7P2S5+jcD3M6BmpwycLNK9eSkqclt17NMc5oB9qTQ7EjOOYqNFQEnU0ZWJXnCIFuaAUbifrZjzaZlnAjY5byhsOvGoB3P8X+CucmCDwoIE3LQBuS0b6gStNhTPyq+5JDtz8mO59FljIq16JaLxh1E6uOyS21ae9gHEaCFJfq8S7NoV5J0GSbl1M9G/P/PKhvX4flI6XzE7Pmc3XUNh/E25yCCFuM8XBhOikz8Xa344ETYrmI0YhpMw8saoRWAqBUhC0eNyvdzotWAqBeTd2n+frRUotJMtkqiQkjbAX8AH49iGTKeH0EAAAAASUVORK5CYII=" alt='search' />
        </div>
      </div>
      
      {loading && <div className='loading-message'>Loading...</div>}
      {error && <div className='error-message'>{error}</div>}
      {cityNotFound && <div className='city-not-found'>City not found</div>}

      {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log}
        humidity={humidity} wind={wind} weatherCondition={weatherCondition} weatherDescription={weatherDescription} 
        feelLike={feelLike} tempMin={tempMin} tempMax={tempMax}/>}
      <p className='copyright'>Designed by <span>Nandhini</span></p>
    </div>
  );
}

export default App;
