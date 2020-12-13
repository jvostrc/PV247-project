import { Button, Card, CardActions, CardContent, Grid, Typography } from "@material-ui/core";
import { FC } from "react";
import { useLoggedInUser, wishlistCollection, myCardCollection } from "../utils/firebase";

const Sets: FC = () => {
  const user = useLoggedInUser();
  const mockCardName = "this will be a card name"; // for mock purposes; to be deleted

  const submitWishlistCard = async () => {
    try {
      await wishlistCollection.doc(user?.email ?? user?.uid).set({
        owner: {
          uid: user?.uid ?? "",
          email: user?.email ?? ""
        },
        cardName: mockCardName
      });
    } catch (error) {
      console.log(error);
    }
  };

  const submitMyCard = async () => {
    try {
      await myCardCollection.doc(user?.email ?? user?.uid).set({
        owner: {
            uid: user?.uid ?? "",
            email: user?.email ?? ""
          },
        cardName: mockCardName
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
            <Button onClick={submitMyCard} color="primary">
              My Cards - Test Submit
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Sets;
