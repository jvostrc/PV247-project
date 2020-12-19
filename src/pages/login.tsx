import { Button, Card, CardActions, CardContent, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import { FC } from "react";
import { googleLogin } from "../utils/firebase";
import pokeball from "../icons/filled-pokeball.svg";
import googleButton from "../icons/googleButton.png";

const useStyles = makeStyles((theme: Theme) => ({
  margin: {
    margin: "10px"
  },
}));

const Login: FC = () => {

  document.title = "Login";
  const classes = useStyles();

  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Grid item xs={12} sm={6} md={6}>
        <Card>
          <CardContent>
            <img src={pokeball} alt="logo" width="100px" className={classes.margin}/>
            <Typography variant="h1" color="secondary" className={classes.margin}>
              Pokémon Card Collection Tracker
            </Typography>
            <Button onClick={googleLogin} className={classes.margin}>
              <img src={googleButton} alt="Sign in with Google" width="250px"/>
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
