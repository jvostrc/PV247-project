import React, { FC, useCallback, useEffect, useState } from "react";
import { Grid, makeStyles, Theme } from "@material-ui/core";
import Set from "./Set";
import { IPkmnSet } from "../types";
import TitleRow from "./TitleRow";
import useSearchSet from "../hooks/useSearchSet";

// Fetches the sets
const getSets = async (): Promise<IPkmnSet[]> => {
  const response = await fetch("https://api.pokemontcg.io/v1/sets");
  const sets = await response.json();
  console.log(sets);
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

const SetGrid: FC = () => {

  document.title = "Sets";

  // States to store data and for loading while sets are fetched
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();
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
    return <div>Loading...</div>;
  }

  return (
    <>
      <TitleRow name="Sets" showBack={false} onChange={change}></TitleRow>
      <Grid container className={classes.container}>
        {searchString ? (
          noResults ? (
            <div className={classes.center}>No Results</div>
          ) : (
            results?.map((item: IPkmnSet) => (
              <Grid key={item.code} item xl={3} lg={4} sm={6} xs={12}>
                <Set set={item} />
              </Grid>
            ))
          )
        ) : (
          data?.sets.map((item: IPkmnSet) => (
            <Grid key={item.code} item xl={3} lg={4} sm={6} xs={12}>
              <Set set={item} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default SetGrid;
