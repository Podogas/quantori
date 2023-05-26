import './SearchResults.css';
import { useAppSelector } from '../../store/store';
import {useEffect, useRef, useState,useLayoutEffect, CSSProperties,} from 'react';
import { useNavigate } from 'react-router-dom';
//
import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeList as List } from 'react-window';
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
interface ResT {
    proteins: Protein[],
    totalResultsCount: string | null,
    next: string | null,
    query: string | undefined
}
const SearchResults = ({setSortingQuery, loadNewChunk}:{setSortingQuery:React.Dispatch<React.SetStateAction<string>>, loadNewChunk:()=>void}) => {
    console.log("RE_RENDER")
    const proteins = useAppSelector((state) => state.proteins);
    const accessionSortBtnRef = useRef<HTMLButtonElement | null>(null);
    const idSortBtnRef = useRef<HTMLButtonElement | null>(null);
    const geneSortBtnRef = useRef<HTMLButtonElement | null>(null);
    const organismSortBtnRef = useRef<HTMLButtonElement | null>(null);
    const lengthSortBtnRef = useRef<HTMLButtonElement | null>(null);
    const [sortingBy, setSortingBy] = useState<HTMLButtonElement  | null>(null);
    const [sortingType, setSortingType] = useState<string | undefined>(undefined);

    const searchResRef = useRef<HTMLDivElement | null>(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
//   const infiniteLoaderRef = useRef<InfiniteLoader | null>(null);
//   const hasMountedRef = useRef(false);
  useLayoutEffect(() => {
    if(searchResRef.current){
        setWidth(searchResRef.current.offsetWidth);
        setHeight(searchResRef.current.offsetHeight);
    }    
  }, []);
////////////////////////////

////////////////////////////
 // Each time the sort prop changed we called the method resetloadMoreItemsCache to clear the cache
//  useEffect(() => {
//     // We only need to reset cached items when "sortOrder" changes.
//     // This effect will run on mount too; there's no need to reset in that case.
//     if (hasMountedRef.current) {
//       if (infiniteLoaderRef.current) {
//         infiniteLoaderRef.current.resetloadMoreItemsCache();
//       }
//     }
//     hasMountedRef.current = true;
//   }, [proteins.url]);
const [reloadKey, setReloadKey] = useState(0);
const reloadInfiniteLoader = () => {
    // Increment the reload key to trigger a re-render of the InfiniteLoader component
    setReloadKey((prevKey) => prevKey + 1);
  };
    
    const navigate = useNavigate();
//////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////   
const [items, setItems] = useState<Protein[]>([]);

const isItemLoaded = (index:number) => {
    // Check if the item at the specified index is loaded
    return !!items[index];
  };
  const [isInitialRender, setIsinitialRender] = useState(true);

  const loadMoreItems = async (startIndex:number, stopIndex:number) => {
    // Simulating an asynchronous API call to fetch new items
    console.log('isInitial render', isInitialRender)
    
    const response:ResT|void =   isInitialRender ? proteins : await loadNewChunk();
    const newItems = response?.proteins
    console.log('response in load', response)
    // Update the items state with the new items
    if(newItems){
        console.log(newItems, 'newItems')
        
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      for (let i = startIndex; i <= stopIndex; i++) {
        updatedItems[i] = newItems[i - startIndex];
      }
      setIsinitialRender(false)
      return updatedItems;
    });
    }
    
  };



//////////////////  










    
    const getTableRow = ({index, style}:{index:number, style:CSSProperties}) => {
        
        const item:Protein = items[index];
        // console.log(rowData.primaryAccession)
        // const id = rowData.uniProtkbId;  
        
        if (!item) {
            return(  <div  className='search-results__table-row' style={style} >
                <div>..loading</div>
            </div>)
            
        } else {
        const number = index+1;
        const entry = item.primaryAccession;
        const entryNames = item.uniProtkbId;
        const genes = () => {
            if(item.genes){
              return  item.genes.map((g) => { 
                if(g.geneName) {
                    return g.geneName.value;
                } return ''})
            }
        }
        const subcellularLocations = () => { 
            if(item.comments){
                if(item.comments[0]){
                    if(item.comments[0].subcellularLocations){
                        return item.comments[0].subcellularLocations.map(v => v.location.value)
                    }
                }
            return null} 
        }
        const length = item.sequence.length
        const organism = item.organism.scientificName;
        return(  <div  className='search-results__table-row' style={style} >
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
                </div>)
                    // return(
        //     <div className='search-results__table-row' key={id} >
        //             <div className='table__cell table__cell__number'>{number}</div>
        //             <div className='table__cell table__cell__entry' onClick={()=>{navigate(`/proteins/${entry}`)}}>{entry}</div>
        //             <div className='table__cell table__cell__entry-names'>{entryNames}</div>
        //             <div className='table__cell table__cell__genes'>{genes()}</div>
        //             <div className='table__cell table__cell__organism'>
        //                 <span className='table__cell__organism-label'>{organism}</span>
        //             </div>
        //             <div className='table__cell table__cell__subcellular'>
        //                 <div className='table__cell__subcellular-overflow-box'>{subcellularLocations()}</div>
        //             </div>
        //             <div className='table__cell table__cell__length'>{length}</div>
        //         </div>
        // )
        } 
        }


//////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////        
        // const id = data.uniProtkbId
        // const number = index+1;
        // const entry = data.primaryAccession;
        // const entryNames = data.uniProtkbId;
        // const genes = () => {
        //     if(data.genes){
        //       return  data.genes.map((g) => { 
        //         if(g.geneName) {
        //             return g.geneName.value;
        //         } return ''})
        //     }
        // } 
        // const organism = data.organism.scientificName;
        // const subcellularLocations = () => { 
        //     if(data.comments){
        //         if(data.comments[0]){
        //             if(data.comments[0].subcellularLocations){
        //                 return data.comments[0].subcellularLocations.map(v => v.location.value)
        //             }
        //         }
        //     return null} 
        // }
        // const length = data.sequence.length
        // return(
        //     <div className='search-results__table-row' key={id} >
        //             <div className='table__cell table__cell__number'>{number}</div>
        //             <div className='table__cell table__cell__entry' onClick={()=>{navigate(`/proteins/${entry}`)}}>{entry}</div>
        //             <div className='table__cell table__cell__entry-names'>{entryNames}</div>
        //             <div className='table__cell table__cell__genes'>{genes()}</div>
        //             <div className='table__cell table__cell__organism'>
        //                 <span className='table__cell__organism-label'>{organism}</span>
        //             </div>
        //             <div className='table__cell table__cell__subcellular'>
        //                 <div className='table__cell__subcellular-overflow-box'>{subcellularLocations()}</div>
        //             </div>
        //             <div className='table__cell table__cell__length'>{length}</div>
        //         </div>
        // )
    // }
    const toggleSortingType = () => {
            if(sortingType){
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
                setSortingBy(btn)
                setSortingType('asc');
            } else {
                toggleSortingType();
            }
            
            }       
    }    
    
    useEffect(()=> {
        if(sortingType){
            const sortingQueryStr = `&sort=${sortingBy?.name} ${sortingType}`
            setSortingQuery(sortingQueryStr)
        } else {
            setSortingQuery('');
        }
    }, [sortingType, sortingBy])

    ///

    

    ///

      
      ///
if(proteins.query){
    return (
        <section className='search-results' ref={searchResRef}>
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

                
                {/* EXPEREMENT ZONE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}

<InfiniteLoader
    isItemLoaded={isItemLoaded}
    itemCount={Number(proteins.totalResultsCount)}
    loadMoreItems={loadMoreItems}
>
    {({ onItemsRendered, ref }) => (
    <List
        height={300}
        itemCount={Number(proteins.totalResultsCount)}
        itemSize={35}
        width={width}
        onItemsRendered={onItemsRendered}
        ref={ref}
    >
        {getTableRow}
    </List>
    )}                            
</InfiniteLoader>
                {/* {proteins.proteins.map((el, i) => getTableRow(el, i))} */}
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
                {/* EXPEREMENT ZONE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
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