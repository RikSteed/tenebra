import { createContext, useState } from "react";
import en from "../assets/i18n/en.json";
import it from "../assets/i18n/it.json";
import jp from "../assets/i18n/jp.json";
import fr from "../assets/i18n/fr.json";

const languagesTranslation = {
  en,
  it,
  jp,
  fr,
};

export const StoreContext = createContext({
  user: undefined,
  addUser: () => {},
  I18N: en,
  changeI18N: () => {},
});

const StoreProvider = ({ children }) => {
  const [I18N, setI18N] = useState(languagesTranslation[sessionStorage.getItem("language")] || en);

  const [user, setUser] = useState(undefined);

  const addUser = (user) => {
    setUser(user);
  };

  const changeI18N = (language) => {
    const selectedLanguage = languagesTranslation[language];
    setI18N(selectedLanguage);
    sessionStorage.setItem("language", language);
  };

  return <StoreContext.Provider value={{ user, addUser, I18N, changeI18N }}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
