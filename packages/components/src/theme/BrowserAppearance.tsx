import React, { FC, useEffect } from "react";
import { useObservable } from "../shared/hooks/useObservable";
import { theme$ } from "../appearance";
import { getAppearanceChanges, useBrowserAppearanceListener, useBrowserCrossTabSync } from "../appearance";
import { Layout } from "./Layout";

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
