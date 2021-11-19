import { FC, KeyboardEventHandler, useState } from "react";
import debounce from "lodash.debounce";
import Fuse from "fuse.js";
import { useKeyPress } from "../utils/useKeyPress";
import { TransformDefinition, TransformList } from "../transforms";
import { StyledBackdrop, StyledSpotlight } from "./Spotlight.style";
import { StyledInput } from "./Input";
import { StyledSearchResults } from "./SearchResults";

export type Props = {
  scripts: TransformList;
};
export const Spotlight: FC<Props> = ({ scripts }) => {
  const fuse = new Fuse(scripts, { keys: ["label"] });

  const [visible, setVisible] = useState(false);
  const [hits, setHits] = useState<Fuse.FuseResult<TransformDefinition>[]>([]);

  const handleKeyPress = () => setVisible(!visible);
  useKeyPress("k", handleKeyPress);

  // todo style spotlight (responsiveness)
  // todo keyboard navigation between results

  const clearSearch = () => {
    setVisible(false);
  };

  const handleKeyboardShortcuts: KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    switch (event.key) {
      // todo cases arrow keys for selection
      case "Escape":
        clearSearch();
        event.preventDefault();
        break;
    }
  };

  const handleSearch = debounce((term: string) => {
    setHits(fuse.search(term));
  }, 500);

  if (!visible) {
    return null;
  }

  return (
    <>
      <StyledBackdrop onClick={clearSearch} />
      <StyledSpotlight>
        <StyledInput
          type="text"
          placeholder="Search command..."
          onChange={(event) => handleSearch(event.target.value)}
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
