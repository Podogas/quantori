
import './SearchPage.css';
import {useEffect, useState} from 'react'
import { Header } from "../Header/Header";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";

import { getSearchResults, getNextChunk } from '../../api/uniprot';
import { useAppDispatch, useAppSelector } from "../../store/store";
import {resetProteinData, setProteinChunk} from '../../store/features/proteinsSlice';

const SearchPage = () => {
    const [query, setQuery] = useState('*')
    const [filterQuery, setFilterQuery] = useState('');
    const [sortingQuery, setSortingQuery] = useState('');

    const dispatch = useAppDispatch();

    useEffect(()=> {
        console.log('searching with',"query:",query,"filter:", filterQuery)
        getSearchResults(query, filterQuery, sortingQuery)
        .then(res => {
            console.warn(res)
            if(res){
                dispatch(resetProteinData())
                console.log(res, 'fetch result')
                dispatch(setProteinChunk(res))
            }            
        })
        .catch(err => console.log(err, 'error while fetching in searchbar'))
    },[query, filterQuery, sortingQuery])

    return(
        <div className="search-page">
            <Header/>
            <SearchBar setFilterQuery={setFilterQuery} setQuery={setQuery} query={query}/>
            <SearchResults setSortingQuery={setSortingQuery}/>
        </div>
    )
}
export {SearchPage};