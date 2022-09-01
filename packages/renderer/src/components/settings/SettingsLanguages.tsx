import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { supportedLanguages } from "../../../../shared/languages";

const StyledLanguagePage = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: calc(100% - 97px);
  box-sizing: border-box;

  padding: 10px 20px 20px 20px;

  h2 {
    margin: 0;
  }
`;

const StyledLanguageList = styled.ul`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  border: 1px solid ${({ theme }) => theme.border.default};

  overflow-y: scroll;
  list-style-type: none;

  li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 20px 0 15px;

    &:nth-child(even) {
      background: ${({ theme }) => theme.neutral.subtle};
    }
  }
`;

export const SettingsLanguages: FC = () => {
  const [languages] = useState(supportedLanguages);
  const [activeLanguages, setActiveLanguages] = useState<string[]>([]);

  useEffect(() => {
    window.settings?.getActiveLanguages().then(setActiveLanguages);
  }, []);

  const onLanguageChange = (lang: string) => window.settings?.toggleLanguage(lang).then(setActiveLanguages);

  return (
    <StyledLanguagePage>
      <h2>Languages</h2>
      <StyledLanguageList>
        {languages.map((lang) => (
          <li key={lang}>
            <span>{lang}</span>
            <input
              type="checkbox"
              checked={activeLanguages.includes(lang)}
              onChange={() => onLanguageChange(lang)}
              aria-label={activeLanguages.includes(lang) ? `Activate ${lang} language` : `Deactivate ${lang} language`}
            />
          </li>
        ))}
      </StyledLanguageList>
    </StyledLanguagePage>
  );
};
