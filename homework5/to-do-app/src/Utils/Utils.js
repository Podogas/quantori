import { TasksType,TaskType } from "./Interfaces";


const formateWeather = (weather) => {
    if(weather){
        const _weatherObj = {
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
function formatDate(day){
    const yyyy = day.getFullYear();
    let mm = day.getMonth() + 1;
    let dd = day.getDate();
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

// interface WeatherData {
//     iconUrl: string,
//     location: string,
//     temp: number
// }
// interface Task {
//         updatedAt: number,
//         title: string,
//         isCompleted: boolean,
//         tag : string,
//         date: string,
//         id?: string,
//         prevTag?: string 
// }

// interface Tasks {
//     completed: Array<Task>,
//     incompleted: Array<Task>
// }
// interface State {
//     tasks: Tasks,
//     weatherData: WeatherData
// }