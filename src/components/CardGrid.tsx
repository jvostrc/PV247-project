import { Card, CardContent, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import React, { FC, useCallback, useEffect, useState } from "react";
import { DbCard, IPkmnCard, Screen } from "../types";
import PkmnCard from "./PkmnCard";
import TitleRow from "./TitleRow";
import useSearchCard from "../hooks/useSearchCard";
import useSearchDb from "../hooks/useSearchDb";
import firebase from "firebase/app";
import useDb from "../hooks/useDb";
import { showError } from "../App";
import pokeball from "../icons/filled-pokeball.svg";
import { Link } from "react-router-dom";

// Fetches the set cards
const getSetCards = async (setCode: string): Promise<IPkmnCard[]> => {
  const response = await fetch(`https://api.pokemontcg.io/v1/cards?setCode=${setCode}`);
  const cards = await response.json();
  return cards;
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    minHeight: "calc(100vh - 156px)",
    [theme.breakpoints.only("xs")]: {
      minHeight: "calc(100vh - 214px)"
    }
  },
  center: {
    margin: "auto"
  },
  marginClass: {
    margin: 20
  }
}));

type GridProps = {
  setCode: string;
  user: firebase.User | null | undefined;
};

const CardGrid: FC<GridProps> = ({ setCode, user }) => {
  // States to store data and for loading while cards are fetched
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();

  const classes = useStyles();
  const screen: Screen = document.URL.includes("my-cards") ? "my-cards" : document.URL.includes("wishlist") ? "wishlist" : "sets";

  const { results, searchString, change, noResults } = useSearchCard(data);
  const { resultsDb, searchStringDb, changeDb, noResultsDb } = useSearchDb(data);
  const { wishlistCollection, myCardsCollection } = useDb(user);

  // Loads the set cards
  const loadData = useCallback(async () => {
    setLoading(true);
    if (screen === "sets") {
      try {
        const cards = await getSetCards(setCode);
        setData(cards);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        (screen === "wishlist" ? wishlistCollection : myCardsCollection)
          .doc(setCode)
          .collection("cards")
          .get()
          .then(response => setData(response.docs.map(d => d.data())))
          .catch(error => {
            return showError(error);
          });
      } finally {
        setLoading(false);
      }
    }
  }, [setLoading, setCode]);

  // Calls the loadData() while the component is rendered
  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return <Typography variant="h2">Loading...</Typography>;
  }

  if (screen === "sets") {
    document.title = data?.cards[0] ? data?.cards[0].set : "Loading...";

    return (
      <>
        <TitleRow name={data?.cards[0] ? data?.cards[0].set : "Set"} showBack={true} onChange={change}></TitleRow>

        <Grid container className={classes.container}>
          {searchString ? (
            noResults ? (
              <Typography variant="h2" className={classes.center}>
                No Results
              </Typography>
            ) : (
              results
                ?.sort((a: IPkmnCard, b: IPkmnCard) => a?.number - b?.number)
                .map((item: IPkmnCard) => (
                  <Grid item key={item.id} lg={3} md={4} sm={6} xs={12}>
                    <PkmnCard cardId={item.id} cardUrl={item.imageUrl} />
                  </Grid>
                ))
            )
          ) : (
            data?.cards
              .sort((a: IPkmnCard, b: IPkmnCard) => a?.number - b?.number)
              .map((item: IPkmnCard) => (
                <Grid item key={item.id} lg={3} md={4} sm={6} xs={12}>
                  <PkmnCard cardId={item.id} cardUrl={item.imageUrl} />
                </Grid>
              ))
          )}
        </Grid>
      </>
    );
  } else {
    document.title = data && data[0] ? data[0]?.cardSetName : "Empty Set";

    return (
      <>
        <TitleRow name={data && data[0] ? data[0].cardSetName : "Empty Set"} showBack={true} onChange={changeDb}></TitleRow>

        {searchStringDb ? (
          noResultsDb ? (
            <Typography variant="h2" className={classes.center}>
              No Results
            </Typography>
          ) : (
            <Grid container className={classes.container}>
              {resultsDb
                ?.sort((a: DbCard, b: DbCard) => a?.cardNumber - b?.cardNumber)
                .map((item: DbCard) => (
                  <Grid item key={item.cardId} lg={3} md={4} sm={6} xs={12}>
                    <PkmnCard cardId={item.cardId} cardUrl={item.imageSrc} />
                  </Grid>
                ))}
            </Grid>
          )
        ) : data && data[0] ? (
          <Grid container className={classes.container}>
            {data
              .sort((a: DbCard, b: DbCard) => a?.cardNumber - b?.cardNumber)
              .map((item: DbCard) => (
                <Grid item key={item.cardId} lg={3} md={4} sm={6} xs={12}>
                  <PkmnCard cardId={item.cardId} cardUrl={item.imageSrc} />
                </Grid>
              ))}
          </Grid>
        ) : (
          <Grid container className={classes.container} direction="column" alignItems="center" justify="center">
            <Grid item xs={12} sm={6} md={6}>
              <Card>
                <CardContent>
                  <img src={pokeball} className={classes.marginClass} width="50px"></img>
                  <Typography variant="h5" component="h1" color="secondary">
                    You did not add any card for this set yet.
                  </Typography>
                  <Typography variant="subtitle2" paragraph className={classes.marginClass}>
                    <Link to="/sets">
                      <b>Click here to return to sets, so you can add some cards.</b>
                    </Link>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </>
    );
  }
};

export default CardGrid;
