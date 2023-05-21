import { useState, useRef } from 'react';
import './select.css';
interface Option {
    count: number;
    label: string;
    value: string
  }
const Select = ({options}:{options:Option[]}) => {
    const selectRef = useRef<HTMLSelectElement | null>(null)
    const [selectedOption, setSelectedOption] = useState('Select an option');
    console.log(options, 'options')
    const onSelect = () => {
        console.log(selectRef.current)
        setSelectedOption(selectRef.current?.innerText || '');
        console.log('selected')
    }
    return (
        <div className='select-wrapper'>
            {selectedOption}
        <select className="select" onInput={() => onSelect()} ref={selectRef}>
            {options.map(el => (
            <option className='option' key={el.count} value={el.value}>
                {el.label ? el.label : el.value}
            </option>
            ))}
        </select>
        </div>
    )
}

export {Select}