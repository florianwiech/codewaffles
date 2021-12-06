import { ChangeEvent, FC } from "react";
import { useObservable } from "../../shared/hooks/useObservable";
import {
  appearance$,
  AppearanceState,
  changeAppearance,
} from "../../ui/appearance";

export const AppearanceSwitch: FC = () => {
  const appearance = useObservable(appearance$);

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLangName = event.target.value;

    changeAppearance(nextLangName as AppearanceState);
  };

  return (
    <select
      value={appearance}
      onChange={onChange}
      className="appearance-switch"
      aria-label="Select appearance"
    >
      <option value={AppearanceState.SYSTEM}>system</option>
      <option value={AppearanceState.DARK}>dark</option>
      <option value={AppearanceState.LIGHT}>light</option>
    </select>
  );
};
