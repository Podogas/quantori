import './Header.css';
import {createElement} from '../../utils/Utils';
import { App } from '../../index.js';

export default function Header() {
    const header = createElement('header', ['header'], )
    const title = createElement('h1', ['header__title'],  'To Do List');
    const weatherWidget = createElement('div', ["header__weather-widget"]);
    if(App.state.weatherData){
        const icon = createElement('img', ["header__weather-widget-icon"], '', [{name:'src', value: `http:${App.state.weatherData.iconUrl}`}])
        const tempreture = createElement('span', ['header__weather-widget-tempreture'], `${App.state.weatherData.temp}°`);
        const location = createElement('span', ['header__weather-widget-location'], App.state.weatherData.location);
        weatherWidget.append(icon, tempreture, location);
    } 
        header.append(title, weatherWidget);
    return header;
}