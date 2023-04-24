function createElement(element, classList, text, attr){
    let el = undefined;
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
function formatDate(day){
    const yyyy = day.getFullYear();
    let mm = day.getMonth() + 1;
    let dd = day.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return `${dd}.${mm}.${yyyy}`;
};
function getDayPart() {
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