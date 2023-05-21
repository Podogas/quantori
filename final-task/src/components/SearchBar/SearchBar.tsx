import './SearchBar.css';
import { useState, useRef } from "react";
import { SearchFilter } from "../SearchFilter/SearchFilter";
const SearchBar = () => {
    const [searchFilter, setSearchFilter] = useState<{}>({});
    const inputRef = useRef<HTMLInputElement | null>(null);
    const search = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(inputRef.current){
            console.log('searching', inputRef.current.value)
        }
        
    }
    return(
        <nav className="search-bar">
            <form className="search-bar__form" onSubmit={search} action="">   
                <input className="search-bar__input" ref={inputRef} type="text" placeholder="Enter search value"/>
                <button className="search-bar__button" type="submit">Search</button>
            </form>
            <SearchFilter setSearchFilter={setSearchFilter}/>
        </nav>
    )
}

export {SearchBar}