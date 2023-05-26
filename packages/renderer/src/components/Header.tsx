import { FC } from "react";
// import { ReactComponent as SearchIcon } from "bootstrap-icons/icons/search.svg";
// import { ReactComponent as ComandIcon } from "bootstrap-icons/icons/command.svg";
// import { ReactComponent as SearchIcon } from "../assets/magnifyingglass.svg";
// import { ReactComponent as ComandIcon } from "../assets/command.svg";
// import { ReactComponent as MenuIcon } from "../assets/menu.svg";
import { SearchIcon } from "lucide-react";

type Props = {
  onMenuSelect?: () => Promise<void> | void;
  onSearch?: () => Promise<void> | void;
  onCommand?: () => Promise<void> | void;
};

export const Header: FC<Props> = (props) => {
  const { onMenuSelect, onSearch, onCommand } = props;

  return (
    <div className="drag flex h-11 items-center justify-between border-b dark:border-black dark:bg-neutral-800">
      <div className="flex items-center">
        {/*<button*/}
        {/*  onClick={onMenuSelect}*/}
        {/*  className="no-drag ml-28 flex flex h-fit items-center rounded-lg p-1.5 hover:bg-neutral-700"*/}
        {/*>*/}
        {/*  <MenuIcon className="h-5 w-5 stroke-[1.75px] dark:text-neutral-300" />*/}
        {/*</button>*/}
        <h2 className="ml-[80px] max-w-[175px] truncate font-light text-neutral-300">
          New Document*New Document*New Document*New Document*New Document*New Document*New Document*New Document*New
          Document*New Document*New Document*New Document*New Document*New Document*New Document*New Document*New
          Document*
        </h2>
      </div>
      <div className="mr-2 flex flex-row-reverse items-center">
        {/*<button*/}
        {/*  onClick={onCommand}*/}
        {/*  className="no-drag ml-1 rounded-lg p-1.5 hover:bg-neutral-700 dark:text-neutral-300"*/}
        {/*>*/}
        {/*  <ComandIcon className="h-5 w-5 stroke-[1.75px]" />*/}
        {/*</button>*/}
        <button onClick={onSearch} className="no-drag ml-1 rounded-lg p-1.5 hover:bg-neutral-700 dark:text-neutral-300">
          <SearchIcon className="h-5 w-5" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
};
