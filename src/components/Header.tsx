import React, { FC, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { HeaderActiveItem } from "../types";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import SetsIcon from "../icons/sets.svg";
import CardsIcon from "../icons/cards.svg";
import WishlistIcon from "../icons/star.svg";
import LogoutIcon from "../icons/logout.svg";
import { logout, useLoggedInUser } from "../utils/firebase";

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    backgroundColor: theme.palette.secondary.main,
    boxShadow: "0px 7px 8px 0px rgba(0,0,0,0.4)"
  },
  link: {
    textDecoration: "none",
    height: "64px",
    borderBottom: "2px solid transparent",
    opacity: "70%",
    transition: "0.1s",
    "&:hover": {
      backgroundColor: theme.palette.action.hover
    },
    [theme.breakpoints.down("xs")]: {
      width: "25%"
    }
  },
  button: {
    height: "100%",
    width: "90px",
    color: theme.palette.text.primary,
    paddingTop: "35px",
    backgroundPosition: "center top 13px",
    backgroundRepeat: "no-repeat",
    "&:hover": {
      backgroundColor: theme.palette.action.hover
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  },
  active: { borderBottomColor: "#FFF", opacity: "100%" },
  sets: { backgroundImage: `url(${SetsIcon})` },
  myCards: { backgroundImage: `url(${CardsIcon})` },
  wishlist: { backgroundImage: `url(${WishlistIcon})` },
  logout: { backgroundImage: `url(${LogoutIcon})` },
  logoutLink: { marginLeft: "auto" }
}));

const Header: FC = () => {
  const classes = useStyles();
  const user = useLoggedInUser();
  const [headerActiveItem, setHeaderActiveItem] = useState<HeaderActiveItem>(HeaderActiveItem.Set);

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar>
        {user && (
          <>
            <Link to="/sets" className={`${classes.link} ${headerActiveItem === HeaderActiveItem.Set ? classes.active : ""}`}>
              <Button className={`${classes.button} ${classes.sets}`} onClick={() => setHeaderActiveItem(HeaderActiveItem.Set)}>Sets</Button>
            </Link>
            <Link to="/my-cards" className={`${classes.link} ${headerActiveItem === HeaderActiveItem.MyCards ? classes.active : ""}`}>
              <Button className={`${classes.button} ${classes.myCards}`} onClick={() => setHeaderActiveItem(HeaderActiveItem.MyCards)}>My Cards</Button>
            </Link>
            <Link to="/wishlist" className={`${classes.link} ${headerActiveItem === HeaderActiveItem.Wishlist ? classes.active : ""}`}>
              <Button className={`${classes.button} ${classes.wishlist}`} onClick={() => setHeaderActiveItem(HeaderActiveItem.Wishlist)}>Wishlist</Button>
            </Link>
            <Link to="/" className={`${classes.link} ${classes.logoutLink}`}>
              <Button className={`${classes.button} ${classes.logout}`} onClick={logout}>
                Logout
              </Button>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
