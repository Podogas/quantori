import "./SearchFilter.css";
import { useState, useRef, useEffect } from "react";
import { getFacets } from "../../api/uniprot";
import { CustomSelectOption } from "../CustomSelectOption/CustomSelectOption.tsx";
import { FiltrObjT, OptionT } from "../../utils/globalTypes.t.ts";
const SearchFilter = ({
  setFilter,
  filter,
  query,
}: {
  setFilter: React.Dispatch<React.SetStateAction<FiltrObjT>>;
  filter: FiltrObjT;
  query: string | undefined;
}) => {
  const numberRegex = /^[0-9]+$/;
  const [isFiltersOpened, setIsFiltersOpened] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [isResultsPending, setIsResultsPending] = useState(false);
  // States for arrays that we get from API
  const [modelOrganismOptions, setModelOrganismOptions] = useState<OptionT[]|null>(
    []
  );
  const [proteinsWithOptions, setProteinsWithOptions] = useState<OptionT[]|null>([]);
  const [annotationScoreOptions, setAnnotationScoreOptions] = useState<OptionT[]|null>([]);
  // States that store filter options
  const [selectedGeneName, setSelectedGeneName] = useState<string | undefined>(
    filter.gene
  );
  const [selectedLengthFrom, setSelectedLengthFrom] = useState<
    string | undefined
  >(filter.lengthFrom);
  const [selectedLengthTo, setSelectedLengthTo] = useState<string | undefined>(
    filter.lengthTo
  );
  const [selectedModelOrganism, setSelectedModelOrganism] = useState<
    string | undefined
  >(filter.organism);
  const [selectedProteinsWith, setSelectedProteinsWith] = useState<
    string | undefined
  >(filter.protetinsWith);
  const [selectedAnnotationScore, setSelectedAnnotationScore] = useState<
    string | undefined
  >(filter.annotationScore);
  const [lengthError, setLengthError] = useState<boolean | string>(false);
  const geneNameInputRef = useRef<HTMLInputElement | null>(null);
  const lengthFromInputRef = useRef<HTMLInputElement | null>(null);
  const lengthToInputRef = useRef<HTMLInputElement | null>(null);
  // TEST ZONE
  // setSelectedModelOrganism(filter.organism);
  // setSelectedProteinsWith(filter.protetinsWith)
  // setSelectedAnnotationScore(filter.annotationScore)
  // setSelectedGeneName(filter.gene)
  // setSelectedLengthFrom(filter.lengthFrom)
  // setSelectedLengthTo(filter.lengthTo)
  useEffect(() => {
    const filters = () => {
      let filterString = "";
      filter.gene ? (filterString += ` AND (gene:${filter.gene})`) : "";
      filter.annotationScore
        ? (filterString += ` AND (annotation_score:${filter.annotationScore})`)
        : "";
      filter.lengthFrom && filter.lengthTo
        ? (filterString += ` AND length:[${filter.lengthFrom} TO ${filter.lengthTo}]`)
        : "";
      filter.lengthFrom && !filter.lengthTo
        ? (filterString += `mass:[${filter.lengthFrom} TO *]`)
        : "";
      !filter.lengthFrom && filter.lengthTo
        ? (filterString += ` AND length:[1 TO ${filter.lengthTo}]`)
        : "";
      return encodeURI(filterString);
    };

    if (query) {
      console.log(query)
      setIsResultsPending(true);
      getFacets(query, filters())
        .then((res) => {
          if (res.facets) {
            console.log(res.facets);
            const modelOrganism = res.facets[0];
            const proteinsWith = res.facets[1];
            const annotationScore = res.facets[2];
            setModelOrganismOptions(modelOrganism.values);
            setProteinsWithOptions(proteinsWith.values);
            setAnnotationScoreOptions(annotationScore.values);
            setIsResultsPending(false);
          } else {
            setIsResultsPending(false);
            setModelOrganismOptions(null);
            setProteinsWithOptions(null);
            setAnnotationScoreOptions(null);
          }
        })
        .catch((err) => {
          setModelOrganismOptions(null);
          setProteinsWithOptions(null);
          setAnnotationScoreOptions(null);
          setIsFilterApplied(false)
          setIsResultsPending(false);
          console.warn(err)});
    }
  }, [query, filter]);
  useEffect(()=>{
    setIsFiltersOpened(false);
  },[query])
  const validateLengthFields = () => {
    const lengthFromValue = lengthFromInputRef.current?.value;
    const lengthToValue = lengthToInputRef.current?.value;
    if (lengthFromValue && lengthToValue) {
      if (Number(lengthFromValue) <= Number(lengthToValue)) {
        setLengthError(false);
        return true;
      } else {
        console.log(2);
        setLengthError("<From> field should be less or equal to <To> field");
        return false;
      }
    } else {
      console.log(1);
      setLengthError(false);
      return true;
    }
  };
  const onInputChange = (ref: React.RefObject<HTMLInputElement>) => {
    console.log(modelOrganismOptions);
    const name = ref.current?.name;
    const value =
      ref.current?.value.replace(/\s/g, "") !== ""
        ? ref.current?.value
        : undefined;
    if (value) {
      if (name === "gene") {
        setSelectedGeneName(value);
      }
      if (name === "length-from" || "length-to") {
        if (numberRegex.test(value)) {
          if (validateLengthFields()) {
            setIsButtonActive(true);
            name === "length-from"
              ? setSelectedLengthFrom(value)
              : setSelectedLengthTo(value);
          } else {
            setIsButtonActive(false);
          }
        } else {
        }
      }
    } else {
      if (name === "length-from" || "length-to") {
        if (validateLengthFields()) {
          name === "length-from"
            ? setSelectedLengthFrom(value)
            : setSelectedLengthTo(value);
          setLengthError(false);
          setIsButtonActive(true);
        } else {
          setIsButtonActive(false);
        }
      }
    }
  };

  const onToggleFilters = () => {
    console.log(123);
    setSelectedModelOrganism(filter.organism);
    setSelectedProteinsWith(filter.protetinsWith);
    setSelectedAnnotationScore(filter.annotationScore);
    setSelectedGeneName(filter.gene);
    setSelectedLengthFrom(filter.lengthFrom);
    setSelectedLengthTo(filter.lengthTo);
    setIsFiltersOpened(!isFiltersOpened);
  };
  const onClose = () => {
    const filterObj = {
      gene: undefined,
      organism: undefined,
      lengthFrom: undefined,
      lengthTo: undefined,
      annotationScore: undefined,
      protetinsWith: undefined,
    };

    setIsFiltersOpened(false);
    setIsFilterApplied(false);
    setIsButtonActive(false);
    setFilter(filterObj);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ d: selectedProteinsWith });
    const filterObj = {
      gene: selectedGeneName,
      organism: selectedModelOrganism,
      lengthFrom: selectedLengthFrom,
      lengthTo: selectedLengthTo,
      annotationScore: selectedAnnotationScore,
      protetinsWith: selectedProteinsWith,
    };

    setIsFiltersOpened(false);
    setIsFilterApplied(true);
    setIsButtonActive(false);
    setFilter(filterObj);
  };
  useEffect(() => {
    if (
      selectedModelOrganism ||
      selectedProteinsWith ||
      selectedAnnotationScore ||
      selectedGeneName ||
      selectedLengthFrom ||
      selectedLengthTo
    ) {
      setIsButtonActive(true);
      if (
        selectedModelOrganism === filter.organism &&
        selectedProteinsWith === filter.protetinsWith &&
        selectedAnnotationScore === filter.annotationScore &&
        selectedGeneName === filter.gene &&
        selectedLengthFrom === filter.lengthFrom &&
        selectedLengthTo === filter.lengthTo
      ) {
        setIsButtonActive(false);
      }
    } else {
      setIsButtonActive(false);
    }
  }, [
    selectedModelOrganism,
    selectedProteinsWith,
    selectedAnnotationScore,
    selectedGeneName,
    selectedLengthFrom,
    selectedLengthTo,
  ]);

  if (isFiltersOpened && query && !isResultsPending) {
    return (
      <>
        <button
          className="search-filter__button search-filter__button--opened"
          type="button"
          onClick={onToggleFilters}
        ></button>
        <div className="search-filter-wrapper">
          <div className="search-filter">
            <h4 className="search-filter__title">Filters</h4>
            <form onSubmit={onSubmit}>
              <div className="search-filter__element">
                <label className="search-filter__label">Gene Name</label>
                <input
                  className="search-filter__input"
                  type="text"
                  placeholder="Enter Gene Name"
                  defaultValue={filter.gene}
                  ref={geneNameInputRef}
                  name="gene"
                  onChange={() => {
                    onInputChange(geneNameInputRef);
                  }}
                />
              </div>
              <div className="search-filter__element">
                <label className="search-filter__label">Organism</label>
                <CustomSelectOption
                  optionsList={modelOrganismOptions}
                  defaultText={
                    filter.organism ? filter.organism : "Select an option"
                  }
                  uniqueKey="organism"
                  setState={setSelectedModelOrganism}
                />
              </div>
              <div className="search-filter__element">
                <label className="search-filter__label">Sequence length</label>
                <div className="search-filter__num-input-wrapper">
                  <input
                    className={`search-filter__num-input ${
                      lengthError ? "search-filter__num-input--error" : ""
                    }`}
                    type="number"
                    defaultValue={filter.lengthFrom}
                    placeholder="From"
                    ref={lengthFromInputRef}
                    name="length-from"
                    onChange={() => {
                      onInputChange(lengthFromInputRef);
                    }}
                  />
                  <span className="search-filter__num-input-dash"></span>
                  <input
                    className={`search-filter__num-input ${
                      lengthError ? "search-filter__num-input--error" : ""
                    }`}
                    type="number"
                    defaultValue={filter.lengthTo}
                    placeholder="To"
                    ref={lengthToInputRef}
                    name="length-to"
                    onChange={() => {
                      onInputChange(lengthToInputRef);
                    }}
                  />
                </div>
                {lengthError ? (
                  <p className={`num-input__error`}>{lengthError}</p>
                ) : null}
              </div>
              <div className="search-filter__element">
                <label className="search-filter__label">Annotation score</label>
                <CustomSelectOption
                  optionsList={annotationScoreOptions}
                  defaultText={
                    filter.annotationScore
                      ? filter.annotationScore
                      : "Select an option"
                  }
                  uniqueKey="annotation-score"
                  setState={setSelectedAnnotationScore}
                />
              </div>
              <div className="search-filter__element">
                <label className="search-filter__label">Protein with</label>
                <CustomSelectOption
                  optionsList={proteinsWithOptions}
                  defaultText={
                    filter.protetinsWith
                      ? filter.protetinsWith
                      : "Select an option"
                  }
                  uniqueKey="protein-with"
                  setState={setSelectedProteinsWith}
                />
              </div>
              <div className="search-filter-btn__wrapper">
                <button
                  className="search-filter-btn search-filter-cancel-btn"
                  type="button"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className={`search-filter-btn search-filter-apply-btn ${
                    isButtonActive ? "" : "search-filter-apply-btn--disabled"
                  }`}
                  type="submit"
                  disabled={isButtonActive ? false : true}
                >
                  Apply filters
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    return (
    !isResultsPending ? 
      <button
        className={`search-filter__button 
        ${isFilterApplied ? "search-filter__button--applied" : ""}
        ${query ? '' : "search-filter__button--disabled" }  
       `}
        type="button"
        onClick={onToggleFilters}
        disabled={query ? false : true}
      ></button>
      : <button className='search-filter__button search-filter__button--loading'></button>
    );
  }
};

export { SearchFilter };
