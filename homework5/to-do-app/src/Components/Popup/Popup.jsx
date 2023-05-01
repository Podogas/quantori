import React, {useRef, useState} from 'react';
import './Popup.css';
import { formatDate } from '../../Utils/Utils';

const Popup = ({
  popupType, 
  setPopupType, 
  addTaskHandler, 
  tasksForToday
}) => {
  const [date, setDate] = useState(formatDate(new Date()));
  const [isPopupFormValid, setIsPopupformValid] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');
  const tagsRef = useRef([...Array(4)].map(() => React.createRef()));
  const inputRef = useRef();
  const dateInputRef = useRef();
  const addBtnRef = useRef();
  const cancelBtnRef = useRef();

  const validate = () => {
    addBtnRef.current.classList.add('popup__buttons-add--disabled')
    const inputValue = inputRef.current.value;
    const tag = tagsRef.current.filter(e => e.current.classList.contains('popup__info-tag--selected'));
    if(tag.length !==0){
      const tagText = tag[0].current.innerText;
      if(inputValue.replace(/\s/g, '') !== ''){
        addBtnRef.current.classList.remove('popup__buttons-add--disabled')
        setSelectedTag(tagText);
        setIsPopupformValid(true);
      }
    }
  }
  const addTask = () => {
    if(isPopupFormValid){
      addTaskHandler({
        updatedAt: Date.now(),
        title: inputRef.current.value,
        isCompleted: false,
        tag: selectedTag,
        date: date,
        prevTag: selectedTag
      })
    }  
  }
  const closePopup = () => {
    setPopupType(false)
  }
  const closeModal = () => {
    setPopupType(false)
  }
  const selectTag = (n) => {
    const element = tagsRef.current[n].current;
    if(element.classList.contains('popup__info-tag--selected')){
      element.classList.remove('popup__info-tag--selected')
    } else {
      tagsRef.current.forEach(e => e.current.classList.remove('popup__info-tag--selected'))
      element.classList.add('popup__info-tag--selected')
    }
    validate()  
  }
  const changeDate = () => {
    const inputValue = dateInputRef.current.value;
    const dd = inputValue.slice(8, 10);
    const mm = inputValue.slice(5, 7);
    const yyyy = inputValue.slice(0, 4);
    setDate(`${dd}.${mm}.${yyyy}`);
    validate();
  }

  
  if(popupType === 'modal'){
    const createListItem = (taskData) => {
      return (<ul className='modal__list' key={taskData.id}>{taskData.title}</ul>)
    }
    return (
      <section className='modal'>
        <h2 className='modal__title'>good daypart</h2>
        <p className='modal__list-caption'>You have the next planned tasks for today: </p>
        {tasksForToday.map(el => createListItem(el))}
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
      <div className='popup__info-tags-wrapper'>
        <span className='popup__info-tag popup__info-tag--health' ref={tagsRef.current[0] } onClick={() => {selectTag(0)}}>health</span>
        <span className='popup__info-tag popup__info-tag--work'ref={tagsRef.current[1]}  onClick={() => {selectTag(1)}}>work</span>
        <span className='popup__info-tag popup__info-tag--home'ref={tagsRef.current[2]}  onClick={() => {selectTag(2)}}>home</span>
        <span className='popup__info-tag popup__info-tag--other'ref={tagsRef.current[3]}  onClick={() => {selectTag(3)}}>other</span>
      </div>
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
}

export default Popup;

