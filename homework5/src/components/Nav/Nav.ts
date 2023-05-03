import "./Nav.css";
import {createElement} from '../../utils/Utils';
import { updateComponent, togglePopup, App} from "../../index";
import AllTasks from "../AllTasks/AllTasks";

export default function Nav():HTMLElement {
    const nav:HTMLElement = createElement('nav', ['nav'], )
    const input = createElement('input', ['nav__input'], '', [{name: "placeholder", value: "Search Task"}]) as HTMLInputElement;
    const button:HTMLElement = createElement('button', ['nav__button'], '+ New Task', [{name: "type", value: "button"}])
    function onInputChange() {
        const unFilteredResults = [...App.state.tasks.incompleted];
        let filteredResults = {completed: {}, incompleted: {}};
        const inputValue = input?.value;
        if (inputValue.replace(/\s/g, '') !== '') {
            filteredResults.incompleted = unFilteredResults.filter((a)=>{
              return  a.title.toLowerCase().includes(inputValue.toLowerCase())
        })
    } else {
        filteredResults = App.state.tasks;    
    }
        updateComponent(AllTasks, filteredResults,'all-tasks');   
    }
    function openPopup() {
        togglePopup(undefined);
    }
    input.oninput = onInputChange;
    button.onclick = openPopup;
    nav.append(input, button);
    return nav;
}
