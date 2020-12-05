import React, { FC } from "react";
import {makeStyles, Theme} from '@material-ui/core/styles';
// TODO add react-router-dom
// import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, Typography } from "@material-ui/core";
import { IPkmnSet } from "../types";


const useStyles = makeStyles((theme: Theme) => ({
    card: {
        marginRight: "5%",
        marginTop: "5%",
        marginBottom: "5%",
        padding: "2%"
    },
    logoContainer: {
        margin: 5,
    },
    logo: {
        maxWidth: 220,
        maxHeight: 110,
        minHeight: 110,
        minWidth:220,
    },
    symbol: {
        maxWidth: 50,
        maxHeight: 25,
    },
    link: { 
        textDecoration: 'none' 
    },
}))


type SetProps = {
    set: IPkmnSet
}

const Set: FC<SetProps> = ({set}) => {
    const classes = useStyles();

    return (
       // TODO - add react-router-dom
       // <Link className={classes.link} to={`/sets/${set.code}`}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardContent>
                        <div className={classes.logoContainer}>
                            <img src={set.logoUrl} className={classes.logo}></img>
                        </div>
                        <img src={set.symbolUrl} className={classes.symbol}></img>
                        <Typography gutterBottom component="h1" variant="subtitle1">
                            <b>{set.name}</b>
                        </Typography>
                        <Typography gutterBottom component="h2" variant="subtitle1">
                            0/{set.totalCards}
                        </Typography>
                    </CardContent>    
                </CardActionArea>           
            </Card>
      //  </Link>
    );
};

export default Set;