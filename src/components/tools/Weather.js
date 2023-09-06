import { useContext, useState } from "react";
import classes from "./Weather.module.css";
import { GlobalContext } from "../../store/GlobalStore";

let url2Data;

const Weather = () => {
  const context = useContext(GlobalContext);
  const [location, changeLocation] = useState("");
  const [country, changeCountry] = useState("");
  const [icon, changeIcon] = useState("");
  const [temp, changetemp] = useState("");
  const [pressure, changepressure] = useState("");
  const [humidity, changehumidity] = useState("");
  const [fetched, changeFetched] = useState(false);
  const [error, changeError] = useState("");

  async function fetchdata(lat, long, key) {
    const url2 = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${lat},${long}&aqi=no`;
    try {
      const response = await fetch(url2);
      if (!response.ok) {
        throw new Error("Something went wrong Try after sometime");
      }
      const result = await response.json();
      console.log(result);
      url2Data = result;
      changeLocation(url2Data.location.region);
      changeCountry(url2Data.location.country);
      changeIcon(url2Data.current.condition.icon);
      changetemp(url2Data.current.temp_c);
      changehumidity(url2Data.current.humidity);
      changepressure(url2Data.current.pressure_mb);
      changeFetched((previous) => !previous);
    } catch (error) {
      console.log(error.message);
      context.contentType("fiveZeroThree");
      context.showUI();
      changeError(error);
    }
  }

  function fetchdatahandler() {
    navigator.geolocation.getCurrentPosition(show);

    function show(position) {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      const key = process.env.REACT_APP_WEATHERKEY;
      fetchdata(lat, long, key);
    }
  }
  return (
    <section className={classes.sectionWeather}>
      <button
        onClick={fetchdatahandler}
        className={`${fetched ? classes.buttonAnimation : undefined}`}
      >
        Location Weather
        <ion-icon name="cloud-circle-outline"></ion-icon>
      </button>
      <div
        className={`${classes.weatherContainer} ${
          fetched ? classes.detailsAnimation : undefined
        }`}
      >
        <div className={classes.state__temp}>
          <div>
            <h1 className={classes.heading}>Place</h1>

            <div>
              {url2Data ? location : ""}
              <br />
              {url2Data ? country : "--"}
            </div>
          </div>
          <div className={classes.icon}>
            {url2Data ? <img src={icon} alt="Weather Icon" /> : ""}
          </div>
        </div>
        <div className={classes.forecast}>
          <div>
            <span className={classes.heading}>Temperature</span>
            <br></br>
            {url2Data ? temp + " °C" : "--"}
          </div>
          <div>
            <span className={classes.heading}>Pressure</span>
            <br></br>
            {url2Data ? pressure + " MB" : "--"}
          </div>
          <div>
            <span className={classes.heading}>Humidity</span>
            <br></br>
            {url2Data ? humidity + " %" : "--"}
          </div>
        </div>
        {error}
      </div>
    </section>
  );
};

export default Weather;
