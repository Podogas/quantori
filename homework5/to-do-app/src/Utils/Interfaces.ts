interface WeatherDataType {
    locationName: string,
    temp: string,
    icon: {
        url: string,
        description: string
    }
}
interface WeatherApiResponseType {
    location: {
        name: string,
        region: string,
        country: string,
        lat: number,
        lon: number,
        tz_id: string,
        localtime_epoch: number,
        localtime: string
        },
        current: {
            last_updated_epoch: number,
            last_updated: string,
            temp_c: number,
            temp_f: number,
            is_day: number,
            condition: {
                text: string,
                icon: string,
                code: number
            },
            wind_mph:number,
            wind_kph: number,
            wind_degree: number,
            wind_dir: string,
            pressure_mb: number,
            pressure_in: number,
            precip_mm: number,
            precip_in: number,
            humidity: number,
            cloud: number,
            feelslike_c:number,
            feelslike_f: number,
            vis_km:number,
            vis_miles:number,
            uv: number,
            gust_mph: number,
            gust_kph:number
        }
}
interface TaskType {
        updatedAt: number,
        title: string,
        isCompleted: boolean,
        tag : string,
        date: string,
        id?: string,
        prevTag?: string 
}
interface deleteHandlerType {
    (id:string):void
}
interface taskHandlerType {
    (task:TaskType):void
}
interface editTaskHandlerType {
    (task:TaskType, id:string|undefined):void
}

interface addTaskHandlerType {
    (data:TaskType):void
}
interface filterHandlerType {
    (tag:string | undefined, query:string | undefined):void
}
export type {
    TaskType,
    WeatherDataType,
    WeatherApiResponseType,
    deleteHandlerType,
    taskHandlerType,
    addTaskHandlerType,
    filterHandlerType,
    editTaskHandlerType
};