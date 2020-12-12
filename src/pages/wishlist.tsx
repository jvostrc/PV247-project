import { Button, Card, CardActions, CardContent, Grid, Typography } from "@material-ui/core";
import { FC } from "react";
import { useLoggedInUser, wishlistCollection } from "../utils/firebase";

const Wishlist: FC = () => {
  const user = useLoggedInUser();

  const submitWishlistCard = async () => {
    try {
      await wishlistCollection.doc(user?.uid).set({
        by: {
          uid: user?.uid ?? "",
          email: user?.email ?? ""
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="secondary">Pokemon Card Collection Tracker</Typography>
          </CardContent>
          <CardActions>
            <Button onClick={submitWishlistCard} color="secondary">
              Wishlist Submit
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Wishlist;
