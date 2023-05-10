import { useEffect, useRef, useState } from "react";
import "./Nav.css";
import { Tags } from "../Tags/Tags";
import { useLocation, useNavigate } from "react-router-dom";
import { TaskType } from "../../Utils/Interfaces";
const Nav = ({
  setFilter,
  setPopupType,
  setPopupContent,
}: {
  setFilter: ({ tag, query }: { tag: string; query: string }) => void;
  setPopupType: (value: string | boolean) => void;
  setPopupContent: (value: undefined | TaskType | TaskType[]) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const search = location.search.replace("?q=", "");

  useEffect(() => {
    setFilter({ tag, query });
  }, [tag, query,setFilter]);
  useEffect(() => {
    const params = new URLSearchParams();
    if (query.replace(/\s/g, "") !== "") {
      params.append("q", query);
    } else {
      params.delete("q");
    }
    navigate({ search: params.toString() });
  }, [query, navigate]);
  useEffect(() => {
    const decodedQuery = decodeURIComponent(search).replace(/\+/g, " ");
    setQuery(decodedQuery);
    switch (path) {
      case "/tasks/health":
        setTag("health");
        break;
      case "/tasks/work":
        setTag("work");
        break;
      case "/tasks/home":
        setTag("home");
        break;
      case "/tasks/other":
        setTag("other");
        break;
      case "/tasks":
        setTag("");
        break;
      default: {
        setTag("");
        navigate("");
      }
    }
  }, [] );

  const openPopup = () => {
    setPopupContent(undefined);
    setPopupType("popup");
  };
  const onInputChange = () => {
    const value = inputRef.current?.value;
    if (value) {
      setQuery(value);
    } else {
      setQuery("");
    }
  };
  const onSelectTag = (tag: string): void => {
    setTag(tag);
    navigate(tag);
  };
  return (
    <nav className="nav">
      <div className="nav__search-form-wrapper">
        <input
          className="nav__input"
          ref={inputRef}
          onChange={onInputChange}
          placeholder="Search Task"
          type="text"
          value={query}
        />
        <button
          className="nav__button"
          type="button"
          onClick={openPopup}
          ref={buttonRef}
        >
          + New Task
        </button>
      </div>
      <Tags
        onSelectTag={onSelectTag}
        blockName="nav"
        initialSelectedTag={tag}
      />
    </nav>
  );
};

export { Nav };
