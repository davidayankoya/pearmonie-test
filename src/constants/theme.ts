import { extendTheme } from "@chakra-ui/react";
const REM_UNIT = '16'


const options = {
    fonts: {
        heading: 'var(--font-inter)',
        body: 'var(--font-inter)',
        italic: 'var(--font-playfair)',
    },
    fontSizes: {
        "2xs": `calc(10/${REM_UNIT} * 1rem)`,
        "xs": `calc(12/${REM_UNIT} * 1rem)`,
        "sm": `calc(14/${REM_UNIT} * 1rem)`,
        "md": `calc(16/${REM_UNIT} * 1rem)`,
        "lg": `calc(18/${REM_UNIT} * 1rem)`,
        "xl": `calc(22/${REM_UNIT} * 1rem)`,
        "2xl": `calc(26/${REM_UNIT} * 1rem)`,
        "3xl": `calc(34/${REM_UNIT} * 1rem)`,
    },
    fontWeights: {
        thin: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
    },
}
const lightColors = {
    text: {
        black: "#000000",
        dark: "#555555",
        grey: "#6A6969",
        light: "#B5B7C0",
        white: "#FFFFFF",
    },
    brand: {
        black: "#000000",
        dark: "#504E4E",
        grey: "#514949",
        white: "#FFFFFF",
        offWhite: "#F4F4F4",
        eggWhite: "#eggWhite",
        primary: '#1E2772',
        primaryGrade: 'linear-gradient(#892063, #DA2A42)',
        greenGrade: 'linear-gradient(#D3FFE7, #EFFFF6)',
        purpleGrade: 'linear-gradient(135deg, #EAABF0, #4623E9)',
        secondary: '#5932EA',
        active: '#DA2A42',
        active50: '#FCF8F9',
        active100: '#FEF2F7',
        highlight: '#4299e199',
        shadow: "#DED8D8",
        border: "#C2C2C2",
        hover: "rgba(0,0,0,0.06)",
        crimson: '#BF1010',
        green: '#00AC4F',
        purple: '#4925E9',
    }
}
const darkColors: typeof lightColors = {
    text: {
        black: "#FFFFFF",
        dark: "#555555",
        grey: "#6A6969",
        light: "#B5B7C0",
        white: "#000000",
    },
    brand: {
        black: "#FFFFFF",
        dark: "#504E4E",
        grey: "#514949",
        white: "#000000",
        offWhite: "#F4F4F4",
        eggWhite: "#eggWhite",
        primary: '#1E2772',
        primaryGrade: 'linear-gradient(#892063, #DA2A42)',
        greenGrade: 'linear-gradient(#D3FFE7, #EFFFF6)',
        purpleGrade: 'linear-gradient(135deg, #EAABF0, #4623E9)',
        secondary: '#5932EA',
        active: '#DA2A42',
        active50: '#FCF8F9',
        active100: '#FEF2F7',
        highlight: '#4299e199',
        shadow: "#DED8D8",
        border: "#C2C2C2",
        hover: "rgba(0,0,0,0.06)",
        crimson: '#DA2A42',
        green: '#00AC4F',
        purple: '#4925E9',
    }
}
export enum TextColor {
    black = "text.black",
    dark = "text.dark",
    grey = "text.grey",
    light = "text.light",
    white = "text.white",
}
export enum BrandColor {
    black = "brand.black",
    dark = "brand.dark",
    grey = "brand.grey",
    white = "brand.white",
    offWhite = "brand.offWhite",
    eggWhite = "brand.eggWhite",
    primary = "brand.primary",
    primaryGrade = "brand.primaryGrade",
    greenGrade = "brand.greenGrade",
    purpleGrade = "brand.purpleGrade",
    secondary = "brand.secondary",
    active = "brand.active",
    active50 = "brand.active50",
    active100 = "brand.active100",
    highlight = "brand.highlight",
    shadow = "brand.shadow",
    border = "brand.border",
    hover = "brand.hover",
    crimson = "brand.crimson",
    green = "brand.green",
    purple = "brand.purple",
}


const lightTheme = extendTheme({
    ...options,
    colors: lightColors,
    config: {
        initialColorMode: 'system',
        useSystemColorMode: false
    }
})
const darkTheme = extendTheme({
    ...options,
    colors: darkColors,
    config: {
        initialColorMode: 'system',
        useSystemColorMode: false
    }
})
export const theme = { 
    'light': lightTheme,
    'dark': darkTheme,
}