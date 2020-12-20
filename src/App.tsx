import React, { FC, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Header from "./components/Header";
import { HeaderActiveItem } from "./types";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import "./App.css";
import SetGrid from "./components/SetGrid";
import CardGrid from "./components/CardGrid";
import PkmnDetail from "./components/PkmnDetail";
import Login from "./pages/login";
import Wishlist from "./pages/wishlist";
import { useLoggedInUser } from "./utils/firebase";
import MyCards from "./pages/myCards";
import ErrorMessage from "./components/ErrorMessage";

const theme = createMuiTheme({
  mixins: {
    toolbar: {
      minHeight: 66
    }
  },
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
    },
    error: {
      main: "#f44336",
      light: "#FDEAEA"
    }
  },
  typography: {
    h1: {
      fontSize: "2rem"
    },
    h2: {
      fontSize: "1.8rem"
    },
    button: {
      fontWeight: 400,
      lineHeight: 1,
      textTransform: "none"
    }
  }
});

export const showError = (message: string) => {
  ReactDOM.render(<ErrorMessage message={message} onClose={deleteError} />, document.getElementById("error-message-wrapper"));
};

export const deleteError = () => {
  return document.getElementById("error-message-wrapper")?.removeChild(document.getElementById("error-message")!);
};

const App: FC = () => {
  const [headerActiveItem, setHeaderActiveItem] = useState<HeaderActiveItem>(HeaderActiveItem.Set);
  const isLoggedIn = useLoggedInUser();
  const user = useLoggedInUser();

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
                exact
                render={() => {
                  setHeaderActiveItem(HeaderActiveItem.MyCards);
                  return <MyCards user={user} />;
                }}
              />
              <Route
                path="/wishlist"
                exact
                render={() => {
                  setHeaderActiveItem(HeaderActiveItem.Wishlist);
                  return <Wishlist user={user} />;
                }}
              />
              <Route
                path="/sets"
                exact
                render={() => {
                  setHeaderActiveItem(HeaderActiveItem.Set);
                  return <SetGrid user={user} screen="sets" />;
                }}
              />
              <Route path="/sets/:setCode" render={({ match }) => <CardGrid setCode={match.params.setCode} user={user} />} />
              <Route path="/my-cards/:setCode" render={({ match }) => <CardGrid setCode={match.params.setCode} user={user} />} />
              <Route path="/wishlist/:setCode" render={({ match }) => <CardGrid setCode={match.params.setCode} user={user} />} />
              <Route path="/cardDetail/:cardId" render={({ match }) => <PkmnDetail id={match.params.cardId} user={user}></PkmnDetail>} />
            </Switch>
          </Container>
          <div id="error-message-wrapper"></div>
        </main>
      </Router>
    </ThemeProvider>
  );
};

export default App;
