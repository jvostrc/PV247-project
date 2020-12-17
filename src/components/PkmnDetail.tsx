import { IconButton, Card, CardActionArea, CardContent, makeStyles, Theme, Typography, Grid } from "@material-ui/core";
import React, { FC, useCallback, useEffect, useState } from "react";
import { IPkmnDetail } from "../types";
import { useHistory } from "react-router-dom";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Star from "../icons/star.svg";
import FilledStar from "../icons/filled-star.svg";
import Pokeball from "../icons/pokeball.svg";
import FilledPokeball from "../icons/filled-pokeball.svg";

const getData = async (id: string): Promise<IPkmnDetail> => {
  const response = await fetch(`https://api.pokemontcg.io/cards/${id}`);
  const data = await response.json();
  return data;
};

type DetailProps = {
  id: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  img: {
    maxWidth: 240
  }
}));

const PkmnDetail: FC<DetailProps> = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IPkmnDetail>();
  const classes = useStyles();
  const history = useHistory();

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getData(id);
      setData(data);
    } finally {
      setLoading(false);
    }
  }, [setLoading, id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardActionArea>
        <ChevronLeftIcon
          onClick={() => {
            history.goBack();
          }}
        />
        <Typography variant="h1">{data?.name}</Typography>
        <IconButton>
          <Star />
        </IconButton>
        <IconButton>
          <Pokeball />
        </IconButton>
      </CardActionArea>

      <CardContent>
        <img src={data?.imageUrl} alt={data?.name} />
        <Grid container>
          <Grid item>
            <Typography variant="body1">Card Type</Typography>
            <Typography variant="body1">{data?.cardType}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">Rarity</Typography>
            <Typography variant="body1">{data?.rarity}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">Type</Typography>
            <Typography variant="body1">{data?.type}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">HP</Typography>
            <Typography variant="body1">{data?.hp}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">Set</Typography>
            <Typography variant="body1">{data?.set}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">Number</Typography>
            <Typography variant="body1">{data?.number}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PkmnDetail;
