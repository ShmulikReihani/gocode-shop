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
  Button,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { useState } from "react";
import { useContext } from "react";
import { CartCtx } from "../../Context/CartContext/CartContext";
import "./Header.css";
import Cart from "../Cart/Cart";
import { Link, useHistory } from "react-router-dom";
import logo from "../../images/logo.PNG";
import { UserCtx } from "../../Context/UserContext/UserContext";

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
  const history = useHistory();
  const [user, setUser] = useContext(UserCtx);

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
              <Typography variant="h6" className={classes.title}>
                hello {user && user.firstName ? user.firstName : "strenger"}
              </Typography>
              {user && user.firstName ? (
                <Link to="/logout">
                  <Button
                    style={{ color: "white", marginRight: "20px" }}
                    size="small"
                  >
                    Logout
                  </Button>
                </Link>
              ) : (
                <Link to="/signIn">
                  <Button
                    style={{ color: "white", marginRight: "20px" }}
                    size="small"
                  >
                    Login
                  </Button>
                </Link>
              )}
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
