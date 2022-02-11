import { FC } from "react";
import "./header.css";

export const MacOsTitleBar: FC<{ title: string }> = ({ title }) => {
  const { platform, onTitleBarClick } = window.api;

  if (platform !== "darwin") return null;

  let className = "chrome drag";

  return (
    <div className={className} onDoubleClick={() => onTitleBarClick()}>
      <small>{title}</small>
    </div>
  );
};
