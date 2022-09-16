import { Box } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import Filters from "./Filters";
import PriceSlider from "./PriceSlider";

const FiltersView = ({
  colorFiltersData,
  genderFiltersData,
  typeFiltersData,
  handleFilters,
  sliderValue,
  handlePriceSlider,
}) => {
  let filtersContainer = (
    <Box className="filtersBox">
      <Box className="colorFilters">
        <FormLabel component="legend" sx={{ fontWeight: 600 }}>
          Color
        </FormLabel>
        {colorFiltersData.map((colors, index) => (
          <Filters
            filters={colors}
            handleFilters={handleFilters}
            filterType={"color"}
            key={index}
          />
        ))}
      </Box>
      <Box paddingTop="0.5rem">
        <FormLabel component="legend" sx={{ fontWeight: 600 }}>
          Gender
        </FormLabel>
        {genderFiltersData.map((genders, index) => (
          <Filters
            filters={genders}
            handleFilters={handleFilters}
            filterType={"gender"}
            key={index}
          />
        ))}
      </Box>
      <Box sx={{ width: 300 }} paddingTop="0.5rem">
        <FormLabel component="legend" sx={{ fontWeight: 600 }}>
          Price
        </FormLabel>
        <PriceSlider
          priceSlider={sliderValue}
          filterType={"price"}
          handlePriceSlider={handlePriceSlider}
        />
      </Box>
      <Box paddingTop="0.5rem">
        <FormLabel component="legend" sx={{ fontWeight: 600 }}>
          Type
        </FormLabel>
        {typeFiltersData.map((types, index) => (
          <Filters
            filters={types}
            handleFilters={handleFilters}
            filterType={"type"}
            key={index}
          />
        ))}
      </Box>
    </Box>
  );

  return filtersContainer;
};

export default FiltersView;
