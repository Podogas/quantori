import './SearchBar.css';
import { useState, useRef } from "react";
import { SearchFilter } from "../SearchFilter/SearchFilter";
const SearchBar = () => {
    const [filter, setFilter] = useState<{}>({});
    const [query, setQuery] = useState('*')
    const inputRef = useRef<HTMLInputElement | null>(null);

    const search = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(inputRef.current){
            console.log('searching', inputRef.current.value)
        }
        
    }

    const onFocusOut = () => {
        if(inputRef.current){
            if(inputRef.current.value !== query){
                if(inputRef.current.value.replace(/\s/g, '') !== ''){
                    setQuery(inputRef.current.value.trim());
                } else {
                    setQuery('*')
                }
            }
            
        }
    }
    return(
        <nav className="search-bar">
            <form className="search-bar__form" onSubmit={search} action="">   
                <input className="search-bar__input" ref={inputRef} type="text" placeholder="Enter search value" onBlur={onFocusOut}/>
                <button className="search-bar__button" type="submit">Search</button>
            </form>
            <SearchFilter setFilter={setFilter} query={query}/>
        </nav>
    )
}

export {SearchBar}