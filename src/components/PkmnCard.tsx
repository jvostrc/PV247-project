import { Button, Card, CardActionArea, CardContent, makeStyles, Theme } from "@material-ui/core";
import React, { FC } from "react";
import { IPkmnCard } from "../types";

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        margin: "10%",
        textAlign: "center",
        maxWidth: 240,
    },
}))

type CardProps = {
    card: IPkmnCard
}

const Set: FC<CardProps> = ({card}) => {

    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <img alt="Not available" src={card.imageUrl}></img> 
            </CardActionArea>
                {/*Change to Icons hearth and star*/}
                <CardContent>
                    <Button>Add to My Collection</Button>
                    <Button>Add to Wishlist</Button>
                </CardContent>              
        </Card>
    );
};

export default Set;