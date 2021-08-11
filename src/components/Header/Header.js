import { Grid, Slider, Typography } from "@material-ui/core";
import { useState } from "react";
import { useContext } from "react";
import { CartCtx } from "../Context/CartContext/CartContext";
import "./Header.css";

function valuetext(value) {
  return `${value}`;
}

const Header = ({ categories, handlerFilter }) => {
  const [list] = useContext(CartCtx);
  const [filterName, setFilterName] = useState("");
  const [sliderValue, setSliderValue] = useState([20, 40]);

  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
    handlerFilter(filterName, sliderValue);
  };

  const handleChangeFilterName = (filterName) => {
    setFilterName(filterName);
    handlerFilter(filterName, sliderValue);
  };

  //onChange={setProducts}
  return (
    <>
      <nav className="product-filter">
        <h1>Jackets</h1>

        <div className="sort">
          <div className="collection-sort">
            <label>Filter by:</label>
            <select onChange={(e) => handleChangeFilterName(e.target.value)}>
              {categories.map((categorie) => (
                <option key={categorie} value={categorie}>
                  {categorie}
                </option>
              ))}
            </select>
          </div>
        </div>
      </nav>
      <div className="root">
        <Typography>Sort by price</Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Typography>{sliderValue[0]}</Typography>
          </Grid>
          <Grid item xs>
            <Slider
              value={sliderValue}
              onChange={handleChange}
              marks
              step={10}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
            />
          </Grid>
          <Grid item>
            <Typography>{sliderValue[1]}</Typography>
          </Grid>
        </Grid>
      </div>
      <div>{list}</div>
    </>
  );
};

export default Header;
