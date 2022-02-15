import React, { FC, useEffect } from "react";
import { Layout } from "@codewaffle/components";
import { useObservable } from "./shared/hooks/useObservable";
import { getAppearanceChanges, theme$, useBrowserAppearanceListener, useBrowserCrossTabSync } from "./appearance";

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
