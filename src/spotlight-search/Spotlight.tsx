import {
  ChangeEventHandler,
  FC,
  KeyboardEventHandler,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import debounce from "lodash.debounce";
import Fuse from "fuse.js";
import { useKeyPress } from "../shared/hooks/useKeyPress";
import { CommandTypes, ScriptExtension, ScriptList } from "../types";
import { command$ } from "../modifier";
import { StyledBackdrop, StyledSpotlight } from "./Spotlight.style";
import { StyledInput } from "./Input.style";
import { StyledSearchResults } from "./SearchResults.style";
import {
  isElementVisibleInHorizontalList,
  shouldScrollIntoViewAlignTop,
} from "./spotlight-utils";

export type Props = {
  scripts: ScriptList;
};

export const SPOTLIGHT_LABEL = "Search command...";

export const Spotlight: FC<Props> = ({ scripts }) => {
  const fuse = new Fuse(scripts, { keys: ["label"] });

  const inputRef = useRef<HTMLInputElement>(null);
  const resultListRef = useRef<HTMLUListElement>(null);

  const [visible, setVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [hits, setHits] = useState<Fuse.FuseResult<ScriptExtension>[]>([]);
  const [activeHit, setActiveHit] = useState<number | null>(null);

  const handleKeyPress = () => setVisible(!visible);
  useKeyPress("k", handleKeyPress);

  const closeSearch = (emitClose = true) => {
    setVisible(false);
    resetSearch();
    if (emitClose) command$.next({ type: CommandTypes.SEARCH_CLOSED });
  };

  const resetSearch = () => {
    setSearchInput("");
    setHits([]);
    setActiveHit(null);
  };

  const selectUp = () =>
    activeHit !== null && activeHit > 0
      ? setActiveHit(activeHit - 1)
      : undefined;
  const selectDown = () =>
    activeHit !== null && activeHit < hits.length - 1
      ? setActiveHit(activeHit + 1)
      : undefined;

  const handleKeyboardShortcuts: KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    switch (event.key) {
      case "ArrowUp":
        selectUp();
        event.preventDefault();
        break;
      case "ArrowDown":
        selectDown();
        event.preventDefault();
        break;
      case "Tab":
        if (event.shiftKey) {
          selectUp();
        } else {
          selectDown();
        }
        event.preventDefault();
        break;
      case "Enter":
        if (hits.length === 0) break;
        performOperation();
        event.preventDefault();
        break;
      case "Escape":
        if (searchInput !== "") {
          resetSearch();
        } else {
          closeSearch();
        }
        event.preventDefault();
        break;
    }
  };

  const performSearch = debounce((term: string) => {
    const fuzzySearchResults = fuse.search(term);
    setHits(fuzzySearchResults);
    if (fuzzySearchResults.length > 0) {
      setActiveHit(0);
    } else {
      setActiveHit(null);
    }
  }, 500);

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchInput(event.target.value);
    performSearch(event.target.value);
  };

  const handleHitClick = (index: number) => {
    setActiveHit(index);
    inputRef.current?.focus();
  };

  const performOperation = () => {
    if (activeHit !== null) {
      command$.next({
        type: CommandTypes.PERFORM_TRANSFORM,
        key: hits[activeHit].item.key,
      });
      closeSearch(false);
      // closeSearch();
    } else {
      setActiveHit(0);
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <>
      <StyledBackdrop onClick={() => closeSearch()} />
      <StyledSpotlight>
        <StyledInput
          ref={inputRef}
          type="text"
          placeholder={SPOTLIGHT_LABEL}
          aria-label={SPOTLIGHT_LABEL}
          value={searchInput}
          onChange={handleSearch}
          onKeyDown={handleKeyboardShortcuts}
          autoFocus
        />
        {hits.length > 0 && (
          <StyledSearchResults>
            <ul ref={resultListRef}>
              {hits.map(({ item }, index) => (
                <SearchResult
                  key={item.key}
                  item={item}
                  active={activeHit === index}
                  holderRect={resultListRef.current?.getBoundingClientRect()}
                  onClick={() => handleHitClick(index)}
                  performOperation={performOperation}
                />
              ))}
            </ul>
          </StyledSearchResults>
        )}
      </StyledSpotlight>
    </>
  );
};

export const SearchResult: FC<{
  item: ScriptExtension;
  holderRect: DOMRect | undefined;
  active: boolean;
  onClick: () => void;
  performOperation: () => void;
}> = ({ item, active, onClick, performOperation, holderRect }) => {
  const ref = useScrollIntoView<HTMLLIElement>(active, holderRect);

  return (
    <li
      ref={ref}
      className={active ? "active" : ""}
      onClick={onClick}
      onDoubleClick={performOperation}
    >
      {item.label}
    </li>
  );
};

function useScrollIntoView<T extends HTMLElement>(
  shouldScrollIntoView: boolean,
  holder = document.body.getBoundingClientRect()
) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    if (shouldScrollIntoView && rect && holder) {
      if (!isElementVisibleInHorizontalList(rect, holder)) {
        const shouldAlignTop = shouldScrollIntoViewAlignTop(rect, holder);
        ref.current.scrollIntoView(shouldAlignTop);
      }
    }
  }, [shouldScrollIntoView, holder]);

  return ref;
}
