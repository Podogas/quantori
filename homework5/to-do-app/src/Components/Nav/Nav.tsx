import { useEffect, useRef, useState } from 'react';
import './Nav.css';
import React from 'react';
import Tags from '../Tags/Tags';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TaskType } from '../../Utils/Interfaces';
const Nav = ({
  //pathName,
  //setPathName,
  setFilter,
  setPopupType,
  setPopupContent
}:{
  //pathName:string,
  //setPathName:(value: string) => void 
  setFilter:({tag, query}:{tag:string, query:string}) => void,
  setPopupType: (value: string | boolean) => void,
  setPopupContent: (value: undefined | TaskType | TaskType[]) => void 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

const [query, setQuery] = useState("")
const [tag, setTag] = useState("")
const navigate = useNavigate();
useEffect(() => {
  
  setFilter({tag, query})
  // here we can call filter function an pass query and tag
},[tag, query])
useEffect(() => {
  const params = new URLSearchParams()
  if (query.replace(/\s/g, '') !== '') {
    params.append("q", query)
  } else {
    params.delete("q")
  }
  navigate({search: params.toString()})
}, [query, navigate])

  const location = useLocation();
  const path = location.pathname;
  const search = location.search.replace('?q=','');
useEffect(()=> {
  const decodedQuery = decodeURIComponent(search).replace( /\+/g, ' ' )
  setQuery(decodedQuery);
  switch(path){
    case('/tasks/health'): setTag('health') 
      break
    case('/tasks/work'): setTag('work') 
      break
    case('/tasks/home'): setTag('home') 
      break
    case('/tasks/other'): setTag('other') 
      break
    case('/tasks'): setTag('') 
      break  
    default: {
      setTag('')
      navigate('')}   
  }
},[])

  const openPopup = () => {
    setPopupContent(undefined)
    setPopupType('popup')
    console.log('click')
  }
  const onInputChange = () => {
    const value = inputRef.current?.value
    if(value) {
      setQuery(value)
    } else {
      setQuery('')
    }
  }
  const onSelectTag = (tag:string): void => {
    setTag(tag)
    navigate(tag)
  }
  return (
    <nav className='nav'>
      <div className='nav__search-form-wrapper'>
      <input  className="nav__input" ref={inputRef} onChange={onInputChange} placeholder="Search Task" type="text" value={query}/>
      <button className='nav__button' type="button" onClick={openPopup} ref={buttonRef}>+ New Task</button>
      </div>
      <Tags onSelectTag={onSelectTag} blockName='nav' initialSelectedTag={tag}/>
    </nav>
  );
}

export default React.memo(Nav);
