import React from "react";
import PaginatedGifs from "./components/PaginatedGifs";
import { GlobalStyle } from "./styles/global";
import { Container } from "./styles/styledCommon";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <h1>Giphy Search</h1>
        <PaginatedGifs />
      </Container>
    </>
  );
};

export default App;
