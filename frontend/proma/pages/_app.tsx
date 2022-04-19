/* eslint-disable */
import type { AppProps } from "next/app";
import React, { useState } from "react";
import wrapper from "../store/configureStore";
import {
  createGlobalStyle,
  ThemeProvider,
  DefaultTheme,
} from "styled-components";
import NavBar from "../components/common/NavBar";
import SideBar from "../components/common/SideBar";
import EpicPage from "../components/epic/EpicPage";

const GlobalStyle = createGlobalStyle`
      body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
    `;

const darkTheme: DefaultTheme = {
  bgColor: "black",
  textColor: "white",
};

const lightTheme: DefaultTheme = {
  bgColor: "white",
  textColor: "black",
};

function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(true);
  const onToggleDarkMode = () => setDarkMode((cur) => !cur);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <NavBar />
        <div id='container'>
          <div id="aside" style={{ height: "100%", float: "left", marginRight: "1%"}}>
            <SideBar />
          </div>
          <div id="section" style={{width: "100%"}}>
            <button onClick={onToggleDarkMode}>
              {darkMode ? "dark" : "light"}
            </button>
            <EpicPage></EpicPage>
          </div>
        </div>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
