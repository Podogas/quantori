import './SearchBar.css';
import { useState, useRef, useEffect } from "react";
import { SearchFilter } from "../SearchFilter/SearchFilter";
import { getSearchResults, getNextChunk } from '../../api/uniprot';
import { useAppDispatch, useAppSelector } from "../../store/store";
import {resetProteinData, setProteinChunk} from '../../store/features/proteinsSlice';

interface FiltrObjT  {
    gene: undefined | string,
    organism: undefined | string,
    lengthFrom: undefined | string,
    lengthTo: undefined | string,
    annotationScore: undefined | string,
    protetinsWith: undefined | string
  }
const SearchBar = () => {
    const [filter, setFilter] = useState<FiltrObjT>({
        gene: undefined,
        organism: undefined,
        lengthFrom: undefined,
        lengthTo: undefined,
        annotationScore: undefined,
        protetinsWith: undefined
      });
    const [query, setQuery] = useState('*')
    const inputRef = useRef<HTMLInputElement | null>(null);

    const dispatch = useAppDispatch();
    /// TEST ZONE
    useEffect(()=>{
        console.log(filter)
    },[filter])
    
    const checkAndSetQuery = () => {
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
    const search = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        checkAndSetQuery();
    }
    useEffect(()=>{
        const filters = 
        `${filter.gene ? ` AND (gene:${filter.gene})` : ''}${filter.organism ? ` AND (model_organism:${filter.organism})` : ''}${filter.annotationScore ? ` AND (annotation_score:${filter.annotationScore})` : ''}${filter.lengthFrom && filter.lengthTo  ? ` AND length:%5B${filter.lengthFrom} TO ${filter.lengthTo}%5D` : ''}${filter.lengthFrom && !filter.lengthTo  ? `mass:%5B${filter.lengthFrom} TO *%5D` : ''}${!filter.lengthFrom && filter.lengthTo  ? ` AND length:%5B1 TO ${filter.lengthTo}%5D` : ''}`
     //%5D url should be encoded   
          
        console.log('searching', query)
        getSearchResults(query, filters)
        .then(res => {
            console.warn(res)
            if(res){
                dispatch(resetProteinData())
                console.log(res, 'fetch result')
                dispatch(setProteinChunk(res))
            }            
        })
        .catch(err => console.log(err, 'error while fetching in searchbar'))
    },[query, filter])
        
    

    
    return(
        <nav className="search-bar">
            <form className="search-bar__form" onSubmit={search} action="">   
                <input className="search-bar__input" ref={inputRef} type="text" placeholder="Enter search value"/>
                <button className="search-bar__button" type="submit">Search</button>
            </form>
            <SearchFilter setFilter={setFilter} filter={filter} query={query}/>
        </nav>
    )
}

export {SearchBar}