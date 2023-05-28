interface Genes {
  orderedLocusNames: {
    value: string;
  };
  geneName: {
    value: string;
  };
}
interface Protein {
  comments: [
    {
      subcellularLocations: [
        {
          location: {
            value: string;
          };
        }
      ];
    }
  ];
  primaryAccession: string;
  uniProtkbId: string;
  organism: {
    scientificName: string;
  };
  sequence: {
    length: string;
  };
  genes: Genes[];
}
interface ResT {
  proteins: Protein[];
  totalResultsCount: number;
  next: string | null;
  query: string;
  url: string;
}
import "./SearchPage.css";
import { useCallback, useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { baseSearchUrl } from "../../utils/UniprotUrls";

import { getSearchResults } from "../../api/uniprot";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useLocation,  useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [query, setQuery] = useState<undefined | string>(undefined);
  const [filterQuery, setFilterQuery] = useState("");
  const [sortingQuery, setSortingQuery] = useState("");
  const [initialSearchUrl, setInitialSearchUrl] = useState<string | undefined>(
    undefined
  );
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const search = location.search.replace('?q=', '');
  useEffect(() => {
    setQuery(decodeURIComponent(search))
  },[])
  useEffect(() => {
    if (query) {
      const searchUrl = `${baseSearchUrl}&query=(${query})${filterQuery}${sortingQuery}`;
        setInitialSearchUrl(searchUrl);
        navigate({ pathname: path,search: `q=${query}`});
    }
  }, [query, filterQuery, sortingQuery]);

  return (
    <div className="search-page">
      <Header />
      <SearchBar
        setFilterQuery={setFilterQuery}
        setQuery={setQuery}
        query={query}
      />
      <SearchResults
        setSortingQuery={setSortingQuery}
        initialSearchUrl={initialSearchUrl}
        query={query}
      />
    </div>
  );
};
export { SearchPage };
