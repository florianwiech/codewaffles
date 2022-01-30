import React, { FC, useEffect } from "react";
import { useObservable } from "../shared/hooks/useObservable";
import { Layout } from "../theme";
import { theme$ } from "./appearance-subjects";
import { getAppearanceChanges, useBrowserAppearanceListener, useBrowserCrossTabSync } from "./observables";

export const BrowserAppearance: FC = ({ children }) => {
  const theme = useObservable(theme$);

  useEffect(() => {
    const sub = getAppearanceChanges().subscribe();
    return () => sub.unsubscribe();
  }, []);

  useBrowserAppearanceListener();
  useBrowserCrossTabSync();

  return <Layout theme={theme}>{children}</Layout>;
};
