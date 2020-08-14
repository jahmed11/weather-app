import React, { Component } from "react";
import City from "../component/city";
import axios from "axios";
import {
  WiDaySunny,
  WiDayCloudy,
  WiDayRain,
  WiDayThunderstorm,
  WiDayShowers,
  WiDaySnow,
} from "weather-icons-react";
import "./weather.css";
const api = {
  key: "05457bd8d6f43d8c5002ec44ed5ec445",
  baseURL: "api.openweathermap.org/data/2.5/",
};

class Weather extends Component {
  state = {
    name: "",
    cityName: "",
    description: "",
    temperature: null,
    feelsLike: null,
    max: null,
    min: null,
    id: null,
  };
  cityNameHandler = (event) => {
    event.preventDefault();
    const name = event.target.value;
    this.setState({
      cityName: name,
    });
  };
  s;
  componentDidUpdate(prevProps, prevState) {
    if (prevState.name !== this.state.name) {
      axios
        .get(
          `http://${api.baseURL}weather?q=${this.state.name}&units=metric&APPID=${api.key}`
        )
        .then((response) => {
          console.log(response.data);
          this.setState({
            description: response.data.weather[0].main,
            temperature: response.data.main.temp,
            feelsLike: response.data.main.feels_like,
            max: response.data.main.temp_max,
            min: response.data.main.temp_min,
            id: response.data.weather[0].id,
          });
        });
    }
  }
  searchedHandler = (event) => {
    event.preventDefault();
    const n = this.state.cityName;
    this.setState({
      name: n,
    });
  };
  weatherIcon = (id) => {
    if (id >= 200 && id <= 232) {
      return <WiDayThunderstorm size={80} />;
    }

    if (id >= 300 && id <= 321) {
      return <WiDayShowers size={80} />;
    }
    if (id >= 500 && id <= 531) {
      return <WiDayRain size={80} />;
    }
    if (id >= 600 && id <= 622) {
      return <WiDaySnow size={80} />;
    }
    if (id >= 701 && id <= 781) {
      return <WiDaySunny size={80} />;
    }
    if (id >= 801 && id <= 804) {
      return <WiDayCloudy size={80} />;
    }
    if ((id = 800)) {
      return <WiDaySunny size={80} />;
    }
  };
  render() {
    const temp = Math.floor(this.state.temperature);
    const feelslike = Math.floor(this.state.feelsLike);
    let show = null;
    if (this.state.name) {
      show = (
        <div className="data">
          <h1 className="cityName">{this.state.name}</h1>
          {this.weatherIcon(this.state.id)}
          <p>{temp}&deg;</p>
          <p>Feels Like: {feelslike}&deg;</p>
          <p>
            Min: {this.state.min}&deg; Max: {this.state.max}&deg;
          </p>

          <p>{this.state.description}</p>
        </div>
      );
    }

    return (
      <div className="weather">
        <h1 className="title">My Weather App</h1>
        <City changed={this.cityNameHandler} searched={this.searchedHandler} />
        {show}
      </div>
    );
  }
}

export default Weather;
