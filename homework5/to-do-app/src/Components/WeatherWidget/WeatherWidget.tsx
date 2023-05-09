import './WeatherWidget.css';
import { WeatherDataType } from '../../Utils/Interfaces';
import { onAcceptGeo, onDeclineGeo } from '../../Api/Api';
import { useEffect, useState } from 'react';

const WeatherWidget = ({blockName}:{blockName:string}) => {
  const [weather, setWeather] = useState<WeatherDataType | undefined>({icon:{url:'',description:''}, locationName:'', temp:''});
  const acceptGeoHandler = (position:GeolocationPosition) => {
    onAcceptGeo(position)
    .then(res => setWeather(res)) 
    .catch(err => console.error(err.message))
  }
  const onDeclineGeoHandler = () => {
    onDeclineGeo()
    .then(res => setWeather(res))
    .catch(err => console.error(err.message))
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(acceptGeoHandler, onDeclineGeoHandler); 
  }, [])
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