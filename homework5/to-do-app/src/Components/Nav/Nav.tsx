import { useRef } from 'react';
import './Nav.css';
import { filterHandlerType } from '../../Utils/Interfaces';
import React from 'react';
const Nav = ({
  filterHandler,
  setPopupType
}:{
  filterHandler:filterHandlerType,
  setPopupType: (value: string | boolean) => void 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
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
