import { Button, Card, CardActions, CardContent, Grid, Typography } from "@material-ui/core";
import { FC } from "react";
import { useLoggedInUser, wishlistCollection } from "../utils/firebase";

const Sets: FC = () => {
  const user = useLoggedInUser();

  const submitWishlistCard = async () => {
    try {
      await wishlistCollection.doc(user?.email ?? user?.uid).set({
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
            <Typography color="secondary">Sets view</Typography>
          </CardContent>
          <CardActions>
            <Button onClick={submitWishlistCard} color="primary">
              Wishlist - Test Submit
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Sets;
