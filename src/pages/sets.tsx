/*
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@material-ui/core";
import { FC } from "react";
*/
import { useLoggedInUser, wishlistCollection, myCardCollection, cardSetCollection } from "../utils/firebase";

/*
const Sets: FC = () => {

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
            <Button onClick={submitNewSet} color="primary">
              New set - Test Submit
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Sets;
*/

const useDb = () => {
  
  const user = useLoggedInUser();
  const mockCardName = "this will be a card name"; // for mock purposes; to be deleted
  const mockSetName = "this will be a set name"; // for mock purposes; to be deleted
  const mockSetNumber = 42; // for mock purposes; to be deleted

  const submitWishlistCard = async (cardId: string, imageSrc: string, cardNumber: number, cardSet: string) => {
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

  const removeWishlistCard = async (cardId: string) => {
      // TODO
  }
  
  const submitMyCard = async (cardId: string, imageSrc: string, cardNumber: number, cardSet: string) => {
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

  const removeMyCard = async (cardId: string) => {
    // TODO
  }
  
  const submitNewSet = async () => {
    try {
      await cardSetCollection.doc(user?.email ?? user?.uid).set({
        setName: mockSetName,
        collectedInSet: mockSetNumber
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { submitWishlistCard, removeWishlistCard, submitMyCard, removeMyCard}
}

export default useDb;