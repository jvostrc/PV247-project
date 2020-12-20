import React, { FC, useEffect, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardContent, Grid, Typography } from "@material-ui/core";
import { IPkmnSet, Screen } from "../types";
import useDb from "../hooks/useDb";
import firebase from "firebase/app";
import { showError } from "../App";
import pokeball from "../icons/filled-pokeball.svg";
import star from "../icons/filled-star.svg";

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    marginRight: "5%",
    marginBottom: "10%",
    marginLeft: "5%",
    padding: "2%",
    textAlign: "center"
  },
  logoContainer: {
    margin: 5
  },
  logo: {
    maxWidth: 220,
    maxHeight: 110,
    minHeight: 110,
    minWidth: 220,
    objectFit: "contain"
  },
  symbol: {
    maxWidth: 50,
    maxHeight: 25
  },
  link: {
    textDecoration: "none"
  },
  marginRight: {
    marginRight: theme.spacing(1)
  }
}));

type SetProps = {
  set: IPkmnSet;
  user: firebase.User | null | undefined;
  screen: Screen;
};

const Set: FC<SetProps> = ({ set, user, screen }) => {
  const [number, setNumber] = useState<number>();

  const classes = useStyles();
  const { myCardsCollection, wishlistCollection } = useDb(user);

  useEffect(() => {
    if (screen !== "sets") {
      (screen === "wishlist" ? wishlistCollection : myCardsCollection)
        .doc(set.code)
        .collection("cards")
        .get()
        .then(response => setNumber(response.docs.length))
        .catch(error => {
          return showError(error);
        });
    }
  }, []);

  return (
    <Link className={classes.link} to={`/${screen}/${set.code}`}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <div className={classes.logoContainer}>
              <img src={set.logoUrl} className={classes.logo} alt={set.name} height="110px" />
            </div>
            <img src={set.symbolUrl} className={classes.symbol} alt="" height="25px" />
            <Typography color="secondary" gutterBottom variant="subtitle1">
              <b>{set.name}</b>
            </Typography>
            <Grid container direction="row" justify="center" alignItems="center">
              {screen === "sets" ? (
                <Typography color="secondary" gutterBottom variant="subtitle1">
                  Contains {set.totalCards} cards
                </Typography>
              ) : screen === "my-cards" ? (
                <>
                  <img src={pokeball} alt="logo" width="20px" className={classes.marginRight} />
                  <Typography color="secondary" variant="subtitle1">
                    {number}/{set.totalCards}
                  </Typography>
                </>
              ) : (
                <>
                  <img src={star} alt="logo" width="20px" className={classes.marginRight} />
                  <Typography color="secondary" variant="subtitle1">
                    {number}/{set.totalCards}
                  </Typography>
                </>
              )}
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default Set;
