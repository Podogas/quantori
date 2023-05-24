import "./SearchFilter.css";
import { useState, useRef, useEffect } from "react";
import { getFacets } from "../../api/uniprot";
import {CustomSelectOption} from "../CustomSelectOption/CustomSelectOption.tsx";
interface FiltrObjT  {
    gene: undefined | string,
    organism: undefined | string,
    lengthFrom: undefined | string,
    lengthTo: undefined | string,
    annotationScore: undefined | string,
    protetinsWith: undefined | string
  }
const SearchFilter = ({setFilter, filter ,query}:{setFilter:React.Dispatch<React.SetStateAction<FiltrObjT>>, filter:FiltrObjT,query:string}) => {
    
    interface Option {
        count: number;
        label: string;
        value: string
      }
    
    const [isFiltersOpened, setIsFiltersOpened] = useState(false);
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    // States for arrays that we get from API
    const [modelOrganismOptions, setModelOrganismOptions] = useState<Option[]>([]);
    const [proteinsWithOptions, setProteinsWithOptions] = useState<Option[]>([]);
    const [annotationScoreOptions, setAnnotationScoreOptions] = useState<Option[]>([]);
    // States that store filter options
    const [selectedGeneName, setSelectedGeneName] = useState<string | undefined>(undefined);
    const [selectedLengthFrom, setSelectedLengthFrom] = useState<string | undefined>(undefined);
    const [selectedLengthTo, setSelectedLengthTo] = useState<string | undefined>(undefined);
    const [selectedModelOrganism, setSelectedModelOrganism] = useState<string | undefined>(undefined);
    const [selectedProteinsWith, setSelectedProteinsWith] = useState<string | undefined>(undefined);
    const [selectedAnnotationScore, setSelectedAnnotationScore] = useState<string | undefined>(undefined);

    const geneNameInputRef = useRef<HTMLInputElement | null>(null);
    const lengthFromInputRef = useRef<HTMLInputElement | null>(null);
    const lengthToInputRef = useRef<HTMLInputElement | null>(null);
// TEST ZONE
    useEffect(() => {
        getFacets(query)
        .then(res => {
        console.log(query, res, 'trying to get facets');
        const modelOrganism = res.facets[0]
        const proteinsWith = res.facets[1]
        const annotationScore = res.facets[2]
        setModelOrganismOptions(modelOrganism.values);
        setProteinsWithOptions(proteinsWith.values);
        setAnnotationScoreOptions(annotationScore.values);
    })
    .catch(err => console.warn(err))
    },[query])

    const onInputChange = (ref: React.RefObject<HTMLInputElement>) => {
        const name = ref.current?.name;
        const value = ref.current?.value;
        console.log(value)
        if(value?.replace(/\s/g, '') !== ''){
            if(name === 'gene'){
                setSelectedGeneName(value);
            }
            if(name === 'length-from'){
                setSelectedLengthFrom(value);
            }
            if(name === 'length-to'){
                setSelectedLengthTo(value);
            }
        } else {
            if(name === 'gene'){
                setSelectedGeneName(undefined);
            }
            if(name === 'length-from'){
                setSelectedLengthFrom(undefined);
            }
            if(name === 'length-to'){
                setSelectedLengthTo(undefined);
            }
        }
    }
    const resetSelected = () => {
        setSelectedGeneName(undefined);
        setSelectedLengthFrom(undefined);
        setSelectedLengthTo(undefined);
        setSelectedModelOrganism(undefined);
        setSelectedProteinsWith(undefined);
        setSelectedAnnotationScore(undefined);
    }
    const onToggleFilters = () => {
        setIsFiltersOpened(!isFiltersOpened);
        resetSelected();
    }
    const onClose = () => {
        const filterObj = {
            gene: undefined,
            organism: undefined,
            lengthFrom: undefined,
            lengthTo: undefined,
            annotationScore: undefined,
            protetinsWith: undefined
          }
        resetSelected();
        setIsFiltersOpened(false);
        setIsFilterApplied(false);
        setIsButtonActive(false);
        setFilter(filterObj);
    }
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const filterObj = {
            gene: selectedGeneName,
            organism: selectedModelOrganism,
            lengthFrom: selectedLengthFrom,
            lengthTo: selectedLengthTo,
            annotationScore: selectedAnnotationScore,
            protetinsWith: selectedProteinsWith
          }
        console.log(selectedModelOrganism, selectedProteinsWith, selectedAnnotationScore, selectedGeneName, selectedLengthFrom, selectedLengthTo);
        setIsFiltersOpened(false);
        setIsFilterApplied(true);
        setIsButtonActive(false);
        setFilter(filterObj);

    }
    useEffect(()=>{ 
        console.log(selectedModelOrganism, selectedProteinsWith, selectedAnnotationScore, selectedGeneName, selectedLengthFrom, selectedLengthTo);
        if(selectedModelOrganism || selectedProteinsWith || selectedAnnotationScore || selectedGeneName || selectedLengthFrom || selectedLengthTo){
            setIsButtonActive(true);
        } else {
            setIsButtonActive(false);
        }
    },[selectedModelOrganism, selectedProteinsWith, selectedAnnotationScore, selectedGeneName, selectedLengthFrom, selectedLengthTo])
    
    if(isFiltersOpened){
        return(
            <>
            <button className='search-filter__button search-filter__button--opened' type="button" onClick={onToggleFilters}></button>
            <div className="search-filter-wrapper">
            <div className="search-filter">
                <h4 className="search-filter__title">Filters</h4>
                <form onSubmit={onSubmit}>
                    <div className="search-filter__element">
                        <label className="search-filter__label">Gene Name</label>
                        <input className="search-filter__input" type="text" placeholder="Enter Gene Name" defaultValue={filter.gene} ref={geneNameInputRef} name='gene' onChange={()=>{onInputChange(geneNameInputRef)}}/>
                    </div>
                    <div className="search-filter__element">
                        <label className="search-filter__label">Organism</label>
                        <CustomSelectOption optionsList={modelOrganismOptions} defaultText={filter.organism ? filter.organism :'Select an option'} uniqueKey="organism" setState={setSelectedModelOrganism}/>
                    </div>
                    <div className="search-filter__element">
                        <label className="search-filter__label">Sequence length</label>
                        <div className="search-filter__num-input-wrapper">
                            <input className="search-filter__num-input" type="number" defaultValue={filter.lengthFrom} placeholder="From" ref={lengthFromInputRef} name='length-from' onChange={()=>{onInputChange(lengthFromInputRef)}}/>
                            <span className="search-filter__num-input-dash"></span>
                            <input className="search-filter__num-input" type="number" defaultValue={filter.lengthTo} placeholder="To" ref={lengthToInputRef}  name='length-to' onChange={()=>{onInputChange(lengthToInputRef)}}/>
                        </div>
                    </div>
                    <div className="search-filter__element">
                        <label className="search-filter__label">Annotation score</label>
                        <CustomSelectOption optionsList={annotationScoreOptions} defaultText={filter.annotationScore ? filter.annotationScore :'Select an option'} uniqueKey="annotation-score" setState={setSelectedAnnotationScore}/>
                    </div>
                    <div className="search-filter__element">
                        <label className="search-filter__label">Protein with</label>
                        <CustomSelectOption optionsList={proteinsWithOptions} defaultText={filter.protetinsWith ? filter.protetinsWith :'Select an option'} uniqueKey="protein-with" setState={setSelectedProteinsWith}/>
                    </div>
                    <div className="search-filter-btn__wrapper">    
                        <button className="search-filter-btn search-filter-cancel-btn" type="button" onClick={onClose}>Cancel</button>
                        <button className={`search-filter-btn search-filter-apply-btn ${isButtonActive ? "":'search-filter-apply-btn--disabled'}`} type="submit">Apply filters</button>
                    </div>    
                </form>
            </div>
            </div>
            </>
        )
    } else {
        return (
            <button className={`search-filter__button ${isFilterApplied ? 'search-filter__button--applied': ''}`} type="button" onClick={onToggleFilters}></button>
        )
    }
    
}

export {SearchFilter};