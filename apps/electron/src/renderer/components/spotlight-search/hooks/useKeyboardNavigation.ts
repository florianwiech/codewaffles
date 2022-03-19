import { KeyboardEventHandler } from "react";

export type Arguments = {
  searchInput: string;
  resultCount: number;
  selectUp: () => void;
  selectDown: () => void;
  onEnter: () => void;
  resetSearch: () => void;
  closeSearch: () => void;
};

export function useKeyboardNavigation(params: Arguments): KeyboardEventHandler<HTMLInputElement> {
  const { searchInput, resultCount, selectUp, selectDown, onEnter, resetSearch, closeSearch } = params;

  return (event) => {
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
        if (resultCount === 0) break;
        onEnter();
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
}
