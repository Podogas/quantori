import "./SearchPage.css";
import { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { baseSearchUrl } from "../../utils/UniprotUrls";
import { useLocation, useNavigate } from "react-router-dom";

const SearchPage = () => {
  const isBadUrl = /[<>#"{}|\\^~[\]`]+/;
  const [query, setQuery] = useState<undefined | string>(undefined);
  const [filterQuery, setFilterQuery] = useState("");
  const [sortingQuery, setSortingQuery] = useState("");
  const [initialSearchUrl, setInitialSearchUrl] = useState<string | undefined>(
    undefined
  );
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const search = location.search.replace("?q=", "");
  useEffect(() => {
    setQuery(decodeURIComponent(search));
  }, []);
  useEffect(() => {
    if (query) {
      const searchUrl = `${baseSearchUrl}&query=(${query})${filterQuery}${sortingQuery}`;
      setInitialSearchUrl(searchUrl);
      const urlSearchQuery = isBadUrl.test(query)
        ? encodeURIComponent(query)
        : query;
      navigate({ pathname: path, search: `q=${urlSearchQuery}` });
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
