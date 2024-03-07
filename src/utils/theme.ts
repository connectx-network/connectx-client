import { MantineColorsTuple, createTheme } from "@mantine/core";

const primary: MantineColorsTuple = [
  "#f3f3f6",
  "#e4e4e6",
  "#c7c7cd",
  "#a8a7b6",
  "#8d8ca1",
  "#7c7a95",
  "#74728f",
  "#63617d",
  "#575570",
  "#4b4964",
  "#37364a",
];

const dark: MantineColorsTuple = [
  "#ffffff",
  "#e4e4e6",
  "#c7c7cd",
  "#a8a7b6",
  "#2e2e2e",
  "#7c7a95",
  "#2e2e2e",
  "#1F1212",
  "#575570",
  "#4b4964",
  "#37364a",
];

export const theme = createTheme({
  fontFamily: "Lexend, sans-serif",
  colors: {
    primary,
    dark
  },
});
