import './Header.css';
import {createElement} from '../../utils/Utils';
import { App } from '../../index';

export default function Header():HTMLElement {
    const header:HTMLElement = createElement('header', ['header'], )
    const title:HTMLElement = createElement('h1', ['header__title'],  'To Do List');
    const weatherWidget:HTMLElement = createElement('div', ["header__weather-widget"]);
    if(App.state.weatherData){
        const icon:HTMLElement = createElement('img', ["header__weather-widget-icon"], '', [{name:'src', value: `http:${App.state.weatherData.iconUrl}`}])
        const tempreture:HTMLElement = createElement('span', ['header__weather-widget-tempreture'], `${App.state.weatherData.temp}°`);
        const location:HTMLElement = createElement('span', ['header__weather-widget-location'], App.state.weatherData.location);
        weatherWidget.append(icon, tempreture, location);
    } 
        header.append(title, weatherWidget);
    return header;
}