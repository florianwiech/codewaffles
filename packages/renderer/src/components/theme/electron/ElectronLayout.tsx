import { FC, ReactNode, useEffect } from "react";
import { useBehaviorSubject } from "../../../shared/hooks/useBehaviorSubject";
import { Layout } from "../index";
import { getColorSchemeChange, electronTheme$ } from "./appearance";

type Props = {
  children?: ReactNode;
};

export const ElectronLayout: FC<Props> = ({ children }) => {
  const theme = useBehaviorSubject(electronTheme$);

  useEffect(() => {
    const subscription = getColorSchemeChange().subscribe((next) => electronTheme$.next(next));
    return () => subscription.unsubscribe();
  }, []);

  return <Layout theme={theme}>{children}</Layout>;
};
