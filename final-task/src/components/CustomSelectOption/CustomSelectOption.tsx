import "./CustomSelectOption.css";
import React, { useState, useEffect, useRef } from "react";
import { OptionT } from "../../utils/globalTypes.t";
const CustomSelectOption = ({
  optionsList,
  defaultText,
  uniqueKey,
  setState,
}: {
  optionsList: OptionT[];
  defaultText: string;
  uniqueKey: string;
  setState: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const [selectedText, setSelectedText] = useState(defaultText);
  const [showOptionList, setShowOptionList] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    optionsList ? null : setSelectedText('No options')
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      !target.classList.contains(`custom-select-option-${uniqueKey}`) &&
      !target.classList.contains(`selected-text-${uniqueKey}`)
    ) {
      setShowOptionList(false);
    }
  };
  const handleListDisplay = () => {
    setShowOptionList(!showOptionList);
  };
  const handleOptionClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLElement;
    const targetText = target.getAttribute("data-text");
    if (targetText) {
      setSelectedText(targetText);
      setState(targetText);
      //delete afer
    } else {
      setSelectedText("dummy wrote this selector)");
    }
    setShowOptionList(false);
  };

  return (
    <div className="custom-select-container" ref={selectRef}>
      <div
        className={`
          ${optionsList
            ? ``
            : 'selected-text--inactive'}
          ${showOptionList
            ? `selected-text selected-text--active selected-text-${uniqueKey}`
            : `selected-text selected-text-${uniqueKey}`}
        `}
        onClick={optionsList ? handleListDisplay : ()=>{}}
      >
        {selectedText}
      </div>
      {showOptionList && optionsList ?(
        <ul className="select-options">
          {optionsList.map((option) => (
            <li
              className={`custom-select-option custom-select-option-${uniqueKey}`}
              data-text={option.label ? option.label : option.value}
              key={option.value}
              onClick={handleOptionClick}
            >
              {option.label ? option.label : option.value}
            </li>
          ))}
        </ul>
      ):null}
    </div>
  );
};

export { CustomSelectOption };
