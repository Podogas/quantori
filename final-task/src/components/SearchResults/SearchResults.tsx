import './SearchResults.css';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getNextChunk } from '../../api/uniprot';
import { setProteinChunk} from '../../store/features/proteinsSlice';
import {useEffect, useRef, useState, useMemo} from 'react';
import { useNavigate } from 'react-router-dom';
const SearchResults = () => {
    const proteins = useAppSelector((state) => state.proteins);
    interface Genes {
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
        const number = index;
        const entry = data.primaryAccession;
        const entryNames = data.uniProtkbId;
        const genes = data.genes.map((g) => g.geneName.value)
        const organism = data.organism.scientificName;
        const subcellularLocations = data.comments[0] ? data.comments[0].subcellularLocations.map(v => v.location.value):null
        const length = data.sequence.length
        return(
            <div className='search-results__table-row' key={data.uniProtkbId} >
                    <div className='table__cell table__cell__number'>{number}</div>
                    <div className='table__cell table__cell__entry' onClick={()=>{navigate(`/proteins/${entry}`)}}>{entry}</div>
                    <div className='table__cell table__cell__entry-names'>{entryNames}</div>
                    <div className='table__cell table__cell__genes'>{genes}</div>
                    <div className='table__cell table__cell__organism'>
                        <span className='table__cell__organism-label'>{organism}</span>
                    </div>
                    <div className='table__cell table__cell__subcellular'>
                        <div className='table__cell__subcellular-overflow-box'>{subcellularLocations}</div>
                    </div>
                    <div className='table__cell table__cell__length'>{length}</div>
                </div>
        )
    }
    useEffect(()=> {
        console.log(proteins, 'PROTEINS')
    },[ proteins])


    ///
    const dispatch = useAppDispatch();

    
    const nextUrl = useAppSelector((state) => state.proteins.next);
    const newChunck = () => {
        console.log('NEW CHUNCK')
        if(nextUrl){
            getNextChunk(nextUrl)
            .then(res => {
            if(res){
                dispatch(setProteinChunk(res))
            }
        })
        console.log(nextUrl)
    }
}
    ///
    const ref2 = useRef(null);
    const [isIntersecting, setIsIntersecting] = useState(false);
    useEffect(()=>{
        console.log('isIntersecting changed')
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
        console.log(ref2,'REF 2 CHANGED')
        if(ref2.current){
                observer.observe(ref2.current);
            }
          
      
          return () => {
            observer.disconnect();
          };
        }, [ref2, observer,proteins.proteins]);
      
      ///
if(proteins.proteins.length !== 0){
    console.log(proteins)
    return (
        <section className='search-results'>
            <h3 className='search-results__quantity'>{`${proteins.totalResultsCount} Search Results ${proteins.query !== '' ? `for ${proteins.query}` : ''}`}</h3>
            <div className='search-results__table'>
                <div className='search-results__table-row search-results__table-row-header'>
                    <div className='table__cell table__cell__number table__cell-header'>#</div>
                    <div className='table__cell table__cell__entry table__cell-header'>
                        <span className="table__cell-header-text">Entry</span>
                        <button className='table__cell-header-sort-btn' type='button'></button>
                    </div>
                    <div className='table__cell table__cell__entry-names table__cell-header'>
                        <span className="table__cell-header-text">Entry Names</span>
                        <button className='table__cell-header-sort-btn' type='button'></button>
                    </div>
                    <div className='table__cell table__cell__genes table__cell-header'>
                        <span className="table__cell-header-text">Genes</span>
                        <button className='table__cell-header-sort-btn' type='button'></button>
                    </div>
                    <div className='table__cell table__cell__organism table__cell-header'>
                        <span className="table__cell-header-text">Organism</span>
                        <button className='table__cell-header-sort-btn' type='button'></button>
                    </div>
                    <div className='table__cell table__cell__subcellular table__cell-header'>
                        <span className="table__cell-header-text">Subcellular Location</span>
                    </div>
                    <div className='table__cell table__cell__length table__cell-header'>
                        <span className="table__cell-header-text">Length</span>
                        <button className='table__cell-header-sort-btn' type='button'></button>
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