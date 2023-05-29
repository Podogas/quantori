import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeList as List } from "react-window";
import { CSSProperties, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AutoSizer from "react-virtualized-auto-sizer";
import "./SearchResults.css";
import { ProteinT } from "../../utils/globalTypes.t";
const SearchResultsTable = ({
  // Are there more items to load?
  // (This information comes from the most recent API request.)
  hasNextPage,

  // Are we currently loading a page of items?
  // (This may be an in-flight flag in your Redux store for example.)
  isNextPageLoading,

  // Array of items loaded so far.
  items,

  // Callback function responsible for loading the next page of items.
  loadNextPage,
}: {
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  items: ProteinT[];
  loadNextPage: () => void;
}) => {
  const navigate = useNavigate();
  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  console.log(items, hasNextPage);
  const itemCount = hasNextPage ? items.length + 1 : items.length;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index: number) => !hasNextPage || index < items.length;

  // Render an item or a loading indicator.
  const tableRow = ({
    index,
    style,
  }: {
    index: number;
    style: CSSProperties;
  }) => {
    if (!isItemLoaded(index)) {
      return (
        <div
          className="search-results__table-row table-row--loading"
          style={style}
        ></div>
      );
    } else {
      const number = index + 1;
      const entry = items[index].primaryAccession;
      const entryNames = items[index].uniProtkbId;
      const genes = () => {
        if (items[index].genes) {
          return items[index].genes.map((g) => {
            if (g.geneName) {
              return g.geneName.value;
            }
            return "";
          });
        }
      };
      const subcellularLocations = () => {
        if (items[index].comments) {
          if (items[index].comments[0]) {
            if (items[index].comments[0].subcellularLocations) {
              return items[index].comments[0].subcellularLocations.map(
                (v) => v.location.value
              );
            }
          }
          return null;
        }
      };
      const length = items[index].sequence.length;
      const organism = items[index].organism.scientificName;
      return (
        <div className="search-results__table-row" style={style}>
          <div className="table__cell table__cell__number">{number}</div>
          <div
            className="table__cell table__cell__entry"
            onClick={() => {
              navigate(`/proteins/${entry}`);
            }}
          >
            {entry}
          </div>
          <div className="table__cell table__cell__entry-names">
            {entryNames}
          </div>
          <div className="table__cell table__cell__genes">{genes()}</div>
          <div className="table__cell table__cell__organism">
            <span className="table__cell__organism-label">{organism}</span>
          </div>
          <div className="table__cell table__cell__subcellular">
            <div className="table__cell__subcellular-overflow-box">
              {subcellularLocations()}
            </div>
          </div>
          <div className="table__cell table__cell__length">{length}</div>
        </div>
      );
    }
  };
  return (
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={itemCount}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <List
              height={height ? 528 : 0}
              itemCount={itemCount}
              itemSize={height ? height / 11 : 48}
              width={width || 0}
              onItemsRendered={onItemsRendered}
              ref={ref}
            >
              {tableRow}
            </List>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
};
export { SearchResultsTable };
