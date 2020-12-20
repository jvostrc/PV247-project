import { IconButton, makeStyles, Theme, Typography, Grid } from "@material-ui/core";
import React, { FC, useCallback, useEffect, useState } from "react";
import { IPkmnDetail } from "../types";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import star from "../icons/star.svg";
import filledStar from "../icons/filled-star.svg";
import pokeball from "../icons/pokeball.svg";
import filledPokeball from "../icons/filled-pokeball.svg";
import useDb from "../pages/sets";

const getData = async (id: string): Promise<IPkmnDetail> => {
  const response = await fetch(`https://api.pokemontcg.io/v1/cards/${id}`);
  const data = await response.json();
  return data;
};

type DetailProps = {
  id: string;
  user: firebase.User | null | undefined;
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
    borderRadius: 4,
    backgroundColor: theme.palette.secondary.main
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

const PkmnDetail: FC<DetailProps> = ({ id, user }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IPkmnDetail>();

  const [wishlisted, setWishlisted] = useState(false);
  const [collected, setCollected] = useState(false);

  const classes = useStyles();
  const history = useHistory();
  const { submitWishlistCard, removeWishlistCard, submitMyCard, removeMyCard, checkWishlisted, checkCollected } = useDb(user);

  const addToWishlist = () => {
    if (data) {
      submitWishlistCard(data.card.id, data.card.imageUrl, data.card.number, data.card.setCode, data.card.set);
      setWishlisted(!wishlisted);
    }
  };

  const removeFromWishlist = () => {
    if (data) {
      removeWishlistCard(data.card.id, data.card.setCode);
      setWishlisted(!wishlisted);
    }
  };

  const addToMyCollection = () => {
    if (data) {
      submitMyCard(data.card.id, data.card.imageUrl, data.card.number, data.card.setCode, data.card.set);
      setCollected(!collected);
    }
  };

  const removeFromMyCollection = () => {
    if (data) {
      removeMyCard(data.card.id, data.card.setCode);
      setCollected(!collected);
    }
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getData(id);
      setData(data);
      setWishlisted(await checkWishlisted(data.card.id, data.card.setCode));
      setCollected(await checkCollected(data.card.id, data.card.setCode));
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

  document.title = data?.card ? data?.card.name : "Loading...";

  return (
    <Grid container item lg={8} md={8} sm={10} xs={12} className={classes.container}>
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
          <IconButton color="inherit" onClick={() => (collected ? removeFromMyCollection() : addToMyCollection())}>
            {collected ? <img src={filledPokeball} alt="Remove from My Cards" width="23px" height="23px" /> : <img src={pokeball} alt="Add to My Cards" width="23px" height="23px" />}
          </IconButton>
          <IconButton color="inherit" onClick={() => (wishlisted ? removeFromWishlist() : addToWishlist())}>
            {wishlisted ? <img src={filledStar} alt="Remove from Wishlist" width="23px" height="23px" /> : <img src={star} alt="Add to Wishlist" width="23px" height="23px" />}
          </IconButton>
        </div>
      </Grid>

      <Grid item container lg={6} md={6} sm={6} xs={12} className={classes.gridImg}>
        <img src={data?.card.imageUrl} alt={data?.card.name} width="240px" height="330px" className={classes.img} />
      </Grid>

      <Grid item container lg={6} md={6} sm={6} xs={12} alignItems="center" justify="center">
        <Grid item md={6} sm={6} xs={6} className={`${classes.borderBottom} ${classes.borderRight} ${classes.paddingVertical}`}>
          <Typography variant="body1" className={classes.subtitle} gutterBottom>
            Card Type
          </Typography>
          <Typography variant="body1" className={classes.text}>
            {data?.card.subtype ? data?.card.subtype : "N/A"}
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
            {data?.card?.types ? data?.card?.types[0] : "N/A"}
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
