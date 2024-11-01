import { createContext, useState, useMemo, useEffect } from "react";

// next
import { useServerInsertedHTML } from "next/navigation";

// emotion
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// stylis
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

// mui
import { createTheme, ThemeProvider } from "@mui/material/styles";

import getDesignTokens from "theme/theme";

// dark mode context
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

// rtl ltr context
export const RtlLtrContext = createContext({ toggleRtlLtr: () => {} });

export default function RootStyleRegistry({ children }) {
  const [isClient, setIsClient] = useState(false);
  // dark mode states
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  // rtl ltr states
  const [directionRtlLtr, setDirectionRtlLtr] = useState("rtl");
  const rtlLtrMode = useMemo(
    () => ({
      toggleRtlLtr: (direction) => {
        setDirectionRtlLtr(direction);
      },
    }),
    []
  );
  // const [cache] = useState(() => {
  //   const cachee = createCache({ key: 'css' })
  //   cachee.compat = true
  //   return cachee
  // })
  const [cacheRtl] = useState(() => {
    const cache = createCache({
      key: "muirtl",
      stylisPlugins: [prefixer, rtlPlugin],
    });
    cache.compat = true;
    return cache;
  });
  // const [cacheLtr] = useState(() => {
  //   const cache = createCache({
  //     key: 'muiltr',
  //     // stylisPlugins: [prefixer, rtlPlugin],
  //   })
  //   cache.compat = true
  //   return cache
  // })

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && localStorage.getItem("colorMode")) {
      if (localStorage.getItem("colorMode") === "light") {
        setMode("light");
      } else if (localStorage.getItem("colorMode") === "dark") {
        setMode("dark");
      }
    }
  }, [isClient]);

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cacheRtl.key} ${Object.keys(cacheRtl.inserted).join(
        " "
      )}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cacheRtl.inserted).join(" "),
      }}
    />
  ));

  const customTheme = useMemo(
    () =>
      // createTheme(theme, {
      //   palette: {
      //     mode,
      //   },
      // }),
      createTheme(getDesignTokens(mode, directionRtlLtr)),
    [mode, directionRtlLtr]
  );

  return (
    <CacheProvider value={cacheRtl}>
      <RtlLtrContext.Provider value={rtlLtrMode}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={customTheme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
      </RtlLtrContext.Provider>
    </CacheProvider>
  );
}
