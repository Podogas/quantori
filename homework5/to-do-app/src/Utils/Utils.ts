import { TaskType, WeatherApiResponseType, WeatherDataType } from "./Interfaces";
const formateWeather = (weather:WeatherApiResponseType) => {
    if(weather){
        const _weatherObj:WeatherDataType = {
            locationName: weather.location.name,
            temp: `${weather.current.temp_c}°`,
            icon: {
                url: `https://${weather.current.condition.icon}`,
                description: `${weather.current.condition.text}`
            }
        }
        return _weatherObj;
    }
    return;
}   
function formatDate(day:Date){
    const yyyy = day.getFullYear();
    let mm: string | number = day.getMonth() + 1;
    let dd: string | number = day.getDate();
    if (dd < 10) dd = `0${dd}`;
    if (mm < 10) mm = `0${mm}`;
    return `${dd}.${mm}.${yyyy}`;
};
function getDayPart(){
    let hour = new Date().getHours();    
    if(hour<5){
        return 'Night'
    } else if(hour<12){
        return 'Morning'
    } else if(hour<17){
        return 'Afternoon'
    } else if(hour<21){
        return 'Evening'
    } else {
        return 'Night'
    }
     
}
export { formateWeather, formatDate, getDayPart};