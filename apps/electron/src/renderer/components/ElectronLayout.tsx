import { FC, useEffect } from "react";
import { Layout } from "@codewaffle/components";
import { useObservable } from "@codewaffle/utils";
import { getColorSchemeChange, theme$ } from "../appearance";

export const ElectronLayout: FC = ({ children }) => {
  const theme = useObservable(theme$);

  useEffect(() => {
    const subscription = getColorSchemeChange().subscribe((next) => theme$.next(next));
    return () => subscription.unsubscribe();
  }, []);

  return <Layout theme={theme}>{children}</Layout>;
};
