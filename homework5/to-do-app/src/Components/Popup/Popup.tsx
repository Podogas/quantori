import React, {useEffect, useRef, useState} from 'react';
import './Popup.css';
import { formatDate, getDayPart } from '../../Utils/Utils';
import { TaskType,editTaskHandlerType } from '../../Utils/Interfaces';
import Tags from '../Tags/Tags';
import { postTask, updateTask } from '../../Api/Api';
import { addUncompletedTask, editTask } from '../../store/features/tasksSlice';
import { useAppDispatch } from '../../store/store';

const Popup = ({
  popupType,
  popupContent, 
  setPopupType,
  // tasksForToday,
  // editTaskHandler
}:{
  popupType:string | boolean,
  popupContent: TaskType | undefined,
  setPopupType: React.Dispatch<React.SetStateAction<string | boolean>>,
  // tasksForToday:TaskType[],
  // editTaskHandler:editTaskHandlerType  
}) => {
  const getInitialDate = () => {
    if(popupContent?.date){
      return popupContent.date
    } else {
      return formatDate(new Date());
    }
  }
  const [date, setDate] = useState(getInitialDate());
  const [isPopupFormValid, setIsPopupformValid] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const tagsRef = useRef<Array<React.RefObject<HTMLSpanElement>>>([...Array(4)].map(() => React.createRef<HTMLSpanElement>()));
  const inputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const addBtnRef = useRef<HTMLButtonElement>(null);
  const cancelBtnRef = useRef(null);
  
  useEffect(()=> {
    validate()
  },[selectedTag])
  
  const validate = () => {
    if(addBtnRef.current && inputRef.current){
      addBtnRef.current.classList.add('popup__buttons-add--disabled')
    const inputValue = inputRef.current.value;
    if(selectedTag.length !==0){
      if(inputValue.replace(/\s/g, '') !== ''){
        addBtnRef.current.classList.remove('popup__buttons-add--disabled')
        setIsPopupformValid(true);
      }
    }
    }
    
  }
  //
  const dispatch = useAppDispatch();
  const addTask = () => {
    if(isPopupFormValid){
      const data = {
        updatedAt: Date.now(),
        title: inputRef.current?.value ?? '',
        isCompleted: false,
        tag: selectedTag,
        date: date,
        prevTag: selectedTag
      }
      postTask(data)
      .then((res:TaskType) => {
        dispatch(addUncompletedTask(res))
        closePopup();
      })
      .catch(err => console.error(err))
      
    }  
  }
  const onEditTask = () => {
    if(isPopupFormValid){
      const data = {
        updatedAt: Date.now(),
        title: inputRef.current?.value ?? '',
        isCompleted: false,
        tag: selectedTag,
        date: date,
        prevTag: selectedTag,
        id: popupContent?.id
      }
      updateTask(data)
      .then(res => {
        dispatch(editTask(res))
        closePopup();
      })
      .catch(err => console.error(err))
      // editTaskHandler({
      //   updatedAt: Date.now(),
      //   title: inputRef.current?.value ?? '',
      //   isCompleted: false,
      //   tag: selectedTag,
      //   date: date,
      //   prevTag: selectedTag
      // }, popupContent?.id
      // )
    }  
  }
  const closePopup = () => {
    setPopupType(false)
  }
  const closeModal = () => {
    setPopupType(false)
  }
  const onSelectTag = (tag:string): void => {
    setSelectedTag(tag);
  }
  const changeDate = () => {
    const inputValue:string = dateInputRef.current?.value ?? '';
    const dd = inputValue.slice(8, 10);
    const mm = inputValue.slice(5, 7);
    const yyyy = inputValue.slice(0, 4);
    setDate(`${dd}.${mm}.${yyyy}`);
    validate();
  }

  
  if(popupType === 'modal'){
    const createListItem = (taskData:TaskType) => {
      return (<ul className='modal__list' key={taskData.id}>{taskData.title}</ul>)
    }
    return (
      <section className='modal'>
        <h2 className='modal__title'>Good {getDayPart()}</h2>
        <p className='modal__list-caption'>You have the next planned tasks for today: </p>
        {/* {tasksForToday.map(el => createListItem(el))} */}
        <button className='modal__button' type="button" onClick={closeModal}>Ok</button>
      </section>
    );  
  }
  if(popupType === 'popup'){
    return (      
      <section className='popup'>
      <h2 className='popup__title'>Add New Task</h2>
      <input className="popup__input" type="text" placeholder='Task Title' ref={inputRef} onChange={validate}/>
      <div className='popup__info-wrapper'>
      <Tags onSelectTag={onSelectTag} blockName='popup' initialSelectedTag=""/>
      <div className='popup__info-date-input-wrapper'>
        {date}
        <input className='popup__info-date-input' type="date" ref={dateInputRef} onChange={changeDate}/>
      </div>
      </div>
      <div className='popup__buttons-wrapper'>
        <button className='popup__buttons popup__buttons-cancel' type='button' ref={cancelBtnRef} onClick={closePopup}>Cancel</button>
        <button className='popup__buttons popup__buttons-add popup__buttons-add--disabled' type='button' ref={addBtnRef} onClick={addTask}>Add Task</button>
      </div>
      </section>
    );  
  }
  if(popupType === 'edit'){
    // let healthTagSelected = false;
    // let workTagSelected = false;
    // let homeTagSelected = false;
    // let otherTagSelected = false; 
    // switch(popupContent?.tag){
    //   case('health'): healthTagSelected = true; break;
    //   case('work'): workTagSelected = true; break;
    //   case('home'): homeTagSelected = true; break;
    //   case('other'): otherTagSelected = true; break;
    // }
const formatDateForInput = (date: string | undefined) => {
if(date){
  const dd = date.slice(0,2);
  const mm = date.slice(3,5);
  const yyyy = date.slice(6,10);
  return `${yyyy}-${mm}-${dd}`
}
return
}
    return (      
      <section className='popup'>
      <h2 className='popup__title'>Edit Task</h2>
      <input className="popup__input" type="text" placeholder='Task Title' ref={inputRef} onChange={validate} defaultValue={popupContent?.title}/>
      <div className='popup__info-wrapper'>
      <Tags onSelectTag={onSelectTag} blockName='popup' initialSelectedTag={popupContent?.tag}/>
      <div className='popup__info-date-input-wrapper'>
        {date}
        <input className='popup__info-date-input' type="date" ref={dateInputRef} onChange={changeDate} defaultValue={formatDateForInput(popupContent?.date)}/>
      </div>
      </div>
      <div className='popup__buttons-wrapper'>
        <button className='popup__buttons popup__buttons-cancel' type='button' ref={cancelBtnRef} onClick={closePopup}>Cancel</button>
        <button className='popup__buttons popup__buttons-add' type='button' ref={addBtnRef} onClick={onEditTask}>Edit Task</button>
      </div>
      </section>
      
    );  
  }
  return null
}

export default Popup;

