import {
  AppBar,
  createTheme,
  Dialog,
  makeStyles,
  ThemeProvider,
  Toolbar,
  Typography,
  withStyles,
  Avatar,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { useState } from "react";
import { useContext } from "react";
import { CartCtx } from "../../Context/CartContext/CartContext";
import "./Header.css";
import Cart from "../Cart/Cart";
import { Link } from "react-router-dom";
import logo from "../../images/logo.PNG";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const theme = createTheme({
  typography: {
    fontSize: 12,
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 25,
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const [list] = useContext(CartCtx);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <ThemeProvider theme={theme}>
          <AppBar
            position="static"
            style={{
              background: "#2E3B55",
              height: "50px",
              justifyContent: "center",
            }}
          >
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  SHOPPING STORE
                </Link>
              </Typography>

              <StyledBadge
                badgeContent={list.length}
                color="secondary"
                style={{ cursor: "pointer" }}
              >
                <ShoppingCartIcon fontSize={"large"} onClick={handleToggle} />
              </StyledBadge>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={"paper"}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <Cart handleClose={handleClose} />
        </Dialog>
      </div>
    </>
  );
};

export default Header;
