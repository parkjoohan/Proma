/* eslint-disable */
import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import wrapper from "../store/configureStore";
import styled, {
  createGlobalStyle,
  ThemeProvider,
  DefaultTheme,
} from "styled-components";
import NavBar from "../components/common/NavBar";
import SideBar from "../components/common/SideBar";
import Footer from "../components/common/Footer";
import Head from "next/head";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import { ToastProvider } from "react-toast-notifications";

const GlobalStyle = createGlobalStyle`
      body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Akshar', sans-serif;
      }
    `;

const darkTheme: DefaultTheme = {
  bgColor: "#1b2134",
  textColor: "white",
};

const lightTheme: DefaultTheme = {
  bgColor: "white",
  textColor: "#1b2134",
};

const Container = styled.div`
  height: 100vh;
  position: relative;
`;

const MainComponent = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
`;

let sock = new SockJS("http://j6c103.p.ssafy.io:8081/ws-stomp");
let client = Stomp.over(sock);

function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(true);
  const onToggleDarkMode = () => setDarkMode((cur) => !cur);

  useEffect(() => {
    client.connect({}, () => {
      //   client.send(
      //     "http://j6c103.p.ssafy.io:8081/notification/send?userNo=U001"
      //   );
      // client.send(`/app/chat/${(메세지받을대상)user.id}`,{},JSON.stringify(res.data));
      client.subscribe("/queue/notification/U001", (res) => {
        const messagedto = JSON.parse(res.body);
        console.log(messagedto);
        alert(messagedto.message);
      });
    });
    // return () => client.disconnect();
  }, []);

  const timeOut = 2000;

  return (
    <>
      <Head>
        <title>PROMA</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <ToastProvider autoDismiss={true} autoDismissTimeout={timeOut}>
          <Container>
            <NavBar toggleDarkMode={onToggleDarkMode} darkMode={darkMode} />
            <MainComponent>
              <SideBar />
              <Component {...pageProps} />
            </MainComponent>
            <Footer />
          </Container>
        </ToastProvider>
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
