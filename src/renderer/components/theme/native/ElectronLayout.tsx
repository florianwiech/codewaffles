import { FC, useEffect } from "react";
import { useBehaviorSubject } from "../../../shared/hooks/useBehaviorSubject";
import { Layout } from "../index";
import { getColorSchemeChange, nativeTheme$ } from "./appearance";

export const ElectronLayout: FC = ({ children }) => {
  const theme = useBehaviorSubject(nativeTheme$);

  useEffect(() => {
    const subscription = getColorSchemeChange().subscribe((next) => nativeTheme$.next(next));
    return () => subscription.unsubscribe();
  }, []);

  return <Layout theme={theme}>{children}</Layout>;
};
