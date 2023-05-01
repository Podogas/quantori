//     if(App.state.weatherData){
//         const icon:HTMLElement = createElement('img', ["header__weather-widget-icon"], '', [{name:'src', value: `http:${App.state.weatherData.iconUrl}`}])
//         const tempreture:HTMLElement = createElement('span', ['header__weather-widget-tempreture'], `${App.state.weatherData.temp}°`);
//         const location:HTMLElement = createElement('span', ['header__weather-widget-location'], App.state.weatherData.location);
//         weatherWidget.append(icon, tempreture, location);
//     } 
import React, { useEffect, useState } from 'react';
import './WeatherWidget.css';
import { getWeather } from '../../Api/Api';
import { WeatherDataType } from '../../Utils/Interfaces';
// header__weather-widget

const WeatherWidget = ({blockName,weather}) => {
  if(weather){
    return (
      <div className={`${blockName}__weather-widget`}>
          <img className={`${blockName}__weather-widget-icon`} src={weather.icon.url} alt={weather.icon.description} />
          <span className={`${blockName}__weather-widget-tempreture`}>{weather.temp}</span>
          <span className={`${blockName}__weather-widget-location`}>{weather.locationName}</span>
      </div>
    );
  }
  
}

export default WeatherWidget;