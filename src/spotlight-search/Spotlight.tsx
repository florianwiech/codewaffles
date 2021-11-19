import { ChangeEventHandler, FC, KeyboardEventHandler, useState } from "react";
import debounce from "lodash.debounce";
import Fuse from "fuse.js";
import { useKeyPress } from "../utils/useKeyPress";
import { TransformDefinition, TransformList } from "../transforms";
import { StyledBackdrop, StyledSpotlight } from "./Spotlight.style";
import { StyledInput, StyledLabel } from "./Input";
import { StyledSearchResults } from "./SearchResults";

export type Props = {
  scripts: TransformList;
};

export const SPOTLIGHT_LABEL = "Search command";

export const Spotlight: FC<Props> = ({ scripts }) => {
  const fuse = new Fuse(scripts, { keys: ["label"] });

  const [visible, setVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [hits, setHits] = useState<Fuse.FuseResult<TransformDefinition>[]>([]);

  const activeSearch = hits.length > 0;

  const handleKeyPress = () => setVisible(!visible);
  useKeyPress("k", handleKeyPress);

  // todo keyboard navigation between results

  const closeSearch = () => {
    setVisible(false);
    resetSearch();
  };

  const resetSearch = () => {
    setSearchInput("");
    setHits([]);
  };

  const handleKeyboardShortcuts: KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    switch (event.key) {
      // todo cases arrow keys for selection
      case "Escape":
        if (activeSearch) {
          resetSearch();
        } else {
          closeSearch();
        }
        event.preventDefault();
        break;
    }
  };

  const performSearch = debounce((term: string) => {
    setHits(fuse.search(term));
  }, 500);

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchInput(event.target.value);
    performSearch(event.target.value);
  };

  if (!visible) {
    return null;
  }

  return (
    <>
      <StyledBackdrop onClick={closeSearch} />
      <StyledSpotlight>
        <StyledLabel htmlFor="spotlight-search">{SPOTLIGHT_LABEL}</StyledLabel>
        <StyledInput
          id="spotlight-search"
          type="text"
          placeholder="Search command..."
          value={searchInput}
          onChange={handleSearch}
          onKeyDown={handleKeyboardShortcuts}
          autoFocus
        />
        {hits.length > 0 && (
          <StyledSearchResults>
            <ul>
              {hits.map(({ item }) => (
                <li key={item.key}>{item.label}</li>
              ))}
            </ul>
          </StyledSearchResults>
        )}
      </StyledSpotlight>
    </>
  );
};
