import { IconButton, Card, CardActionArea, CardContent, Avatar, makeStyles, Theme, Typography, Grid } from "@material-ui/core";
import React, { FC, useCallback, useEffect, useState } from "react";
import { IPkmnDetail } from "../types";
import { useHistory } from "react-router-dom";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import StarIcon from "@material-ui/icons/Star";
import AddIcon from "@material-ui/icons/Add";

// import Star from "../icons/star.svg";
// import FilledStar from "../icons/filled-star.svg";
// import Pokeball from "../icons/pokeball.svg";
// import FilledPokeball from "../icons/filled-pokeball.svg";

const getData = async (id: string): Promise<IPkmnDetail> => {
  const response = await fetch(`https://api.pokemontcg.io/v1/cards/${id}`);
  const data = await response.json();
  return data;
};

type DetailProps = {
  id: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    margin: "auto"
  },
  row: {
    width: "calc(100% - 96px)",
    display: "flex",
    alignItems: "center"
  },
  marginBottom: {
    marginBottom: 20
  },
  gridImg: {
    justifyContent: "flex-start",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
      marginBottom: 20
    }
  },
  borderBottom: {
    borderBottom: `1px solid ${theme.palette.secondary.main}`
  },
  borderRight: {
    borderRight: `1px solid ${theme.palette.secondary.main}`
  },
  img: {
    maxWidth: 240
  },
  subtitle: {
    color: "#A9AEB6"
  },
  text: {
    textTransform: "uppercase"
  },
  paddingVertical: {
    padding: "30px 0"
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
    <Grid container lg={8} md={8} sm={10} xs={12} className={classes.container}>
      <Grid item container direction="row" justify="space-between" alignItems="center" className={classes.marginBottom}>
        <div className={classes.row}>
          <IconButton
            color="inherit"
            onClick={() => {
              history.goBack();
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h1" noWrap={true}>
            {data?.card.name}
          </Typography>
        </div>
        <div>
          <IconButton color="inherit">
            <StarIcon />
          </IconButton>
          <IconButton color="inherit">
            <AddIcon />
          </IconButton>
        </div>
      </Grid>

      <Grid item container lg={6} md={6} sm={6} xs={12} className={classes.gridImg}>
        <img src={data?.card.imageUrl} alt={data?.card.name} width="240px" height="330px" />
      </Grid>

      <Grid item container lg={6} md={6} sm={6} xs={12} alignItems="center" justify="center" spacing={0}>
        <Grid item md={6} sm={6} xs={6} className={`${classes.borderBottom} ${classes.borderRight} ${classes.paddingVertical}`}>
          <Typography variant="body1" className={classes.subtitle} gutterBottom>
            Card Type
          </Typography>
          <Typography variant="body1" className={classes.text}>
            {data?.card?.subtype ?? "N/A"}
          </Typography>
        </Grid>
        <Grid item md={6} sm={6} xs={6} className={`${classes.borderBottom} ${classes.paddingVertical}`}>
          <Typography variant="body1" className={classes.subtitle} gutterBottom>
            Rarity
          </Typography>
          <Typography variant="body1" className={classes.text}>
            {data?.card.rarity ?? "N/A"}
          </Typography>
        </Grid>
        <Grid item md={6} sm={6} xs={6} className={`${classes.borderBottom} ${classes.borderRight} ${classes.paddingVertical}`}>
          <Typography variant="body1" className={classes.subtitle} gutterBottom>
            Type
          </Typography>
          <Typography variant="body1" className={classes.text}>
            {data?.card?.types ? [0] ?? "N/A" : "N/A"}
          </Typography>
        </Grid>
        <Grid item md={6} sm={6} xs={6} className={`${classes.borderBottom} ${classes.paddingVertical}`}>
          <Typography variant="body1" className={classes.subtitle} gutterBottom>
            HP
          </Typography>
          <Typography variant="body1" className={classes.text}>
            {data?.card.hp ?? "N/A"}
          </Typography>
        </Grid>
        <Grid item md={6} sm={6} xs={6} className={`${classes.borderRight} ${classes.paddingVertical}`}>
          <Typography variant="body1" className={classes.subtitle} gutterBottom>
            Set
          </Typography>
          <Typography variant="body1" className={classes.text}>
            {data?.card.set ?? "N/A"}
          </Typography>
        </Grid>
        <Grid item md={6} sm={6} xs={6} className={classes.paddingVertical}>
          <Typography variant="body1" className={classes.subtitle}>
            Number
          </Typography>
          <Typography variant="body1" className={classes.text}>
            {data?.card.number ?? "N/A"}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PkmnDetail;
