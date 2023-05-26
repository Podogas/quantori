
import './SearchPage.css';
import {useEffect, useState} from 'react'
import { Header } from "../Header/Header";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";


import { getSearchResults} from '../../api/uniprot';
import { useAppDispatch, useAppSelector } from "../../store/store";
import {resetProteinData, setProteinChunk} from '../../store/features/proteinsSlice';
import { getNextChunk } from '../../api/uniprot';
const SearchPage = () => {
    
    const [query, setQuery] = useState<undefined | string>(undefined)
    const [filterQuery, setFilterQuery] = useState('');
    const [sortingQuery, setSortingQuery] = useState('');

    const dispatch = useAppDispatch();
    const nextUrl = useAppSelector((state) => state.proteins.next);
    useEffect(()=> {
        console.log(sortingQuery, query)
        if(query){
        
        console.log('searching with',"query:",query,"filter:", filterQuery)
        getSearchResults(query, filterQuery, sortingQuery)
        .then(res => {
            if(res ){
                dispatch(resetProteinData())
                dispatch(setProteinChunk(res))   
            }        
        })
        .catch(err => console.log(err, 'error while fetching in searchbar'))
        }
        
    },[query, filterQuery, sortingQuery]);
    

    
    const loadNewChunk = () => {
        if (nextUrl) {
           return getNextChunk(nextUrl)
            .then((res) => {
              if (res) {
                dispatch(setProteinChunk(res));
                console.log(res, 'next chunk')
                return res;
              }
              else {
                //new error
              }  
            });
        } else {
        }
        // Handle the case when there is no next URL
      };
  
    return(
        <div className="search-page">
            <Header/>
            <SearchBar setFilterQuery={setFilterQuery} setQuery={setQuery} query={query}/>
            <SearchResults setSortingQuery={setSortingQuery} loadNewChunk={loadNewChunk} />
        </div>
    )
}
export {SearchPage};