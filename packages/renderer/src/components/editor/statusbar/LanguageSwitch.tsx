import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { EditorView } from "@codemirror/view";
import { languageConf, languageExtensions } from "../setup/language";

export const LanguageSwitch: FC<{ view: EditorView }> = ({ view }) => {
  const [lang, setLang] = useState(languageExtensions[0].name);
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    window.main?.getActiveLanguages().then(setLanguages);
    window.main?.onLanguageActivation((event, activeLanguages) => setLanguages(activeLanguages));
  }, []);

  const onChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLangName = event.target.value;
    const nextLang = languageExtensions.find((item) => item.name === nextLangName);
    if (!nextLang) return;

    view.dispatch({
      effects: languageConf.reconfigure(await nextLang.load()),
    });
    setLang(nextLangName);
  };

  return (
    <select value={lang} onChange={onChange} className="language-switch" aria-label="Select language mode">
      {languages.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
