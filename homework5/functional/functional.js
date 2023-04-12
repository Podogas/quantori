 (function () {
    function getLocalStorage(key){
        return JSON.parse(localStorage.getItem(key));
    }
    function changeLocalStorage(key ,data){
        return localStorage.setItem(key, JSON.stringify(data));
    }
    const appContainer = document.getElementById("functional-example");
    let isPopupOpened = false;
    let popup = Popup();
    let tasksFromMockup = {
        initialTasks: [
                {  
                public: {
                 titleText: 'Task 1 Title',
                 tagText: 'work',
                 date: 'Yesterday',
                },
                 _private: {
                    tagModifier: '--work',
                }
              },
              {
              public: {
                titleText: 'Task 2 Title',
                tagText: 'tag',
                date: 'Today',
                },
                _private: {
                    tagModifier: '--other',
                }
              },
              {
                public: {
                titleText: 'Task 3 Title',
                tagText: 'health',
                date: 'Friday, 23 Mar',
                },
                _private: {
                    tagModifier: '--health',
                }
             },
             {  public: {
                    titleText: 'Task 4 Title',
                    tagText: 'home',
                    date: 'Monday, 3 Apr',
                },
                _private: {
                    tagModifier: '--home',
                }
             },
            ],
            completedTasks: [
            {  
                public: {
                 titleText: 'Completed Task 1 Title',
                 tagText: 'tag',
                 date: 'Tuesday, 14 Feb',
                },
                 _private: {
                    tagModifier: '--completed',
                }
              },
              {  
                public: {
                 titleText: 'Completed Task 2 Title',
                 tagText: 'tag',
                 date: 'Friday, 3 Feb',
                },
                 _private: {
                    tagModifier: '--completed',
                }
              },
            ]      
        }
    // cheching if localStorage is set
    if(!getLocalStorage('initialTasks')) {
        changeLocalStorage('initialTasks', tasksFromMockup)
    }
    let ref = getLocalStorage('initialTasks');
    
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
            header.append(title);
            headerEl = header
        return headerEl
    }
    
    function Nav() {
        let nav = createElement('nav', ['nav'], )
        let input = createElement('input', ['nav__input'], '', [{name: "placeholder", value: "Search Task"}])
        let button = createElement('button', ['nav__button'], '+ New Task', [{name: "type", value: "button"}])
        function onInputChange() {
            const unFilteredResults = [...ref.initialTasks];
            let filteredResults = [];
            if (input.value.replace(/\s/g, '') !== '') {
                filteredResults = unFilteredResults.sort((a, b)=>{
                  return  b.public.titleText.toLowerCase().includes(input.value.toLowerCase()) - a.public.titleText.toLowerCase().includes(input.value.toLowerCase())
            })
        } else {
            filteredResults = ref.initialTasks;    
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
        let title = createElement('h3', ['all-tasks__title'],  'All Tasks');
        function Task(data) {
            let task = createElement('div', ["all-tasks__task"],);
            let checkbox = createElement('input', ['all-tasks__task-checkbox'], null, [{name: "type", value: "checkbox"}]);
            let taskInfoWrapper = createElement('div', ["all-tasks__task-info-wrapper"],);
            let taskTitle = createElement('h4', ["all-tasks__task-title"], data.public.titleText,);
            let taskCaptionWrapper = createElement('div', ["all-tasks__task-caption-wrapper"],);
            let taskTag = createElement('span', ['all-tasks__task-tag', `all-tasks__task-tag${data._private.tagModifier}`], data.public.tagText);
            let taskDate = createElement('span', ['all-tasks__task-date'], data.public.date);
            let taskButton = createElement('button', ['all-tasks__task-button'], null, [{name: "type", value: "button"}])
            function deleteTask() {
                ref.initialTasks = ref.initialTasks.filter(d => d!==data);
                changeLocalStorage('initialTasks', ref);
                deleteComponent(task,'all-tasks')
            }
            function moveTaskToComplited() {
                const dataToPush = ref.initialTasks.filter(d => d==data)[0];
                dataToPush._private.prevTagModifier = dataToPush._private.tagModifier;
                dataToPush._private.tagModifier = '--completed';
                ref.completedTasks.push(dataToPush)
                changeLocalStorage('initialTasks', ref)
                setTimeout(() => {
                    deleteTask(task);
                    updateComponent(CompletedTasks, ref.completedTasks, 'completed-tasks')
                }, 100)
                
            }

            taskButton.onclick = () => {
                deleteTask();
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
        
    }
    
    function CompletedTasks(tasks) {
        let section = createElement('section', ['completed-tasks'],)
        if (ref.completedTasks.length !== 0) {
            let title = createElement('h3', ['completed-tasks__title'],  'Completed Tasks');
            function Task(data) {
                let task = createElement('div', ["completed-tasks__task"],);
                let checkbox = createElement('input', ['completed-tasks__task-checkbox'], null, [{name: "type", value: "checkbox"}, {name: "checked", value: "true"}]);
                let taskInfoWrapper = createElement('div', ["completed-tasks__task-info-wrapper"],);
                let taskTitle = createElement('h4', ["completed-tasks__task-title"], data.public.titleText,);
                let taskCaptionWrapper = createElement('div', ["completed-tasks__task-caption-wrapper"],);
                let taskTag = createElement('span', ['completed-tasks__task-tag', `completed__task-tag${data._private.tagModifier}`], data.public.tagText);
                let taskDate = createElement('span', ['completed-tasks__task-date'], data.public.date);
                function deleteTask() {
                    ref.completedTasks = ref.completedTasks.filter(d => d!==data);
                    changeLocalStorage('initialTasks', ref)
                    deleteComponent(task,'completed-tasks')
                }
                function moveTaskToAllTasks() {
                    const dataToPush = ref.completedTasks.filter(d => d==data)[0];
                    const prevTagModifier = dataToPush._private.prevTagModifier ? dataToPush._private.prevTagModifier : '--other';
                    dataToPush._private.tagModifier = prevTagModifier;
                    ref.initialTasks.push(dataToPush)
                    deleteTask();
                    changeLocalStorage('initialTasks', ref)
                    updateComponent(AllTasks, ref.initialTasks, 'all-tasks');
                    
                }
                checkbox.onclick = moveTaskToAllTasks;
                taskCaptionWrapper.append(taskTag, taskDate);
                taskInfoWrapper.append(taskTitle, taskCaptionWrapper);
                task.append(checkbox,taskInfoWrapper);
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


    function Popup() {
        const formatDate = (day) => {
            const yyyy = day.getFullYear();
            let mm = day.getMonth() + 1;
            let dd = day.getDate();
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            return `${dd}.${mm}.${yyyy}`;
        };
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
            let taskDataTemplate = {
                public: {
                titleText: popupTextInputValue,
                tagText: popupTagValue,
                date: popupDateValue,
                },
                _private: {
                    tagModifier: `--${popupTagValue}`,
                }
            }
            ref.initialTasks.push(taskDataTemplate);
            changeLocalStorage('initialTasks', ref)
            updateComponent(AllTasks, ref.initialTasks, 'all-tasks');
            closePopup();
            
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

        appContainer.append(Header(), Nav(), AllTasks(ref.initialTasks), CompletedTasks(ref.completedTasks));
        return appContainer;
    }
    
    function deleteComponent(component, parentSelector) {
        const parentElement = appContainer.querySelector(`.${parentSelector}`)
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

    renderApp();
})();