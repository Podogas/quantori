 (function () {
    const weatherApiKey = '664cca40924e42439d4161003231504';
    const weatherApiUrl = 'http://api.weatherapi.com/v1/current.json';
    const dbUrl = 'http://localhost:3004';
    const appContainer = document.getElementById("functional-example");
    let isPopupOpened = false;
    let popup = Popup();
    let weatherData;
    let dbData = {};
    function formatDate(day){
        const yyyy = day.getFullYear();
        let mm = day.getMonth() + 1;
        let dd = day.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        return `${dd}.${mm}.${yyyy}`;
    };
    function checkIfModalWasShown() {
        const date = new Date;
        function getArrayOfTasksForToday(tasks) {
            const arrayForToday = tasks.filter((task) => task.date == formatDate(date));
            return arrayForToday;
        }
        lastVisit = window.localStorage.getItem('last-visit');
        const arr =  getArrayOfTasksForToday(dbData.tasks.incompleted)
        if(!lastVisit && arr.length != 0){
            window.localStorage.setItem('last-visit', date.getDate());
            appContainer.append(Modal(arr));
        }
    }
    function getWeather(url, key, query) {
        return fetch( `${url}?key=${key}&q=${query}&aqi=no`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(res => res.ok ? res.json() : undefined)
        .then( resJson => {
            if(resJson){
                weatherData = {};
                weatherData['iconUrl'] = resJson.current.condition.icon;
                weatherData['location'] = resJson.location.name;
                weatherData['temp'] = resJson.current.temp_c;
            }
            return resJson;
        })
    }
    function postTask(baseUrl, data) {
        return fetch( `${baseUrl}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
    }

    function getAllTasks(baseUrl) {
        return fetch( `${baseUrl}/tasks`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then( res => res.json())
        .catch(err => console.error(err))
        .then(resJson => {
            if(resJson){
                dbData['tasks'] = {completed: [], incompleted: []};
                resJson.map(el => el.isCompleted == true ? dbData.tasks.completed.push(el) :  dbData.tasks.incompleted.push(el));
                dbData.tasks.completed.sort((a, b) => a.updatedAt - b.updatedAt);
                dbData.tasks.incompleted.sort((a, b) => a.updatedAt - b.updatedAt);                
            }
            return resJson;
        })
    }
    
    function deleteTask(baseUrl, id) {
        return fetch( `${baseUrl}/tasks/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
    }
    function updateTask(baseUrl, data, id) {
        return fetch( `${baseUrl}/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then( res => res.json())
    }
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

    function Header() {
        let header = createElement('header', ['header'], )
        let title = createElement('h1', ['header__title'],  'To Do List');
        let weatherWidget = createElement('div', ["header__weather-widget"]);
        if(weatherData){
            let icon = createElement('img', ["header__weather-widget-icon"], '', [{name:'src', value: `http:${weatherData.iconUrl}`}])
            let tempreture = createElement('span', ['header__weather-widget-tempreture'], `${weatherData.temp}°`);
            let location = createElement('span', ['header__weather-widget-location'], weatherData.location);
            weatherWidget.append(icon, tempreture, location);
        } 
            header.append(title, weatherWidget);
        return header;
    }
    
    function Nav() {
        let nav = createElement('nav', ['nav'], )
        let input = createElement('input', ['nav__input'], '', [{name: "placeholder", value: "Search Task"}])
        let button = createElement('button', ['nav__button'], '+ New Task', [{name: "type", value: "button"}])
        function onInputChange() {
            const unFilteredResults = [...dbData.tasks.incompleted];
            let filteredResults = [];
            if (input.value.replace(/\s/g, '') !== '') {
                filteredResults = unFilteredResults.filter((a)=>{
                  return  a.title.toLowerCase().includes(input.value.toLowerCase())
            })
        } else {
            filteredResults = dbData.tasks.incompleted;    
        }
            updateComponent(AllTasks, filteredResults,'all-tasks');   
        }
        function openPopup() {
            isPopupOpened = !isPopupOpened;
            togglePopup();
        }
        input.oninput = onInputChange;
        button.onclick = openPopup;
        nav.append(input, button);
        return nav;
    }
    
    function AllTasks(tasks) {
        let section = createElement('section', ['all-tasks'],)
        if (tasks.length !== 0) {
        let title = createElement('h3', ['all-tasks__title'],  'All Tasks');
        function Task(data) {
            let task = createElement('div', ["all-tasks__task"],);
            let checkbox = createElement('input', ['all-tasks__task-checkbox'], null, [{name: "type", value: "checkbox"}]);
            let taskInfoWrapper = createElement('div', ["all-tasks__task-info-wrapper"],);
            let taskTitle = createElement('h4', ["all-tasks__task-title"], data.title,);
            let taskCaptionWrapper = createElement('div', ["all-tasks__task-caption-wrapper"],);
            let taskTag = createElement('span', ['all-tasks__task-tag', `all-tasks__task-tag--${data.tag}`], data.tag);
            let taskDate = createElement('span', ['all-tasks__task-date'], data.date);
            let taskButton = createElement('button', ['all-tasks__task-button'], null, [{name: "type", value: "button"}])
            function removeTask() {
                deleteTask(dbUrl, data.id)
                .then(res => res.json())
                .catch(err => console.error(err, err.message))
                .then( () => {
                    removeTaskFromList();
                })
            }
            function removeTaskFromList() {
                dbData.tasks.incompleted = dbData.tasks.incompleted.filter(d => d!==data);
                deleteComponent(task,'.all-tasks');   
            }
            function moveTaskToComplited() {
                const dataToPush = dbData.tasks.incompleted.filter(d => d==data)[0];
                dataToPush.isCompleted = true;
                dataToPush.prevTag = dataToPush.tag;
                dataToPush.updatedAt = Date.now();
                dbData.tasks.completed.unshift(dataToPush)
                updateTask(dbUrl, dataToPush ,data.id)
                .catch(err => console.error(err, err.message))
                .then( () => {
                    setTimeout(() => {
                        removeTaskFromList(task);
                        updateComponent(CompletedTasks, dbData.tasks.completed, 'completed-tasks');
                        updateComponent(AllTasks, dbData.tasks.incompleted, 'all-tasks');
                    }, 100);
                })


                
                
            }

            taskButton.onclick = () => {
                removeTask();

            }
            checkbox.onclick = () => {
                moveTaskToComplited();

            }
            taskCaptionWrapper.append(taskTag, taskDate);
            taskInfoWrapper.append(taskTitle, taskCaptionWrapper);
            task.append(checkbox,taskInfoWrapper, taskButton);
            return task;
        }
        let taskElArray = [];
        tasks.forEach(taskData => {
            taskElArray.push(Task(taskData))});
        section.innerHTML = ''
        section.append(title, ...taskElArray)
        return section;
        }  else {
            section.style.display = 'none';
            return section;
        }
    }
    
    function CompletedTasks(tasks) {
        let section = createElement('section', ['completed-tasks'],)
        if (dbData.tasks.completed.length !== 0) {
            let title = createElement('h3', ['completed-tasks__title'],  'Completed Tasks');
            function Task(data) {
                let task = createElement('div', ["completed-tasks__task"],);
                let checkbox = createElement('input', ['completed-tasks__task-checkbox'], null, [{name: "type", value: "checkbox"}, {name: "checked", value: "true"}]);
                let taskInfoWrapper = createElement('div', ["completed-tasks__task-info-wrapper"],);
                let taskTitle = createElement('h4', ["completed-tasks__task-title"], data.title,);
                let taskCaptionWrapper = createElement('div', ["completed-tasks__task-caption-wrapper"],);
                let taskTag = createElement('span', ['completed-tasks__task-tag', `completed__task-tag--completed`], data.tag);
                let taskDate = createElement('span', ['completed-tasks__task-date'], data.date);
                function removeTaskFromList() {
                    dbData.tasks.completed = dbData.tasks.completed.filter(d => d!==data);
                    deleteComponent(task,'.completed-tasks')
                }
                function moveTaskToAllTasks() {
                    const dataToPush = dbData.tasks.completed.filter(d => d==data)[0];
                    const prevTag = dataToPush.prevTag ? dataToPush.prevTag : 'other';
                    dataToPush.tag = prevTag;
                    dataToPush.isCompleted = false;
                    dataToPush.updatedAt = Date.now();
                    dbData.tasks.incompleted.push(dataToPush);
                    updateTask(dbUrl, dataToPush ,data.id)
                    .catch(err => console.error(err, err.message))
                    .then( () => {
                        removeTaskFromList();
                        updateComponent(AllTasks, dbData.tasks.incompleted, 'all-tasks');
                        updateComponent(CompletedTasks, dbData.tasks.completed, 'completed-tasks');
                    })
                    
                    
                }
                checkbox.onclick = moveTaskToAllTasks;
                taskCaptionWrapper.append(taskTag, taskDate);
                taskInfoWrapper.append(taskTitle, taskCaptionWrapper);
                task.append(checkbox,taskInfoWrapper);
                if(dbData.tasks.completed.length == 0) {
                    task = '';
                }
                return task;
            }
            let taskElArray = [];
            tasks.forEach(taskData => {
            taskElArray.push(Task(taskData))});
            section.append(title, ...taskElArray)
            return section;
        }  else {
            section.style.display = 'none';
            return section;
        }
    }

    function Modal(tasks) {
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
        function closeModal(){
            appContainer.removeChild(section)

        }
        function fillList(task){
            const listItem = createElement('li', ['modal__list-item']);
            listItem.innerText = task.title;
            return listItem;
        }
        const section = createElement('section', ['modal'],);
        const title = createElement('h2', ['modal__title'], `Good ${getDayPart()}`);
        const listCaption = createElement('p', ['modal__list-caption'], 'You have the next planned tasks for today: ');
        const list = createElement('ul', ['modal__list']);
        const button = createElement('button', ['modal__button'], 'Ok', [{name: 'type', value: 'button'}]);
        button.onclick = closeModal;
        let taskElArray = [];
        tasks.forEach(taskData => {
            taskElArray.push(fillList(taskData))});
        list.append(...taskElArray);
        section.append(title, listCaption, list, button);
        return section;
    }

    function Popup() {
        let popupTextInputValue = '';
        let popupTagValue = '';
        let popupDateValue = `${formatDate(new Date())}`;
        let popup = createElement('section', ['popup'],);
        let title = createElement('h2', ['popup__title'], 'Add New Task');
        let input = createElement('input', ['popup__input'], null, [{name: 'type',value: 'text'},{name: 'placeholder' ,value: 'Task Title'}]);
        let infoWrapper = createElement('div', ['popup__info-wrapper']);
        let infoTagsWrapper = createElement('div', ['popup__info-tags-wrapper']);
        let infoTagHealth = createElement('span', ['popup__info-tag', 'popup__info-tag--health'], 'health')
        let infoTagWork = createElement('span', ['popup__info-tag', 'popup__info-tag--work'], 'work')
        let infoTagHome = createElement('span', ['popup__info-tag', 'popup__info-tag--home'], 'home')
        let infoTagOther = createElement('span', ['popup__info-tag', 'popup__info-tag--other'], 'other')
        let infoDateWrapper = createElement('div', ['popup__info-date-input-wrapper'], popupDateValue);
        let dateInput = createElement('input', ['popup__info-date-input'], null, [{name: 'type', value: 'date'}])
        let buttonsWrapper = createElement('div', ['popup__buttons-wrapper']);
        let cancelButton = createElement('button', ['popup__buttons', 'popup__buttons-cancel'], 'Cancel', [{name: 'type', value: 'button'}]);
        let addButton = createElement('button', ['popup__buttons', 'popup__buttons-add', 'popup__buttons-add--disabled'], 'Add Task', [{name: 'type', value: 'button'}]);
        function addNewTask() {
            let taskDataTemplate = 
            {   updatedAt: Date.now(),
                title: popupTextInputValue,
                isCompleted: false,
                tag: popupTagValue,
                date: popupDateValue
              }
            postTask(dbUrl, taskDataTemplate)
            .then(res => res.json())
            .catch(err => console.error(err, err.message))
            .then(resJson => {
                dbData.tasks.incompleted.push(resJson);
                updateComponent(AllTasks, dbData.tasks.incompleted, 'all-tasks');
                closePopup();
            })   
        }
        function validate() {
            if(popupTextInputValue.replace(/\s/g, '') !== '' && popupTagValue !== ''){
                addButton.addEventListener("click", addNewTask);
                addButton.classList.remove('popup__buttons-add--disabled');

            } else {
                addButton.removeEventListener("click", addNewTask);
                addButton.classList.add('popup__buttons-add--disabled');
            }
        }
        function addText(){
            popupTextInputValue = input.value;
            validate();
        }
        function addInfoTag(e){
            let tagValue = e.target.innerText;
            infoTagHealth.classList.remove(`popup__info-tag--health--selected`);
            infoTagWork.classList.remove(`popup__info-tag--work--selected`);
            infoTagHome.classList.remove(`popup__info-tag--home--selected`);
            infoTagOther.classList.remove(`popup__info-tag--other--selected`);
            if(tagValue == popupTagValue){
                tagValue = '';
            } else {
                e.target.classList.add(`popup__info-tag--${tagValue}--selected`);
            }
            
            switch (tagValue) {
                case 'health':
                    popupTagValue = 'health'
                  break;
                case 'work':
                    popupTagValue = 'work'
                  break;
                case 'home':
                    popupTagValue = 'home'
                  break;
                case 'other':
                    popupTagValue = 'other'
                  break; 
                default:
                    popupTagValue = ''
              }
              validate();
        }
        function addDate(e){
            const inputValue = e.target.value;
            const dd = inputValue.slice(8, 10);
            const mm = inputValue.slice(5, 7);
            const yyyy = inputValue.slice(0, 4);
            popupDateValue = `${dd}.${mm}.${yyyy}`;
            infoDateWrapper.textContent = popupDateValue;
            infoDateWrapper.append(dateInput);
        }
        function closePopup(){
            isPopupOpened = !isPopupOpened;
            togglePopup();
        }
        cancelButton.onclick = closePopup;
        input.oninput = addText;
        infoTagHealth.onclick = addInfoTag;
        infoTagWork.onclick = addInfoTag;
        infoTagHome.onclick = addInfoTag;
        infoTagOther.onclick = addInfoTag;
        dateInput.onchange = addDate;
        infoTagsWrapper.append(infoTagHealth, infoTagWork, infoTagHome, infoTagOther);
        infoDateWrapper.append(dateInput);
        infoWrapper.append(infoTagsWrapper, infoDateWrapper);
        buttonsWrapper.append(cancelButton, addButton);
        popup.append(title, input, infoWrapper,buttonsWrapper);
        return popup;
    }
    
    
    function App() {
        appContainer.append(Header(), Nav(), AllTasks(dbData.tasks.incompleted), CompletedTasks(dbData.tasks.completed));
        return appContainer;
    }
    
    function deleteComponent(component, parentSelector) {
        const parentElement = appContainer.querySelector(parentSelector)
        parentElement.removeChild(component)
    }
    
    function updateComponent(component, data, selector) {
        const htmlElement = appContainer.querySelector(`.${selector}`)
        htmlElement.replaceWith(component(data));
    }
    
    function togglePopup(){
        if (isPopupOpened){
            popup = Popup()
            appContainer.append(popup)
        } else {
            appContainer.removeChild(popup)
            popup = null;
        }    
    }
    function renderApp() {
       App()
    }
    function fetchDataByApi() {
        Promise.all([
            getAllTasks(dbUrl),
            getWeather(weatherApiUrl, weatherApiKey, `tbilisi`),
        ])
        .then((data) => {
            const tasks = data[0];
            const weather = data[1];
            return tasks;
          })
        .then(tasks => {
            if(tasks){
                renderApp();
            }
        })
        .then(() => checkIfModalWasShown())
        .then(() => navigator.geolocation.getCurrentPosition(onAcceptGeo, onDeclineGeo))
        
    }

    function onAcceptGeo(position) {
        getWeather(weatherApiUrl, weatherApiKey, `${position.coords.latitude},${position.coords.longitude}`)
        .then( res => {
            weatherData = {};
            weatherData['iconUrl'] = res.current.condition.icon;
            weatherData['location'] = res.location.name;
            weatherData['temp'] = res.current.temp_c;
            updateComponent( Header, '', 'header')
        })
    }
    function onDeclineGeo() {
        console.warn('You have blocked site from getting your location, location is now set to default (Tbilisi)')
    }    
    fetchDataByApi();
    
})();
