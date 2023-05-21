import "./SearchFilter.css";
import { useState, useRef, useEffect } from "react";
import { getFacets } from "../../api/uniprot";
import {Select} from "../Select/Select";

const SearchFilter = ({setFilter, query}:{setFilter:(value:{})=>void, query:string}) => {
    
    interface Option {
        count: number;
        label: string;
        value: string
      }
    
    const [isFiltersOpened, setIsFiltersOpened] = useState(false);
    const [isFiltersApplied, setIsFiltersApplied] = useState(false);
    const [modelOrganismOptions, setModelOrganismOptions] = useState<Option[]>([]);
    const [proteinsWithOptions, setProteinsWithOptions] = useState<Option[]>([]);
    const [annotationScoreOptions, setAnnotationScoreOptions] = useState<Option[]>([]);
    useEffect(() => {
        getFacets(query)
        .then(res => {
        console.log(query, res);
        const modelOrganism = res.facets[0]
        const proteinsWith = res.facets[1]
        const annotationScore = res.facets[2]
        setModelOrganismOptions(modelOrganism.values);
        setProteinsWithOptions(proteinsWith.values);
        setAnnotationScoreOptions(annotationScore.values);
    })
    .catch(err => console.warn(err))
    },[query])
    
    if(isFiltersOpened){
        return(
            <>
            <button className='search-filter__button search-filter__button--opened' type="button" onClick={()=>{setIsFiltersOpened(false)}}></button>
            <div className="search-filter">
                <h4 className="search-filter__title">Filters</h4>
                <form>
                    <label className="search-filter__label">Gene Name</label>
                    <input className="search-filter__input"type="text" placeholder="Enter Gene Name"/>

                    <label className="search-filter__label">Organism</label>
                    {/* this is hard */}
                    {/* <Select options={modelOrganismOptions}/>
                    <Select options={annotationScoreOptions}/>
                    <Select options={proteinsWithOptions}/> */}
                </form>
            </div>
            </>
        )
    } else {
        return (
            <button className={`search-filter__button ${isFiltersApplied ? 'search-filter__button--applied': ''}`} type="button" onClick={()=>{setIsFiltersOpened(true)}}></button>
        )
    }
    
}

export {SearchFilter};