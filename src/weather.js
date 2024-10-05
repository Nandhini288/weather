import { useState } from 'react';
import axios from 'axios';

function Weather() {

  const [city, setcity] = useState("chennai")
  const [temp, settemp] = useState()
  const [weather, setweather] = useState()

  function handlecity(e){
    setcity(e.target.value)
  }

  function getweather(){
    var data = axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1291cc40dfef6d0a525ee7c23b544cfa&units=metric`)

    data.then((data) => {
      console.log(data.data.weather[0].main)
      settemp(data.data.main.temp)
      setweather(data.data.weather[0].main)
    }).catch((error) => {

    })
  }

  /* const search1 = async () => {
    setLoading(true);
    // let city = "chennai"
    let api_key = "1291cc40dfef6d0a525ee7c23b544cfa"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`

    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.cod === "404") {
        // console.error("city not found")
        setCityNotFound(true);
        setLoading(false);
        return;
      }
     
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      setIcon(weatherIconsMap[data.weather[0].icon]);
      setWeatherCondition(data.weather[0].main)
      setWeatherDescription(data.weather[0].description)
      setFeelLike(Math.floor(data.main.feels_like))
      setTempMin(Math.floor(data.main.temp_min))
      setTempMax(Math.floor(data.main.temp_max))
      setCityNotFound(false)
    } catch (error) {
      console.error("An Error Occured:", error.message);
      setError("error");
    } finally {
      setLoading(false);
    }
  } */

  return (
    <div className="App">
      <h1>Weather</h1>
      <div style={{display:'flex'}}>
      <p>city</p>
      <input value={city} onChange={handlecity} placeholder='Enter city name'></input>
      <button onClick={getweather}>Search</button>
      </div>
      <div>
        <p>Weather: {weather}</p>
        <p>Temperature: {temp}</p>
        <p></p>
      </div>
     
    </div>
  );
}

export default App;


// 01d = 01n = clear sky
// 02d = 02n = few clouds
// 03d = 03n = scattered clouds
// 04d = 04n = broken clouds
// 09d = 09n = shower rain
// 10d = 10n = rain
// 11d = 11n = thunderstorm
// 13d = 13n = snow
// 50d = 50n = mist

// Group 2xx: Thunderstorm
// 200	Thunderstorm	thunderstorm with light rain	 11d
// 201	Thunderstorm	thunderstorm with rain	 11d
// 202	Thunderstorm	thunderstorm with heavy rain	 11d
// 210	Thunderstorm	light thunderstorm	 11d
// 211	Thunderstorm	thunderstorm	 11d
// 212	Thunderstorm	heavy thunderstorm	 11d
// 221	Thunderstorm	ragged thunderstorm	 11d
// 230	Thunderstorm	thunderstorm with light drizzle	 11d
// 231	Thunderstorm	thunderstorm with drizzle	 11d
// 232	Thunderstorm	thunderstorm with heavy drizzle	 11d
// Group 3xx: Drizzle
// 300	Drizzle	light intensity drizzle	 09d
// 301	Drizzle	drizzle	 09d
// 302	Drizzle	heavy intensity drizzle	 09d
// 310	Drizzle	light intensity drizzle rain	 09d
// 311	Drizzle	drizzle rain	 09d
// 312	Drizzle	heavy intensity drizzle rain	 09d
// 313	Drizzle	shower rain and drizzle	 09d
// 314	Drizzle	heavy shower rain and drizzle	 09d
// 321	Drizzle	shower drizzle	 09d
// Group 5xx: Rain
// 500	Rain	light rain	 10d
// 501	Rain	moderate rain	 10d
// 502	Rain	heavy intensity rain	 10d
// 503	Rain	very heavy rain	 10d
// 504	Rain	extreme rain	 10d
// 511	Rain	freezing rain	 13d
// 520	Rain	light intensity shower rain	 09d
// 521	Rain	shower rain	 09d
// 522	Rain	heavy intensity shower rain	 09d
// 531	Rain	ragged shower rain	 09d
// Group 6xx: Snow
// 600	Snow	light snow	 13d
// 601	Snow	snow	 13d
// 602	Snow	heavy snow	 13d
// 611	Snow	sleet	 13d
// 612	Snow	light shower sleet	 13d
// 613	Snow	shower sleet	 13d
// 615	Snow	light rain and snow	 13d
// 616	Snow	rain and snow	 13d
// 620	Snow	light shower snow	 13d
// 621	Snow	shower snow	 13d
// 622	Snow	heavy shower snow	 13d
// Group 7xx: Atmosphere
// 701	Mist	mist	 50d
// 711	Smoke	smoke	 50d
// 721	Haze	haze	 50d
// 731	Dust	sand/dust whirls	 50d
// 741	Fog	fog	 50d
// 751	Sand	sand	 50d
// 761	Dust	dust	 50d
// 762	Ash	volcanic ash	 50d
// 771	Squall	squalls	 50d
// 781	Tornado	tornado	 50d
// Group 800: Clear
// 800	Clear	clear sky	 01d
//  01n
// Group 80x: Clouds
// 801	Clouds	few clouds: 11-25%	 02d
//  02n
// 802	Clouds	scattered clouds: 25-50%	 03d
//  03n
// 803	Clouds	broken clouds: 51-84%	 04d
//  04n
// 804	Clouds	overcast clouds: 85-100%	 04d
//  04n
