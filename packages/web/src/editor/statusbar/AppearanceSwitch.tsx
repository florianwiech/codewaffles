import { ChangeEvent, FC } from "react";
import { appearance$, AppearanceState, changeAppearance } from "@codewaffle/components";
import { useObservable } from "../../shared/hooks/useObservable";

export const AppearanceSwitch: FC = () => {
  const appearance = useObservable(appearance$);

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLangName = event.target.value;

    changeAppearance(nextLangName as AppearanceState);
  };

  return (
    <select value={appearance} onChange={onChange} className="appearance-switch" aria-label="Select appearance">
      <option value={AppearanceState.SYSTEM}>system</option>
      <option value={AppearanceState.DARK}>dark</option>
      <option value={AppearanceState.LIGHT}>light</option>
    </select>
  );
};
