import "./SearchResults.css";
import { useEffect, useRef, useState } from "react";
import { SearchResultsTable } from "../SearchResultsTable/SearchResultsTable";
import { getChunk, getSearchResults } from "../../api/uniprot";
import { ProteinT } from "../../utils/globalTypes.t";
const SearchResults = ({
  setSortingQuery,
  initialSearchUrl,
  query,
}: {
  setSortingQuery: React.Dispatch<React.SetStateAction<string>>;
  initialSearchUrl: undefined | string;
  query: string | undefined;
}) => {
  const accessionSortBtnRef = useRef<HTMLButtonElement | null>(null);
  const idSortBtnRef = useRef<HTMLButtonElement | null>(null);
  const geneSortBtnRef = useRef<HTMLButtonElement | null>(null);
  const organismSortBtnRef = useRef<HTMLButtonElement | null>(null);
  const lengthSortBtnRef = useRef<HTMLButtonElement | null>(null);
  const [sortingBy, setSortingBy] = useState<HTMLButtonElement | null>(null);
  const [sortingType, setSortingType] = useState<string | undefined>(undefined);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [items, setItems] = useState<ProteinT[]>([]);
  const [searchResultsQuantity, setSearchResultsQuantity] = useState(0);
  const [searchResultQuery, setSearchResultQuery] = useState("");
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [isResultsPending, setIsResultsPending] = useState(true);
  const [isSortingPending,setIsSortingPending] = useState(false);
  const loadNextPage = () => {
    setIsNextPageLoading(true);
    console.log(nextUrl, "nextUrl");
    console.log("loadNextPage");
    if (nextUrl) {
      getChunk(nextUrl)
        .then((res) => {
          if (res) {
            setIsResultsPending(false);
            setNextUrl(res.next);
            setItems((prevItems) => [...prevItems, ...res.proteins]);
            console.log(res.next, "NEXT IN CHUNK");
            setHasNextPage(res.next ? true : false);
            setIsNextPageLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    
    //is it really needed?
    console.log(!!initialSearchUrl);
    if (initialSearchUrl && query) {
      setIsResultsPending(true)
      console.log("url changed", initialSearchUrl, query);
      getSearchResults(initialSearchUrl, query)
        .then((res) => {
          if (res) {
            const resulstsQuantity = res?.totalResultsCount;
            setSearchResultQuery(res.query);
            setSearchResultsQuantity(resulstsQuantity);
            setItems(res.proteins);
            if (res.next) {
              setNextUrl(res.next);
              setHasNextPage(true);
              console.log({ s: "next from server", n: res.next });
            }
            if (!res.next) {
              console.warn("noNext");
              setHasNextPage(false);
            }
          } else {
            setSearchResultQuery(query);
            setSearchResultsQuantity(0);
            setItems([]);
            return;
          }
        })
        .then(() => {
          setIsResultsPending(false);
          setIsSortingPending(false);
        })
        .catch((err) => console.log(err));
    }
  }, [initialSearchUrl]);
  const toggleSortingType = () => {
    if (sortingType) {
      sortingType === "asc"
        ? setSortingType("desc")
        : setSortingType(undefined);
    } else {
      setSortingType("asc");
    }
  };
  const sortRsults = (ref: React.RefObject<HTMLButtonElement>) => {
    const btn = ref.current;
    setIsSortingPending(true);
    if (btn) {
      if (btn !== sortingBy) {
        setSortingBy(btn);
        setSortingType("asc");
      } else {
        toggleSortingType();
      }
    }
  };

  useEffect(() => {
    if (sortingType) {
      const sortingQueryStr = `&sort=${sortingBy?.name} ${sortingType}`;
      setSortingQuery(sortingQueryStr);
    } else {
      setSortingQuery("");
    }
    //mb add return just for folowing some conventions)
  }, [sortingType, sortingBy]);
  if (isResultsPending && !!initialSearchUrl && !isSortingPending) {
    return <div className="search-results__preloader"></div>;
  }
  if (initialSearchUrl) {
    if (items.length === 0) {
      return (
        <section className="search-results">
          <div className="empty-search-results">
            <p className="empty-search-results__description">
              No search results for your request
            </p>
            <p className="empty-search-results__description">
              Please change try different keywords, or clear filters.
            </p>
          </div>
        </section>
      );
    }
    return (
      <section className="search-results">
        <h3 className="search-results__quantity">{`${searchResultsQuantity} Search Results ${
          searchResultQuery !== "*" ? `for ${searchResultQuery}` : ""
        }`}</h3>
        <div className="search-results__table">
          <div className="search-results__table-row search-results__table-row-header">
            <div className="table__cell table__cell__number table__cell-header">
              #
            </div>
            <div className="table__cell table__cell__entry table__cell-header">
              <span className="table__cell-header-text">Entry</span>
              <button
                className={`table__cell-header-sort-btn ${
                  sortingBy?.name === "accession"
                    ? `${
                        sortingType
                          ? `table__cell-header-sort-btn--${sortingType}-sorting`
                          : ""
                      }`
                    : ""
                }`}
                type="button"
                name="accession"
                ref={accessionSortBtnRef}
                onClick={() => {
                  sortRsults(accessionSortBtnRef);
                }}
              ></button>
            </div>
            <div className="table__cell table__cell__entry-names table__cell-header">
              <span className="table__cell-header-text">Entry Names</span>
              <button
                className={`table__cell-header-sort-btn ${
                  sortingBy?.name === "id"
                    ? `${
                        sortingType
                          ? `table__cell-header-sort-btn--${sortingType}-sorting`
                          : ""
                      }`
                    : ""
                }`}
                type="button"
                name="id"
                ref={idSortBtnRef}
                onClick={() => {
                  sortRsults(idSortBtnRef);
                }}
              ></button>
            </div>
            <div className="table__cell table__cell__genes table__cell-header">
              <span className="table__cell-header-text">Genes</span>
              <button
                className={`table__cell-header-sort-btn ${
                  sortingBy?.name === "gene"
                    ? `${
                        sortingType
                          ? `table__cell-header-sort-btn--${sortingType}-sorting`
                          : ""
                      }`
                    : ""
                }`}
                type="button"
                name="gene"
                ref={geneSortBtnRef}
                onClick={() => {
                  sortRsults(geneSortBtnRef);
                }}
              ></button>
            </div>
            <div className="table__cell table__cell__organism table__cell-header">
              <span className="table__cell-header-text">Organism</span>
              <button
                className={`table__cell-header-sort-btn ${
                  sortingBy?.name === "organism_name"
                    ? `${
                        sortingType
                          ? `table__cell-header-sort-btn--${sortingType}-sorting`
                          : ""
                      }`
                    : ""
                }`}
                type="button"
                name="organism_name"
                ref={organismSortBtnRef}
                onClick={() => {
                  sortRsults(organismSortBtnRef);
                }}
              ></button>
            </div>
            <div className="table__cell table__cell__subcellular table__cell-header">
              <span className="table__cell-header-text">
                Subcellular Location
              </span>
            </div>
            <div className="table__cell table__cell__length table__cell-header">
              <span className="table__cell-header-text">Length</span>
              <button
                className={`table__cell-header-sort-btn ${
                  sortingBy?.name === "length"
                    ? `${
                        sortingType
                          ? `table__cell-header-sort-btn--${sortingType}-sorting`
                          : ""
                      }`
                    : ""
                }`}
                type="button"
                name="length"
                ref={lengthSortBtnRef}
                onClick={() => {
                  sortRsults(lengthSortBtnRef);
                }}
              ></button>
            </div>
          </div>
          <SearchResultsTable
            hasNextPage={hasNextPage}
            isNextPageLoading={isNextPageLoading}
            items={items}
            loadNextPage={loadNextPage}
          />
        </div>
      </section>
    );
  }

  return (
    <div className="empty-search-results">
      <p className="empty-search-results__description">No data to display</p>
      <p className="empty-search-results__description">
        Please start search to display results
      </p>
    </div>
  );
};
export { SearchResults };

// const number = index+1;
// const entry = item.primaryAccession;
// const entryNames = item.uniProtkbId;
// const genes = () => {
//     if(item.genes){
//       return  item.genes.map((g) => {
//         if(g.geneName) {
//             return g.geneName.value;
//         } return ''})
//     }
// }
// const subcellularLocations = () => {
//     if(item.comments){
//         if(item.comments[0]){
//             if(item.comments[0].subcellularLocations){
//                 return item.comments[0].subcellularLocations.map(v => v.location.value)
//             }
//         }
//     return null}
// }
// const length = item.sequence.length
// const organism = item.organism.scientificName;

//  <div className='table__cell table__cell__number'>{number}</div>
// <div className='table__cell table__cell__entry' onClick={()=>{navigate(`/proteins/${entry}`)}}>{entry}</div>
// <div className='table__cell table__cell__entry-names'>{entryNames}</div>
// <div className='table__cell table__cell__genes'>{genes()}</div>
// <div className='table__cell table__cell__organism'>
//     <span className='table__cell__organism-label'>{organism}</span>
// </div>
// <div className='table__cell table__cell__subcellular'>
//     <div className='table__cell__subcellular-overflow-box'>{subcellularLocations()}</div>
// </div>
// <div className='table__cell table__cell__length'>{length}</div>
//
