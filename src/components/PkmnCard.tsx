import { makeStyles, Theme } from "@material-ui/core";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { IPkmnCard } from "../types";

const useStyles = makeStyles((theme: Theme) => ({
  img: {
    maxWidth: "100%",
    objectFit: "cover",
    backgroundColor: theme.palette.secondary.main,
    marginBottom: "10%",
    borderRadius: 4
  }
}));

type CardProps = {
  card: IPkmnCard;
};

const Set: FC<CardProps> = ({ card }) => {
  const classes = useStyles();

  return (
    <Link to={`/cardDetail/${card.id}`}>
      <img alt={card.id} src={card.imageUrl} width="240px" height="330px" className={classes.img} />
    </Link>
  );
};

export default Set;
