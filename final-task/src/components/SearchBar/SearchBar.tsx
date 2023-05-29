import "./SearchBar.css";
import { useState, useRef, useEffect } from "react";
import { SearchFilter } from "../SearchFilter/SearchFilter";
import { FiltrObjT } from "../../utils/globalTypes.t";

const SearchBar = ({
  setFilterQuery,
  setQuery,
  query,
}: {
  setFilterQuery: React.Dispatch<React.SetStateAction<string>>;
  setQuery: React.Dispatch<React.SetStateAction<string | undefined>>;
  query: string | undefined;
}) => {
  const [filter, setFilter] = useState<FiltrObjT>({
    gene: undefined,
    organism: undefined,
    lengthFrom: undefined,
    lengthTo: undefined,
    annotationScore: undefined,
    protetinsWith: undefined,
  });

  const inputRef = useRef<HTMLInputElement | null>(null);

  // const dispatch = useAppDispatch();
  /// TEST ZONE

  const checkAndSetQuery = () => {
    if (inputRef.current) {
      if (inputRef.current.value !== query) {
        if (inputRef.current.value.replace(/\s/g, "") !== "") {
          setQuery(inputRef.current.value.trim());
        } else {
          setQuery("*");
        }
      }
    }
  };
  const search = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkAndSetQuery();
  };
  useEffect(() => {
    const filters = `${filter.gene ? ` AND (gene:${filter.gene})` : ""}${
      filter.organism ? ` AND (model_organism:${filter.organism})` : ""
    }${
      filter.annotationScore
        ? ` AND (annotation_score:${filter.annotationScore})`
        : ""
    }
    ${
      filter.protetinsWith ? ` AND (proteins_with:${filter.protetinsWith})` : ""
    }
    ${
      filter.lengthFrom && filter.lengthTo
        ? ` AND length:%5B${filter.lengthFrom} TO ${filter.lengthTo}%5D`
        : ""
    }${
      filter.lengthFrom && !filter.lengthTo
        ? `mass:%5B${filter.lengthFrom} TO *%5D`
        : ""
    }${
      !filter.lengthFrom && filter.lengthTo
        ? ` AND length:%5B1 TO ${filter.lengthTo}%5D`
        : ""
    }`;
    setFilterQuery(filters);
  }, [filter]);

  return (
    <nav className="search-bar">
      <form className="search-bar__form" onSubmit={search} action="">
        <input
          className="search-bar__input"
          ref={inputRef}
          type="text"
          defaultValue={query ? query : ""}
          placeholder="Enter search value"
        />
        <button className="search-bar__button" type="submit">
          Search
        </button>
      </form>
      <SearchFilter setFilter={setFilter} filter={filter} query={query} />
    </nav>
  );
};

export { SearchBar };
