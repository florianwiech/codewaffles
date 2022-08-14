import { FC, ReactNode, useEffect } from "react";
import { useBehaviorSubject } from "../../../shared/hooks/useBehaviorSubject";
import { Layout } from "../Layout";
import { changeAppearance, getColorSchemeChange, webTheme$ } from "./appearance";

type Props = {
  children?: ReactNode;
};
export const BrowserLayout: FC<Props> = ({ children }) => {
  const theme = useBehaviorSubject(webTheme$);

  useEffect(() => {
    const sub = getColorSchemeChange().subscribe(changeAppearance);
    return () => sub.unsubscribe();
  }, []);

  return <Layout theme={theme}>{children}</Layout>;
};
