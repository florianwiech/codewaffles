import { FC, useEffect } from "react";
import { getColorSchemeChange, theme$ } from "../appearance";
import { useBehaviorSubject } from "../shared/hooks/useBehaviorSubject";
import { Layout } from "./theme";

export const ElectronLayout: FC = ({ children }) => {
  const theme = useBehaviorSubject(theme$);

  useEffect(() => {
    const subscription = getColorSchemeChange().subscribe((next) => theme$.next(next));
    return () => subscription.unsubscribe();
  }, []);

  return <Layout theme={theme}>{children}</Layout>;
};
