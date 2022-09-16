import Slider from "@mui/material/Slider";

const PriceSlider = ({ priceSlider, handlePriceSlider, filterType }) => {
  return (
    <Slider
      value={priceSlider}
      onChange={handlePriceSlider}
      valueLabelDisplay="auto"
      min={0}
      max={1000}
      name={filterType}
      sx={{ width: "12rem" }}
    />
  );
};

export default PriceSlider;
