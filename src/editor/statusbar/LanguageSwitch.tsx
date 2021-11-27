import { ChangeEvent, FC, useState } from "react";
import { EditorView } from "@codemirror/view";
import {
  languageConf,
  languageExtensions,
  supportedLanguages,
} from "../setup/language";

export const LanguageSwitch: FC<{ view: EditorView }> = ({ view }) => {
  const [lang, setLang] = useState(languageExtensions[0].name);

  const onChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLangName = event.target.value;
    const nextLang = languageExtensions.find(
      (item) => item.name === nextLangName
    );
    if (!nextLang) return;

    view.dispatch({
      effects: languageConf.reconfigure(await nextLang.load()),
    });
    setLang(nextLangName);
  };

  return (
    <select
      value={lang}
      onChange={onChange}
      className="language-switch"
      aria-label="Select language mode"
    >
      {supportedLanguages.map((optionName) => (
        <option key={optionName} value={optionName}>
          {optionName}
        </option>
      ))}
    </select>
  );
};
