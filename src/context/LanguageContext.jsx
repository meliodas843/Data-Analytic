import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("dataview-language") || "mn";
  });

  useEffect(() => {
    localStorage.setItem("dataview-language", language);

    document.documentElement.lang =
      language === "mn" ? "mn" : "en";
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((current) =>
      current === "mn" ? "en" : "mn"
    );
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}