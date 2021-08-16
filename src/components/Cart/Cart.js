import {
  DialogContent,
  DialogTitle,
  makeStyles,
  Button,
  Typography,
  useTheme,
  DialogActions,
  Grid,
  Paper,
  ButtonBase,
} from "@material-ui/core";
import { useContext } from "react";
import { CartCtx } from "../Context/CartContext/CartContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
  },
  btn: {
    borderRadius: 50,
    minWidth: 10,
    minHeight: 10,
  },
}));

const Cart = ({ handleClose }) => {
  const [list, setList, totalPrice, addTotalPrice, reduceTotalPrice] =
    useContext(CartCtx);
  const classes = useStyles();
  const theme = useTheme();

  function handlerAddCart(id) {
    const item = list.findIndex((l) => l.id === id);
    if (item > -1) {
      addTotalPrice(list[item].price);
      setList(list.map((l) => (l.id === id ? { ...l, qnt: l.qnt + 1 } : l)));
    }
  }

  function handlerMinusCart(id) {
    const item = list.findIndex((l) => l.id === id);
    if (list[item].qnt > 1) {
      reduceTotalPrice(list[item].price);
      setList(list.map((l) => (l.id === id ? { ...l, qnt: l.qnt - 1 } : l)));
    } else {
      setList(list.filter((item) => item.id !== id));
    }
  }

  function handlerRemove(id) {
    const item = list.findIndex((l) => l.id === id);
    if (item > -1) {
      reduceTotalPrice(Number(list[0].price) * list[0].qnt);
      setList(list.filter((item) => item.id !== id));
    }
  }

  return (
    <>
      <DialogTitle id="scroll-dialog-title">Products Cart</DialogTitle>
      {list && list.length > 0 ? (
        <DialogContent dividers={"paper"}>
          {list.map((l) => (
            <div className={classes.root}>
              <Paper className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase className={classes.image}>
                      <img
                        className={classes.img}
                        alt="complex"
                        src={l.image}
                      />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid
                      item
                      xs
                      container
                      direction="column"
                      spacing={3}
                      style={{ marginRight: "5px" }}
                    >
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                          {l.title}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          {`$${l.price}`}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                        ></Typography>
                      </Grid>
                      <Grid item>
                        <Button
                          style={{
                            maxWidth: "15px",
                            maxHeight: "15px",
                            minWidth: "15px",
                            minHeight: "15px",
                          }}
                          className={classes.btn}
                          onClick={() => handlerAddCart(l.id)}
                        >
                          +
                        </Button>

                        <Typography
                          style={{
                            maxWidth: "15px",
                            maxHeight: "15px",
                            minWidth: "15px",
                            minHeight: "15px",
                            marginLeft: "5px",
                            marginRight: "5px",
                          }}
                          component="span"
                        >
                          {l.qnt}
                        </Typography>
                        <Button
                          style={{
                            maxWidth: "15px",
                            maxHeight: "15px",
                            minWidth: "15px",
                            minHeight: "15px",
                          }}
                          className={classes.btn}
                          onClick={() => handlerMinusCart(l.id)}
                        >
                          -
                        </Button>

                        <Typography
                          variant="body2"
                          style={{ cursor: "pointer" }}
                          onClick={() => handlerRemove(l.id)}
                        >
                          Remove
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">{`$${(
                        l.price * l.qnt
                      ).toFixed(2)}`}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          ))}
        </DialogContent>
      ) : (
        <h1 style={{ padding: "100px" }}>CART EMPTY</h1>
      )}
      <DialogActions>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item>
            <h1>TOTAL: {totalPrice}</h1>
          </Grid>
          <Grid item>
            <Button onClick={() => handleClose()} color="primary">
              Cancel
            </Button>
            <Button color="primary">Buy</Button>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
};

export default Cart;
