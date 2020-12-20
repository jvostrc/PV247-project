import React, { FC, useCallback, useEffect, useState } from "react";
import { Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import Set from "./Set";
import { IPkmnSet, Screen, SearchType } from "../types";
import TitleRow from "./TitleRow";
import useSearchSet from "../hooks/useSearchSet";
import firebase from "firebase/app";

// Fetches the sets
const getSets = async (): Promise<SearchType> => {
  const response = await fetch("https://api.pokemontcg.io/v1/sets");
  const sets = await response.json();
  return sets;
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    minHeight: "calc(100vh - 156px)",
    [theme.breakpoints.only("xs")]: {
      minHeight: "calc(100vh - 203px)"
    }
  },
  center: {
    margin: "auto"
  }
}));

type SetGridProps = {
  user: firebase.User | null | undefined;
  screen: Screen;
};

const SetGrid: FC<SetGridProps> = ({ user, screen }) => {
  screen === "sets" ? (document.title = "Sets") : screen === "my-cards" ? (document.title = "Sets - My Cards") : (document.title = "Sets - Wishlist");

  // States to store data and for loading while sets are fetched
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SearchType>();
  const classes = useStyles();
  const { results, searchString, change, noResults } = useSearchSet(data);

  // Loads the sets
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const sets = await getSets();
      setData(sets);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  // Calls the loadData() while the component is rendered
  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return <Typography variant="h2">Loading...</Typography>;
  }

  return (
    <>
      <TitleRow name={screen === "sets" ? "Sets" : screen === "my-cards" ? "Sets - My Cards" : "Sets - Wishlist"} showBack={false} onChange={change}></TitleRow>
      <Grid container className={classes.container}>
        {searchString ? (
          noResults ? (
            <Typography variant="h2" className={classes.center}>
              No Results
            </Typography>
          ) : (
            results?.map((item: IPkmnSet) => (
              <Grid key={item.code} item xl={3} lg={4} sm={6} xs={12}>
                <Set set={item} user={user} screen={screen} />
              </Grid>
            ))
          )
        ) : (
          data?.sets?.map((item: IPkmnSet) => (
            <Grid key={item.code} item xl={3} lg={4} sm={6} xs={12}>
              <Set set={item} user={user} screen={screen} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default SetGrid;
