import { useRef } from 'react';
import './Nav.css';
import { filterHandlerType } from '../../Utils/Interfaces';
import React from 'react';
import Tags from '../Tags/Tags';
import { useNavigate } from 'react-router';
const Nav = ({
  pathName,
  setPathName,
  filterHandler,
  setPopupType
}:{
  pathName:string,
  setPathName:(value: string) => void 
  filterHandler:filterHandlerType,
  setPopupType: (value: string | boolean) => void 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

 
  switch(pathName){
    case('/health'):filterHandler({title:'',tag:'health'}) ; break;
    case('/work'):filterHandler({title:'',tag:'work'})  ; break;
    case('/home'):filterHandler({title:'',tag:'home'})  ; break;
    case('/other'):filterHandler({title:'',tag:'other'}) ; break;
    case('/'):filterHandler({title:'',tag:''}) ; break;
  } 
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
      filterHandler({title: value, tag:pathName.replace('/', '')});
    }
    else {
      filterHandler(undefined)
    }
  }
  const onSelectTag = (tag:string): void => {
    setPathName(`/${tag}`)
    navigate(`/${tag}`)
  }
  return (
    <nav className='nav'>
      <div className='nav__search-form-wrapper'>
      <input  className="nav__input" ref={inputRef} onChange={onInputChange} onBlur={onFocusOut} placeholder="Search Task" type="text" />
      <button className='nav__button' type="button" onClick={openPopup} ref={buttonRef}>+ New Task</button>
      </div>
      <Tags onSelectTag={onSelectTag} blockName='nav' initialSelectedTag={pathName.replace('/','')}/>
    </nav>
  );
}

export default React.memo(Nav);
