import { useRef } from 'react';
import './Nav.css';
import { filterHandlerType } from '../../Utils/Interfaces';
import React from 'react';
const Nav = ({
  // incompletedTasks, 
  filterHandler, 
  // filterOn, 
  setPopupType
}:{
  // incompletedTasks:TaskType[], 
  filterHandler:filterHandlerType, 
  // filterOn:boolean, 
  setPopupType: (value: string | boolean) => void 
}) => {
  console.log('nav rerenders')
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // if(!filterOn){
  //   if(inputRef.current?.value){
  //     inputRef.current.value = '';
  //   }  
  // }
  const openPopup = () => {
    setPopupType('popup')
  }
  const onFocusOut = () => {
    if(inputRef.current){inputRef.current.value = ''};
    filterHandler(undefined);
  }
  const onInputChange = () => {
    const value = inputRef.current?.value
    if(value && value.replace(/\s/g, '') !== '') {
      filterHandler(value);
    }
    else {
      filterHandler(undefined)
    }
  }
  return (
    <nav className='nav'>
      <input  className="nav__input" ref={inputRef} onChange={onInputChange} onBlur={onFocusOut} placeholder="Search Task" type="text" />
      <button className='nav__button' type="button" onClick={openPopup} ref={buttonRef}>+ New Task</button>
    </nav>
  );
}

export default React.memo(Nav);
