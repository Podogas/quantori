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

const SearchPage = () => {
  const [query, setQuery] = useState<undefined | string>(undefined);
  const [filterQuery, setFilterQuery] = useState("");
  const [sortingQuery, setSortingQuery] = useState("");
  const [initialSearchUrl, setInitialSearchUrl] = useState<string | undefined>(
    undefined
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (query) {
      console.log(query, "query");
      const searchUrl = `${baseSearchUrl}&query=(${query})${filterQuery}${sortingQuery}`;
      if (query) {
        setInitialSearchUrl(searchUrl);
      }
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
