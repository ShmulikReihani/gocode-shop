import {
  AppBar,
  FormControl,
  Grid,
  IconButton,
  makeStyles,
  Slider,
  Toolbar,
  Typography,
  withStyles,
  InputLabel,
  NativeSelect,
  InputBase,
  Dialog,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { useState } from "react";
import { useContext } from "react";
import { CartCtx } from "../Context/CartContext/CartContext";
import "./Header.css";
import Cart from "../Cart/Cart";

function valuetext(value) {
  return `${value}`;
}

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
      marginBottom: 25,
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Header = ({ categories, handlerFilter, maxPrice, minPrice }) => {
  const [list] = useContext(CartCtx);
  const [filterName, setFilterName] = useState("");

  const [sliderValue, setSliderValue] = useState([minPrice, maxPrice]);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
    handlerFilter(filterName, sliderValue);
  };

  const handleChangeFilterName = (filterName) => {
    setFilterName(filterName);
    handlerFilter(filterName, sliderValue);
  };

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

      <div>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <FormControl className={classes.margin}>
              <InputLabel htmlFor="demo-customized-select-native">
                Filter by:
              </InputLabel>
              <NativeSelect
                input={<BootstrapInput />}
                onChange={(e) => handleChangeFilterName(e.target.value)}
              >
                {categories.map((categorie) => (
                  <option key={categorie} value={categorie}>
                    {categorie}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </Grid>
          <Grid item xs>
            <Grid container justifyContent="space-between">
              <Typography>{sliderValue[0]}</Typography>
              <Typography>{sliderValue[1]}</Typography>
            </Grid>
            <Slider
              value={sliderValue}
              onChange={handleChange}
              marks
              step={10}
              max={maxPrice}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Header;
