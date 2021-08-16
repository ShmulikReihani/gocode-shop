import {
  AppBar,
  Dialog,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  withStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { useState } from "react";
import { useContext } from "react";
import { CartCtx } from "../../Context/CartContext/CartContext";
import "./Header.css";
import Cart from "../Cart/Cart";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 10,
    marginBottom: 25,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Jackets
            </Typography>
            <StyledBadge badgeContent={list.length} color="secondary">
              <ShoppingCartIcon fontSize={"large"} onClick={handleToggle} />
            </StyledBadge>
          </Toolbar>
        </AppBar>
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
