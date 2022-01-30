import {
  SpotlightProps,
  SpotlightSearchInput,
  SpotlightSearchResults,
  SpotlightWrapper,
  useSpotlightSearch,
} from "../Spotlight";

export function ExampleSpotlight<T>(props: SpotlightProps<T>) {
  const spotlight = useSpotlightSearch(props);

  return (
    <>
      <button onClick={() => spotlight.openSpotlight()}>Open Search</button>
      <SpotlightWrapper visible={spotlight.visible} onClose={spotlight.closeSearch}>
        <SpotlightSearchInput
          ref={spotlight.inputRef}
          onSelectUp={spotlight.selectUp}
          onSelectDown={spotlight.selectDown}
          onSearch={spotlight.handleSearch}
          onClose={spotlight.closeSearch}
          onEnter={spotlight.onSubmit}
          onReset={spotlight.resetSearch}
          resultCount={spotlight.hits.length}
        />
        <SpotlightSearchResults
          results={spotlight.hits}
          activeResult={spotlight.activeHit}
          handleResultSelect={spotlight.handleHitClick}
          onSubmit={spotlight.onSubmit}
        />
      </SpotlightWrapper>
    </>
  );
}
