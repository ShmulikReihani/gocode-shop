import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Spinner from "../components/UI/Spinner/Spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
  },
  media: {
    height: 300,
    width: "100%",
    objectFit: "contain",
  },
}));

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [lodding, setLodding] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setLodding((prev) => !prev);
    fetch(`https://fakestoreapi.com/products/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLodding((prev) => !prev);
      });
  }, []);

  return (
    <>
      {lodding ? (
        <Spinner />
      ) : (
        <Grid container justifyContent="center" alignItems="center">
          <Card className={classes.root}>
            <CardHeader title={product.title} subheader={product.category} />
            <CardMedia
              className={classes.media}
              image={product.image}
              component="img"
              title="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {product.description}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {`$${product.price}`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
    </>
  );
};

export default ProductDetails;
