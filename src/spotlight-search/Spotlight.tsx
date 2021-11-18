import { FC, KeyboardEventHandler, useCallback, useState } from "react";
import { useKeyPress } from "../utils/useKeyPress";
import { StyledBackdrop, StyledSpotlight } from "./Spotlight.style";
import { Input } from "./Input";

export const Spotlight: FC = () => {
  const [visible, setVisible] = useState(false);

  const handleKeyPress = () => setVisible(!visible);
  useKeyPress("k", handleKeyPress);

  // todo style spotlight (responsiveness
  // todo set input field
  // todo show results
  // todo keyboard navigation between results

  const handleKeyboardShortcuts: KeyboardEventHandler<HTMLInputElement> =
    useCallback((event) => {
      switch (event.key) {
        // todo cases arrow keys for selection
        case "Escape":
          setVisible(false);
          event.preventDefault();
          break;
      }
    }, []);

  const handleSearch: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      // todo perform or clear search
      console.log("perform or clear search", event);
    },
    []
  );

  if (!visible) {
    return null;
  }

  return (
    <>
      <StyledBackdrop onClick={() => setVisible(false)} />
      <StyledSpotlight>
        <Input onKeyDown={handleKeyboardShortcuts} onKeyUp={handleSearch} />
      </StyledSpotlight>
    </>
  );
};
