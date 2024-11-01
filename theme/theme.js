// import { Roboto } from 'next/font/google'

// mui
// import { createTheme } from '@mui/material/styles'

// export const roboto = Roboto({
//   weight: ['300', '400', '500', '700'],
//   subsets: ['latin'],
//   display: 'swap',
//   fallback: ['Helvetica', 'Arial', 'sans-serif'],
// })

// Create a theme instance.
// const theme = createTheme({
//   //
// })

const getDesignTokens = (mode) => ({
  direction: "rtl",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1376,
      "2xl": 1688, // 1640 + (2 * 24)
      // '2xl': 1888, // 1840 + (2 * 24)
    },
  },
  typography: {
    fontFamily: ["IRANSans !important", "roboto"].join(","),
    htmlFontSize: 16,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: "30px",
      fontWeight: 700,
      lineHeight: 1.56,
      letterSpacing: "0",
    },
    h2: {
      fontSize: "30px",
      fontWeight: 700,
      lineHeight: 1.56,
      letterSpacing: "0",
    },
    h6: {
      fontSize: "22px:",
      fontWeight: 500,
      lineHeight: 1.56,
      letterSpacing: "0",
    },
    // h3, // 48px
    // h4, // 34px
    // h5, // 24px
    // h6, // 20px
    // subtitle1, // 16px
    // subtitle2, // 14px
    title: {
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "25.04px",
      letterSpacing: 0,
    },
    bigTitle: {
      fontSize: "20px",
      fontWeight: 500,
      lineHeight: "25.04px",
      letterSpacing: 0,
    },
    footer: {
      fontSize: "16px",
      fontWeight: 300,
      lineHeight: "25.04pxp",
      letterSpacing: 0,
    },
    body1: {
      fontSize: "14px",
      fontWeight: 300,
      lineHeight: "25.04px",
      letterSpacing: 0,
    },
    body2: {
      fontSize: "16px",
      fontWeight: 700,
      lineHeight: "25.04px",
      letterSpacing: 0,
    },
    body3: {
      fontSize: "18px",
      fontWeight: 300,
      lineHeight: "25.04px",
      letterSpacing: 0,
    },
    // button, // 16px
    // caption, // 12px
    // overline, // 12px
    // inherit,
    h35: {
      fontSize: "40px",
      fontWeight: 400,
      lineHeight: "60px",
      letterSpacing: 0,
      // // since createTheme is in another file, use media query for responsive typography an not breakpoint
      // '@media (max-width:599px)': {
      //   fontSize: '20px',
      //   lineHeight: 1.6,
      // },
      // // [theme.breakpoints.up('md')]: {
      // //   fontSize: '2.4rem',
      // // },
    },
  },
  palette: {
    body: {
      secondary: "rgba(38, 38, 38, 1)",
    },
    mode,
    // common: {
    //   white: '#fff',
    //   black: '#000',
    // },
    // text: {
    //   secondary: 'rgba(38, 38, 38, 1)',
    // },
    // background: {
    //   paper: '#fff',
    //   default: '#fff',
    // },
    ...(mode === "light"
      ? {
          backgroundCustom: {
            default: "#F3F8FF",
            header: "#FFFFFF",
            homeProducts: "#EAF0F9",
          },
        }
      : {
          backgroundCustom: {
            default: "#121212",
            header: "#000000",
            homeProducts: "#424242",
          },
        }),
    ...(mode === "light"
      ? {
          grey: {
            50: "#fafafa",
            100: "#f5f5f5",
            200: "#eeeeee",
            300: "#e0e0e0",
            400: "#bdbdbd",
            500: "#9e9e9e",
            600: "#757575",
            700: "#616161",
            800: "#424242",
            900: "#212121",
            A100: "#f5f5f5",
            A200: "#eeeeee",
            A400: "#bdbdbd",
            A700: "#616161",
          },
        }
      : {
          grey: {
            50: "#212121",
            100: "#424242",
            200: "#616161",
            300: "#757575",
            400: "#9e9e9e",
            500: "#bdbdbd",
            600: "#e0e0e0",
            700: "#eeeeee",
            800: "#f5f5f5",
            900: "#fafafa",
            A100: "#616161",
            A200: "#bdbdbd",
            A400: "#eeeeee",
            A700: "#f5f5f5",
          },
        }),
    primary: {
      // light: '#d1f7ff',
      main: "rgba(38, 38, 38, 1)",
      // dark: '#005678',
      // contrastText: '#fff',
      // contrastText: 'rgba(0, 0, 0, 0.87)', // dark theme
    },
    secondary: {
      //   // light: '#d1f7ff',
      main: "rgba(38, 38, 38, 1)",
      //   // dark: '#005678',
    },
    tertiary: {
      // light: '#d1f7ff',
      main: "rgba(172, 84, 91, 1)",
      // dark: '#005678',
    },
    // error: {},
    // warning: {},
    // info: {},
    // success: {},
    // divider: {},
    // action: {},
  },
  // shadows: [],
  // transitions: {},
  // zIndex: {
  //   mobileStepper: 1000,
  //   fab: 1050,
  //   speedDial: 1050,
  //   appBar: 1100,
  //   drawer: 1200,
  //   modal: 1300,
  //   snackbar: 1400,
  //   tooltip: 1500,
  // },
});

export default getDesignTokens;
