import './SearchResults.css';
const SearchResults = () => {

    return (
        <div className="empty-search-results">
            <p className="empty-search-results__description">No data to display</p>
            <p className="empty-search-results__description">Please start search to display results</p>
        </div>
    )
}

export {SearchResults};