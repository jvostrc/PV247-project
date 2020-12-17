import React, { FC, useState } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Header from "./components/Header";
import { HeaderActiveItem } from "./types";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Card, Container, makeStyles, Theme } from "@material-ui/core";

import "./App.css";
import SetGrid from "./components/SetGrid";
import CardGrid from "./components/CardGrid";

// TODO: finish theme
const theme = createMuiTheme({});

const App: FC = () => {
  const [headerActiveItem, setHeaderActiveItem] = useState<HeaderActiveItem>(HeaderActiveItem.Set);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Redirect to={isLoggedIn ? "/" : "/login/"} />

        <Header active={headerActiveItem} />

        <main className="App">
          <Container>
              <Switch>
                  <Route path="/" exact component={SetGrid} />
                  <Route path="/sets" render={() => <CardGrid setCode="base1"></CardGrid>}/>{
                  /*
                    <Route path="/my-cards" component={MyCards} />
                    <Route path="/wishlist" component={Wishlist} />
                    <Route path="/logout" component={Login} />
                    <Route component={Notfound} /> */}
              </Switch>
          </Container>
        </main>
      </Router>
    </ThemeProvider>
  );
};

export default App;
