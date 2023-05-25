import './SearchResults.css';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getNextChunk } from '../../api/uniprot';
import { setProteinChunk} from '../../store/features/proteinsSlice';
import {useEffect, useRef, useState, useMemo, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
const SearchResults = ({setSortingQuery}:{setSortingQuery:React.Dispatch<React.SetStateAction<string>>}) => {
    const proteins = useAppSelector((state) => state.proteins);
    const accessionSortBtnRef = useRef<HTMLButtonElement | null>(null);
    const idSortBtnRef = useRef<HTMLButtonElement | null>(null);
    const geneSortBtnRef = useRef<HTMLButtonElement | null>(null);
    const organismSortBtnRef = useRef<HTMLButtonElement | null>(null);
    const lengthSortBtnRef = useRef<HTMLButtonElement | null>(null);
    const [sortingBy, setSortingBy] = useState<HTMLButtonElement  | null>(null);
    const [sortingType, setSortingType] = useState<string | undefined>(undefined);

    interface Genes {
        orderedLocusNames: {
            value: string
        }
        geneName: {
            value: string
        }
    }
    interface Protein {
        comments: [{
            subcellularLocations:[{
                location:{
                    value:string
                }
            }]
        }]
        primaryAccession: string,
        uniProtkbId: string,
        organism: {
            scientificName: string
        },
        sequence: {
            length: string
        },
        genes: Genes[],
    }
    
    const navigate = useNavigate();
    const getTableRow = (data:Protein, index:number) => {
        // console.log(data, index ,"GET TABLE ROW")
        const number = index+1;
        const entry = data.primaryAccession;
        const entryNames = data.uniProtkbId;
        const genes = () => {
            if(data.genes){
              return  data.genes.map((g) => { 
                if(g.geneName) {
                    return g.geneName.value;
                } return ''})
            }
        } 
        
        const organism = data.organism.scientificName;
        const subcellularLocations = () => { 
            console.log(data.comments)
            if(data.comments){
                if(data.comments[0]){
                    if(data.comments[0].subcellularLocations){
                        return data.comments[0].subcellularLocations.map(v => v.location.value)
                    }
                }
            return null} 
        }
        const length = data.sequence.length
        return(
            <div className='search-results__table-row' key={data.uniProtkbId} >
                    <div className='table__cell table__cell__number'>{number}</div>
                    <div className='table__cell table__cell__entry' onClick={()=>{navigate(`/proteins/${entry}`)}}>{entry}</div>
                    <div className='table__cell table__cell__entry-names'>{entryNames}</div>
                    <div className='table__cell table__cell__genes'>{genes()}</div>
                    <div className='table__cell table__cell__organism'>
                        <span className='table__cell__organism-label'>{organism}</span>
                    </div>
                    <div className='table__cell table__cell__subcellular'>
                        <div className='table__cell__subcellular-overflow-box'>{subcellularLocations()}</div>
                    </div>
                    <div className='table__cell table__cell__length'>{length}</div>
                </div>
        )
    }
    const toggleSortingType = () => {
            if(sortingType){
                console.log(sortingType, 'here')
                sortingType === 'asc'?
                setSortingType('desc'):
                setSortingType(undefined);
            } else {
                setSortingType('asc');
            }
    }
    const sortRsults = (ref:React.RefObject<HTMLButtonElement>) => {
        const btn = ref.current;
        if(btn){
            if(btn !== sortingBy){
                console.log(sortingBy, btn, 'BNT != to SortingBy');
                setSortingBy(btn)
                setSortingType('asc');
            } else {
                toggleSortingType();
            }
            
            }       
    }    
    
    useEffect(()=> {
        if(sortingType){
            console.log(sortingType, sortingBy?.name, 'fetch for sorting')
            const sortingQueryStr = `&sort=${sortingBy?.name} ${sortingType}`
            setSortingQuery(sortingQueryStr)
        } else {
            console.log('fetch without sorting')
            setSortingQuery('');
        }
    }, [sortingType, sortingBy])

    ///
    const dispatch = useAppDispatch();

    
    const nextUrl = useAppSelector((state) => state.proteins.next);
    const newChunck = () => {
        if(nextUrl){
            getNextChunk(nextUrl)
            .then(res => {
            if(res){
                dispatch(setProteinChunk(res))
            }
        })
    }
}
    ///
    const ref2 = useRef(null);
    const [isIntersecting, setIsIntersecting] = useState(false);
    useEffect(()=>{
        if(isIntersecting){
            newChunck();
        }
    },[isIntersecting])

    const observer = useMemo(
          () =>
            new IntersectionObserver(([entry]) =>
              setIsIntersecting(entry.isIntersecting),
            ),
          [],
        );
    useEffect(() => {
        if(ref2.current){
                observer.observe(ref2.current);
            }
          
      
          return () => {
            observer.disconnect();
          };
        }, [ref2, observer,proteins.proteins]);
      
      ///
if(proteins.proteins.length !== 0){
    return (
        <section className='search-results'>
            <h3 className='search-results__quantity'>{`${proteins.totalResultsCount} Search Results ${proteins.query !== '' ? `for ${proteins.query}` : ''}`}</h3>
            <div className='search-results__table'>
                <div className='search-results__table-row search-results__table-row-header'>
                    <div className='table__cell table__cell__number table__cell-header'>#</div>
                    <div className='table__cell table__cell__entry table__cell-header'>
                        <span className="table__cell-header-text">Entry</span>
                        <button 
                            className={
                                `table__cell-header-sort-btn ${sortingBy?.name === 'accession' ?
                                 `${sortingType ? `table__cell-header-sort-btn--${sortingType}-sorting` : ''}` : ''}`
                                }
                            type='button' 
                            name='accession' 
                            ref={accessionSortBtnRef} 
                            onClick={()=>{sortRsults(accessionSortBtnRef)}}
                        >    
                        </button>
                    </div>
                    <div className='table__cell table__cell__entry-names table__cell-header'>
                        <span className="table__cell-header-text">Entry Names</span>
                        <button 
                            className={
                                `table__cell-header-sort-btn ${sortingBy?.name === 'id' ?
                                 `${sortingType ? `table__cell-header-sort-btn--${sortingType}-sorting` : ''}` : ''}`
                                }
                            type='button' 
                            name='id' 
                            ref={idSortBtnRef} 
                            onClick={()=>{sortRsults(idSortBtnRef)}}
                        >    
                        </button>
                    </div>
                    <div className='table__cell table__cell__genes table__cell-header'>
                        <span className="table__cell-header-text">Genes</span>
                        <button 
                            className={
                                `table__cell-header-sort-btn ${sortingBy?.name === 'gene' ?
                                 `${sortingType ? `table__cell-header-sort-btn--${sortingType}-sorting` : ''}` : ''}`
                                }
                            type='button' 
                            name='gene' 
                            ref={geneSortBtnRef} 
                            onClick={()=>{sortRsults(geneSortBtnRef)}}
                        >
                        </button>
                    </div>
                    <div className='table__cell table__cell__organism table__cell-header'>
                        <span className="table__cell-header-text">Organism</span>
                        <button 
                            className={
                                `table__cell-header-sort-btn ${sortingBy?.name === 'organism_name' ?
                                 `${sortingType ? `table__cell-header-sort-btn--${sortingType}-sorting` : ''}` : ''}`
                                }
                            type='button' 
                            name='organism_name' 
                            ref={organismSortBtnRef} 
                            onClick={()=>{sortRsults(organismSortBtnRef)}}
                        >
                        </button>
                    </div>
                    <div className='table__cell table__cell__subcellular table__cell-header'>
                        <span className="table__cell-header-text">Subcellular Location</span>
                    </div>
                    <div className='table__cell table__cell__length table__cell-header'>
                        <span className="table__cell-header-text">Length</span>
                        <button 
                            className={
                                `table__cell-header-sort-btn ${sortingBy?.name === 'length' ?
                                 `${sortingType ? `table__cell-header-sort-btn--${sortingType}-sorting` : ''}` : ''}`
                                }
                            type='button' 
                            name='length' 
                            ref={lengthSortBtnRef} 
                            onClick={()=>{sortRsults(lengthSortBtnRef)}}
                        >
                        </button>
                    </div>
                </div>
                {proteins.proteins.map((el, i) => getTableRow(el, i))}
                <span ref={ref2}></span>
            </div>
        </section>
        
    )
    }
    return (
        <div className="empty-search-results">
            <p className="empty-search-results__description">No data to display</p>
            <p className="empty-search-results__description">Please start search to display results</p>
        </div>
    )
    
}

export {SearchResults};