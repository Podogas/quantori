import React, { useRef } from 'react';
import './Nav.css';
import { TaskType, filterHandlerType } from '../../Utils/Interfaces';
const Nav = ({
  incompletedTasks, 
  filterHandler, 
  filterOn, 
  setPopupType
}:{
  incompletedTasks:TaskType[], 
  filterHandler:filterHandlerType, 
  filterOn:boolean, 
  setPopupType: (value: string | boolean) => void 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  if(!filterOn){
    if(inputRef.current?.value){
      inputRef.current.value = '';
    }  
  }
  const openPopup = () => {
    setPopupType('popup')
  }
  const onInputChange = () => {
    const value = inputRef.current?.value
    if(value?.replace(/\s/g, '') !== '') {
      const filtered:TaskType[] = incompletedTasks.filter((a) => {
        return a.title.toLowerCase().includes(value?.toLowerCase() ?? '')
      })
      filterHandler(filtered);
    }
    else {
      filterHandler([])
    }
  }
  return (
    <nav className='nav'>
      <input  className="nav__input" ref={inputRef} onChange={onInputChange} placeholder="Search Task" type="text" />
      <button className='nav__button' type="button" onClick={openPopup} ref={buttonRef}>+ New Task</button>
    </nav>
  );
}

export default Nav;
