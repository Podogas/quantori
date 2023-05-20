import './SearchBar.css';
import { SearchFilter } from "../SearchFilter/SearchFilter";
const SearchBar = () => {
    const search = () => {
        console.log('searching')
    }
    return(
        <nav className="search-bar">
            <form className="search-bar__form" onSubmit={search} action="">   
                <input className="search-bar__input" type="text" placeholder="Enter search value"/>
                <button className="search-bar__button" type="submit">Search</button>
            </form>
            <SearchFilter/>
        </nav>
    )
}

export {SearchBar}