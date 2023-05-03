function createElement(
    element: string, classList?: Array<string>, text?: string, attr?: Array<{name: string, value: string}>
    ):HTMLElement | undefined {
    let el: HTMLElement | undefined;
    if(element){
        el = document.createElement(element);
    }
    if(classList){
        classList.forEach(item => el.classList.add(item));
    }
    if(text){
        el.innerText = text;
    }
    if(attr){
        attr.forEach(item => el.setAttribute(item.name, item.value));
    }    
    return el;
}
function formatDate(day: Date):string{
    const yyyy: number = day.getFullYear();
    let mm: number | string = day.getMonth() + 1;
    let dd: number | string = day.getDate();
    if (dd < 10) dd = `0${dd}`;
    if (mm < 10) mm = `0${mm}`;
    return `${dd}.${mm}.${yyyy}`;
};
function getDayPart():string {
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

export {createElement, formatDate, getDayPart};