import React, { FC, useState } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Header from "./components/Header";
import { HeaderActiveItem } from "./types";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Container, makeStyles, Theme } from "@material-ui/core";
import "./App.css";
import SetGrid from "./components/SetGrid";
import CardGrid from "./components/CardGrid";
import PkmnDetail from "./components/PkmnDetail";
import Login from "./pages/login";
import Wishlist from "./pages/wishlist";
import Sets from "./pages/sets";
import { useLoggedInUser } from "./utils/firebase";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#374761"
    },
    secondary: {
      main: "#2A364A"
    },
    text: {
      primary: "#FFF",
      secondary: "#374761"
    },
    divider: "#2A364A",
    background: {
      default: "#374761"
    },
    action: {
      hover: "#212D42"
    }
  },
  typography: {
    h1: {
      fontSize: "2rem"
    },
    button: {
      fontWeight: 400,
      lineHeight: 1,
      textTransform: "none"
    }
  }
});

const App: FC = () => {
  const [headerActiveItem, setHeaderActiveItem] = useState<HeaderActiveItem>(HeaderActiveItem.Set);
  const isLoggedIn = useLoggedInUser();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Redirect to={isLoggedIn ? "/sets" : "/"} />

        <Header active={headerActiveItem} />

        <main className="App">
          <Container>
            <Switch>
              <Route
                path="/"
                exact
                render={() => {
                  return <Login />;
                }}
              />
              <Route
                path="/my-cards"
                render={() => {
                  setHeaderActiveItem(HeaderActiveItem.MyCards);
                  return null;
                }}
              />
              <Route
                path="/wishlist"
                render={() => {
                  setHeaderActiveItem(HeaderActiveItem.Wishlist);
                  return <Wishlist />;
                }}
              />
              <Route
                path="/sets"
                exact
                render={() => {
                  setHeaderActiveItem(HeaderActiveItem.Set);
                  return <SetGrid />;
                }}
              />
              <Route path="/sets/:setCode" render={({ match }) => <CardGrid setCode={match.params.setCode} />} />
              <Route path="/:cardId" render={({ match }) => <PkmnDetail id={match.params.cardId}></PkmnDetail>} />
              {<>{/* <Route component={Notfound} /> */}</>}
            </Switch>
          </Container>
        </main>
      </Router>
    </ThemeProvider>
  );
};

export default App;
