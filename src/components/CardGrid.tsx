import { Grid } from "@material-ui/core";
import React, { FC, useCallback, useEffect, useState } from "react";
import { IPkmnCard } from "../types";
import PkmnCard from "./PkmnCard";
import TitleRow from "./TitleRow";

// Fetches the set cards
const getSetCards = async (setCode: string): Promise<IPkmnCard[]> => {
  const response = await fetch(`https://api.pokemontcg.io/v1/cards?setCode=${setCode}`);
  const cards = await response.json();
  return cards;
};

type GridProps = {
  setCode: string;
};

const CardGrid: FC<GridProps> = ({ setCode }) => {
  // States to store data and for loading while cards are fetched
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();

  // Loads the set cards
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const cards = await getSetCards(setCode);
      setData(cards);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setCode]);

  // Calls the loadData() while the component is rendered
  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TitleRow name={data?.cards[0] ? data?.cards[0].set : "Set"} showBack={true}></TitleRow>

      <Grid container>
        {data?.cards
          .sort((a: IPkmnCard, b: IPkmnCard) => a?.number - b?.number)
          .map((item: IPkmnCard) => (
            <Grid key={item.id} lg={3} md={4} sm={6} xs={12}>
              <PkmnCard card={item} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default CardGrid;
