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
  cardId: string;
  cardUrl: string;
};

const Set: FC<CardProps> = ({ cardId, cardUrl }) => {
  const classes = useStyles();

  return (
    <Link to={`/cardDetail/${cardId}`}>
      <img alt={cardId} src={cardUrl} width="240px" height="330px" className={classes.img} />
    </Link>
  );
};

export default Set;
