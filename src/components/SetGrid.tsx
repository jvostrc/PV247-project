import React, { FC, useCallback, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Set from "./Set";
import { IPkmnSet } from "../types";
import TitleRow from "./TitleRow";

// Fetches the sets
const getSets = async (): Promise<IPkmnSet[]> => {
  const response = await fetch("https://api.pokemontcg.io/v1/sets");
  const sets = await response.json();
  return sets;
};

const SetGrid: FC = () => {
  // States to store data and for loading while sets are fetched
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();

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
      <TitleRow name="Sets" showBack={false}></TitleRow>
      <Grid container>
        {data?.sets.map((item: IPkmnSet) => (
          <Grid key={item.code} xl={3} lg={4} sm={6} xs={12}>
            <Set set={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SetGrid;
