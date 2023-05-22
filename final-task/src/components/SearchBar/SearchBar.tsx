import './SearchBar.css';
import { useState, useRef } from "react";
import { SearchFilter } from "../SearchFilter/SearchFilter";
import { getSearchResults, getNextChunk } from '../../api/uniprot';
import { useAppDispatch, useAppSelector } from "../../store/store";
import {resetProteinData, setProteinChunk} from '../../store/features/proteinsSlice';
const SearchBar = () => {
    const [filter, setFilter] = useState<{}>({});
    const [query, setQuery] = useState('*')
    const inputRef = useRef<HTMLInputElement | null>(null);

    const dispatch = useAppDispatch();

    

    const search = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(resetProteinData())
            console.log('searching', query)
            getSearchResults(query)
            .then(res => {
                if(res){
                    dispatch(setProteinChunk(res))
                }
                
            })
            .catch(err => console.log(err, 'error while fetching in searchbar'))
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