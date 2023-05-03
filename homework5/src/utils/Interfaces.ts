interface WeatherData {
    iconUrl: string,
    location: string,
    temp: number
}
interface Task {
        updatedAt: number,
        title: string,
        isCompleted: boolean,
        tag : string,
        date: string,
        id?: string,
        prevTag?: string 
}

interface Tasks {
    completed: Array<Task>,
    incompleted: Array<Task>
}
interface State {
    tasks: Tasks,
    weatherData: WeatherData
}

export {Tasks, Task, WeatherData, State};