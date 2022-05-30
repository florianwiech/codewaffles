import Fuse from "fuse.js";
import debounce from "lodash.debounce";
import { ChangeEventHandler, FC, forwardRef, ReactNode, useCallback, useRef, useState } from "react";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";
import { useScrollIntoView } from "./hooks/useScrollIntoView";
import { StyledInput } from "./styles/Input.style";
import { StyledSearchResults } from "./styles/SearchResults.style";
import { StyledBackdrop, StyledSpotlight } from "./styles/Spotlight.style";

export type BaseCommand = { key: string; label: string };
export type Command<T> = T & BaseCommand;

export type SpotlightProps<T = BaseCommand> = {
  commands: ReadonlyArray<Command<T>>;
  keys?: Array<Fuse.FuseOptionKey<Command<T>>>;

  initialVisibility?: boolean;
  onSubmit: (command: Command<T>) => void;
  onClose: () => void;
};

export const SPOTLIGHT_LABEL = "Search command...";

export function useSpotlightSearch<T>(props: SpotlightProps<T>) {
  const { commands, keys = ["label"], initialVisibility = false } = props;
  const fuse = new Fuse<Command<T>>(commands, { keys });

  const inputRef = useRef<HTMLInputElement>(null);

  const [visible, setVisible] = useState(initialVisibility);
  const [hits, setHits] = useState<Fuse.FuseResult<Command<T>>[]>([]);
  const [activeHit, setActiveHit] = useState<number | null>(null);

  const openSpotlight = () => setVisible(true);

  const closeSearch = (emit = true) => {
    setVisible(false);
    resetSearch();
    if (emit) props.onClose();
  };

  const resetSearch = () => {
    setHits([]);
    setActiveHit(null);
  };

  const onSubmit = () => {
    if (activeHit !== null) {
      props.onSubmit(hits[activeHit].item);
      closeSearch(false);
    } else {
      setActiveHit(0);
    }
  };

  const selectUp = () => (activeHit !== null && activeHit > 0 ? setActiveHit(activeHit - 1) : undefined);
  const selectDown = () =>
    activeHit !== null && activeHit < hits.length - 1 ? setActiveHit(activeHit + 1) : undefined;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = useCallback(
    debounce((term: string) => {
      const fuzzySearchResults = fuse.search(term);
      setHits(fuzzySearchResults);
      if (fuzzySearchResults.length > 0) {
        setActiveHit(0);
      } else {
        setActiveHit(null);
      }
    }, 500),
    [],
  );

  const handleHitClick = (index: number) => {
    setActiveHit(index);
    inputRef.current?.focus();
  };

  return {
    visible,
    hits,
    activeHit,
    selectUp,
    selectDown,
    handleSearch,
    handleHitClick,
    onSubmit,
    closeSearch,
    resetSearch,
    inputRef,
    openSpotlight,
  };
}

type SpotlightWrapperProps = {
  children: ReactNode;
  visible: boolean;
  onClose: () => void;
};
export const SpotlightWrapper: FC<SpotlightWrapperProps> = ({ visible, onClose, children }) => {
  if (!visible) return null;
  return (
    <>
      <StyledBackdrop onClick={() => onClose()} />
      <StyledSpotlight>{children}</StyledSpotlight>
    </>
  );
};

export type SpotlightSearchInputProps = {
  onSearch: (term: string) => void;
  onReset: () => void;
  onEnter: () => void;
  onClose: () => void;

  onSelectUp: () => void;
  onSelectDown: () => void;

  resultCount: number;
};

export const SpotlightSearchInput = forwardRef<HTMLInputElement, SpotlightSearchInputProps>((props, ref) => {
  const { onSearch, onReset, resultCount, onClose, onEnter, onSelectUp, onSelectDown } = props;
  const [searchInput, setSearchInput] = useState("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchInput(event.target.value);
    onSearch(event.target.value);
  };

  const resetSearch = () => {
    setSearchInput("");
    onReset();
  };

  const closeSearch = () => {
    onClose();
    resetSearch();
  };

  const handleKeyboardNavigation = useKeyboardNavigation({
    searchInput,
    resultCount,
    closeSearch,
    resetSearch,
    onEnter,
    selectUp: onSelectUp,
    selectDown: onSelectDown,
  });

  return (
    <StyledInput
      ref={ref}
      type="text"
      placeholder={SPOTLIGHT_LABEL}
      aria-label={SPOTLIGHT_LABEL}
      value={searchInput}
      onChange={handleChange}
      onKeyDown={handleKeyboardNavigation}
      autoFocus
    />
  );
});

export type SpotlightSearchResultsProps<T = BaseCommand> = {
  results: Fuse.FuseResult<Command<T>>[];
  activeResult: number | null;
  handleResultSelect: (index: number) => void;
  onSubmit: () => void;
};

export function SpotlightSearchResults<T>(props: SpotlightSearchResultsProps<T>) {
  const { results, activeResult, handleResultSelect, onSubmit } = props;
  const listRef = useRef<HTMLUListElement>(null);

  if (results.length === 0) return null;

  return (
    <StyledSearchResults>
      <ul ref={listRef}>
        {results.map(({ item }, index) => (
          <SearchResult
            key={item.key}
            item={item}
            active={activeResult === index}
            holderRect={listRef.current?.getBoundingClientRect()}
            onClick={() => handleResultSelect(index)}
            performOperation={onSubmit}
          />
        ))}
      </ul>
    </StyledSearchResults>
  );
}

export type SearchResultProps<T> = {
  item: Command<T>;
  holderRect: DOMRect | undefined;
  active: boolean;
  onClick: () => void;
  performOperation: () => void;
};

export function SearchResult<T>({ item, active, onClick, performOperation, holderRect }: SearchResultProps<T>) {
  const ref = useScrollIntoView<HTMLLIElement>(active, holderRect);

  return (
    <li ref={ref} className={active ? "active" : ""} onClick={onClick} onDoubleClick={performOperation}>
      {item.label}
    </li>
  );
}
