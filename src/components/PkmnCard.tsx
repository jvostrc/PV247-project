import { Button, Card, CardActionArea, CardContent, makeStyles, Theme } from "@material-ui/core";
import React, { FC } from "react";
import { IPkmnCard } from "../types";

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    margin: "10%",
    textAlign: "center",
    maxWidth: 240
  }
}));

type CardProps = {
  card: IPkmnCard;
};

const Set: FC<CardProps> = ({ card }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <img alt={card.id} src={card.imageUrl}></img>
      </CardActionArea>
      {/*Change to Icons hearth and star*/}
      <CardContent>
        <Button color="primary">Add to My Collection</Button>
        <Button color="primary">Add to Wishlist</Button>
      </CardContent>
    </Card>
  );
};

export default Set;
