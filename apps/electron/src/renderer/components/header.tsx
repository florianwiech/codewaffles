import { FC } from "react";
import "./header.css";

type Props = { title: string; platform: string; onTitleBarClick: () => void };

export const MacOsTitleBar: FC<Props> = ({ title, platform, onTitleBarClick }) => {
  if (platform !== "darwin") return null;

  return (
    <div className="chrome drag" onDoubleClick={() => onTitleBarClick()}>
      <small>{title}</small>
    </div>
  );
};
