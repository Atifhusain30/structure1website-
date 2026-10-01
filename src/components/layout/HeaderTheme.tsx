'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const Ctx = createContext<{ dark: boolean; setDark: (v: boolean) => void }>({ dark: false, setDark: () => {} });

export function HeaderThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  return <Ctx.Provider value={{ dark, setDark }}>{children}</Ctx.Provider>;
}

export const useHeaderTheme = () => useContext(Ctx);

/** Render inside any page whose top section is a dark photo hero. */
export default function HeaderTheme({ dark }: { dark: boolean }) {
  const { setDark } = useHeaderTheme();
  useEffect(() => {
    setDark(dark);
    return () => setDark(false);
  }, [dark, setDark]);
  return null;
}
