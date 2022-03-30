import { FC, useEffect } from "react";
import { useBehaviorSubject } from "../../../shared/hooks/useBehaviorSubject";
import { Layout } from "../index";
import { getColorSchemeChange, electronTheme$ } from "./appearance";

export const ElectronLayout: FC = ({ children }) => {
  const theme = useBehaviorSubject(electronTheme$);

  useEffect(() => {
    const subscription = getColorSchemeChange().subscribe((next) => electronTheme$.next(next));
    return () => subscription.unsubscribe();
  }, []);

  return <Layout theme={theme}>{children}</Layout>;
};
