import React, { useEffect, useState } from 'react';
import './WeatherWidget.css';
import { getWeather } from '../../Api/Api';
import { WeatherDataType } from '../../Utils/Interfaces';

const WeatherWidget = ({blockName,weather}:{blockName:string,weather:WeatherDataType | undefined}) => {
  if(weather){
    return (
      <div className={`${blockName}__weather-widget`}>
          <img className={`${blockName}__weather-widget-icon`} src={weather.icon.url} alt={weather.icon.description} />
          <span className={`${blockName}__weather-widget-tempreture`}>{weather.temp}</span>
          <span className={`${blockName}__weather-widget-location`}>{weather.locationName}</span>
      </div>
    );
  }
  return null;
}

export default WeatherWidget;