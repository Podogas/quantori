import "./Nav.css";
import {createElement} from '../../utils/Utils';
import { updateComponent, togglePopup, App} from "../../index.js";
import AllTasks from "../AllTasks/AllTasks";

export default function Nav() {
    const nav = createElement('nav', ['nav'], )
    const input = createElement('input', ['nav__input'], '', [{name: "placeholder", value: "Search Task"}])
    const button = createElement('button', ['nav__button'], '+ New Task', [{name: "type", value: "button"}])
    function onInputChange() {
        const unFilteredResults = [...App.state.tasks.incompleted];
        let filteredResults = {};
        if (input.value.replace(/\s/g, '') !== '') {
            filteredResults.incompleted = unFilteredResults.filter((a)=>{
              return  a.title.toLowerCase().includes(input.value.toLowerCase())
        })
    } else {
        filteredResults = App.state.tasks;    
    }
        updateComponent(AllTasks, filteredResults,'all-tasks');   
    }
    function openPopup() {
        togglePopup();
    }
    input.oninput = onInputChange;
    button.onclick = openPopup;
    nav.append(input, button);
    return nav;
}