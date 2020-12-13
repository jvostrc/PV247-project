import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { FC } from "react";

const Wishlist: FC = () => {

  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="secondary">Wishlist view!</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Wishlist;
