import { Button, Card, CardActions, CardContent, Grid, Typography } from "@material-ui/core";
import { FC } from "react";
import { googleLogin } from "../utils/firebase";
import pokeball from "../icons/filled-pokeball.svg";

const Login: FC = () => {

  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <img src={pokeball} alt="logo" width="20px" />
            <Typography variant="h1" color="secondary">
              Pokemon Card Collection Tracker
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={googleLogin} variant="text" size="small" color="secondary">
              Google Sign In
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
