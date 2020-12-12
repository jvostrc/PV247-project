import React, { FC, useState } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Header from "./components/Header";
import { HeaderActiveItem } from "./types";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

import "./App.css";
import Login from "./pages/login";
import Wishlist from "./pages/wishlist";

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
          <Container maxWidth="md">
            <Switch>
              <Route path="/" component={Login} />
              <Route path='/wishlist' exact component={Wishlist} />
              {  
              <>{/* <Route path="/" exact component={Sets} />
                  <Route path="/my-cards" component={MyCards} />
                  <Route path="/wishlist" component={Wishlist} />
                  <Route component={Notfound} /> */}</>}
            </Switch>
          </Container>
        </main>
      </Router>
    </ThemeProvider>
  );
};

export default App;
