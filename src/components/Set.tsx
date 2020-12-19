import React, { FC, useEffect, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardContent, Typography } from "@material-ui/core";
import { IPkmnSet } from "../types";
import useDb from "../pages/sets";
import firebase from 'firebase/app';

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
  }
}));

type SetProps = {
  set: IPkmnSet;
  user: firebase.User | null | undefined;
};

const Set: FC<SetProps> = ({ set, user }) => {

  const [collected, setCollected] = useState<number>(); 

  const classes = useStyles();
  const { myCardsCollection } = useDb(user);

  useEffect(() => {
    myCardsCollection.doc(set.name).collection("cards")
      .get()
      .then(response => setCollected(response.docs.length))
      .catch(err => console.log(err.message));
  }, []);

  return (
    <Link className={classes.link} to={`/sets/${set.code}`}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <div className={classes.logoContainer}>
              <img src={set.logoUrl} className={classes.logo} alt={set.name} height="110px" />
            </div>
            <img src={set.symbolUrl} className={classes.symbol} alt="" height="25px" />
            <Typography color="secondary" gutterBottom component="h1" variant="subtitle1">
              <b>{set.name}</b>
            </Typography>
            <Typography color="secondary" gutterBottom component="h2" variant="subtitle1">
              {collected}/{set.totalCards}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default Set;
