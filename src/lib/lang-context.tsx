"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "en" | "pt";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  ready: boolean;
};

const LangCtx = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  toggle: () => {},
  ready: false,
});

const STORAGE_KEY = "portfolio-lang";

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    const next = saved === "pt" || saved === "en" ? saved : "en";
    setLangState(next);
    document.documentElement.lang = next === "pt" ? "pt-BR" : "en";
    setReady(true);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
    document.documentElement.lang = l === "pt" ? "pt-BR" : "en";
  };

  const toggle = () => setLang(lang === "en" ? "pt" : "en");

  return (
    <LangCtx.Provider value={{ lang, setLang, toggle, ready }}>
      {children}
    </LangCtx.Provider>
  );
}

export function useLang() {
  return useContext(LangCtx);
}
