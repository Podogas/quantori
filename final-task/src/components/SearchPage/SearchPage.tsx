
import './SearchPage.css';
import { Header } from "../Header/Header";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
const SearchPage = () => {

    return(
        <div className="search-page">
            <Header/>
            <SearchBar/>
            <SearchResults/>
        </div>
    )
}
export {SearchPage};