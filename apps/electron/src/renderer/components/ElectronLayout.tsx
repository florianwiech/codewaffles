import { FC, useEffect } from "react";
import { Layout } from "@codewaffle/components";
import { getColorSchemeChange, theme$ } from "../appearance";
import { useObservable } from "./useObservable";

export const ElectronLayout: FC = ({ children }) => {
  const theme = useObservable(theme$);

  useEffect(() => {
    const subscription = getColorSchemeChange().subscribe((next) => theme$.next(next));
    return () => subscription.unsubscribe();
  }, []);

  return <Layout theme={theme}>{children}</Layout>;
};
