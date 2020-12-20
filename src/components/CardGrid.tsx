import { Grid, makeStyles, Theme } from "@material-ui/core";
import React, { FC, useCallback, useEffect, useState } from "react";
import { DbCard, IPkmnCard, Screen } from "../types";
import PkmnCard from "./PkmnCard";
import TitleRow from "./TitleRow";
import useSearchCard from "../hooks/useSearchCard";
import firebase from 'firebase/app';
import useDb from "../pages/sets";


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
  }
}));

type GridProps = {
  setCode: string;
  user: firebase.User | null | undefined
};

const CardGrid: FC<GridProps> = ({ setCode, user }) => {

  // States to store data and for loading while cards are fetched
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();

  const classes = useStyles();
  const screen = document.URL.includes("my-cards") ? "my-cards" : (document.URL.includes("wishlist") ? "wishlist" : "sets");

  const { results, searchString, change, noResults } = useSearchCard(data);
  const { wishlistCollection, myCardsCollection } = useDb(user);

  // Loads the set cards
  const loadData = useCallback(async () => {
    setLoading(true);
    if(screen === "sets"){
      try {
        const cards = await getSetCards(setCode);
        setData(cards);
      } finally {
        setLoading(false);
      }
    } else {
      try{
        (screen === "wishlist" ? wishlistCollection : myCardsCollection)
        .doc(setCode).collection("cards").get().then(response => setData(response.docs.map(d => d.data())))
        .catch(error => console.log(error));
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
    return <div>Loading...</div>;
  }

  if (screen === "sets") {
    document.title = data?.cards[0] ? data?.cards[0].set : "Loading...";

    return (
      <>
        <TitleRow name={data?.cards[0] ? data?.cards[0].set : "Set"} showBack={true} onChange={change}></TitleRow>
  
        <Grid container className={classes.container}>
          {searchString ? (
            noResults ? (
              <div className={classes.center}>No Results</div>
            ) : (
              results
                ?.sort((a: IPkmnCard, b: IPkmnCard) => a?.number - b?.number)
                .map((item: IPkmnCard) => (
                  <Grid key={item.id} lg={3} md={4} sm={6} xs={12}>
                    <PkmnCard cardId={item.id} cardUrl={item.imageUrl} />
                  </Grid>
                ))
            )
          ) : (
            data?.cards
              .sort((a: IPkmnCard, b: IPkmnCard) => a?.number - b?.number)
              .map((item: IPkmnCard) => (
                <Grid key={item.id} lg={3} md={4} sm={6} xs={12}>
                  <PkmnCard cardId={item.id} cardUrl={item.imageUrl} />
                </Grid>
              ))
          )}
        </Grid>
      </>
    );
  } else {
    document.title = data ? data[0].cardSetName : "Loading...";

    return (
      <>
        <TitleRow name={data ? data[0].cardSetName : "Set"} showBack={false} onChange={change}></TitleRow>
  
        <Grid container className={classes.container}>
            {data ? data
              .sort((a: DbCard, b: DbCard) => a?.cardNumber - b?.cardNumber)
              .map((item: DbCard) => (
                <Grid key={item.cardId} lg={3} md={4} sm={6} xs={12}>
                  <PkmnCard cardId={item.cardId} cardUrl={item.imageSrc} />
                </Grid>
              )) : ""
          }
        </Grid>
      </>
    );
  }
};

export default CardGrid;
