import { Box, Grid, TextField, IconButton, Stack, Button } from "@mui/material";
import PageviewIcon from "@mui/icons-material/Pageview";
import { useState, useEffect } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import axios from "axios";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSnackbar } from "notistack";
import { generateColorFiltersFrom } from "../filters_data/colorFiltersData";
import { generateGenderFiltersFrom } from "../filters_data/genderFiltersData";
import { generateTypeFiltersFrom } from "../filters_data/typeFiltersData";
import ProductsView from "./ProductsView";
import FiltersView from "./FiltersView";
import "./Products.css";

const Products = ({
  products,
  setProducts,
  cartProducts,
  setCartProducts,
  setCartBadge,
}) => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterOverSearch, setFilterOverSearch] = useState([]);
  const [priceChangeOverFilter, setPriceChangeOverFilter] = useState([]);
  const [sliderValue, setSliderValue] = useState([0, 500]);
  const [mobileFiltersView, setMobileFiltersView] = useState(false);
  const [colorFilter, setColorFilter] = useState([]);
  const [genderFilter, setGenderFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);
  const [priceSliderFilter, setPriceSliderFilter] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const mobileFilterMatches = useMediaQuery("(max-width:426px)");

  useEffect(() => {
    performApiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    performFiltering();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorFilter, genderFilter, typeFilter]);

  useEffect(() => {
    setCartBadge(Number(cartProducts.length));
  }, [cartProducts, setCartBadge]);

  const colorFiltersData = generateColorFiltersFrom(products);
  const genderFiltersData = generateGenderFiltersFrom(products);
  const typeFiltersData = generateTypeFiltersFrom(products);

  const action = (snackbarId) => {
    return (
      <Button
        onClick={() => {
          closeSnackbar(snackbarId);
        }}
      >
        Dismiss
      </Button>
    );
  };

  const performApiCall = async () => {
    setIsLoading(true);
    try {
      const url =
        "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";
      const res = await axios.get(url);
      setProducts(res.data);
      setIsLoading(false);
      return res.data;
    } catch (e) {
      setIsLoading(false);
      setError(true);
      if (e.response && e.response.status === 500) {
        enqueueSnackbar(e.response.data.message, {
          action: (snackbarId) => action(snackbarId),
          variant: "error",
        });
      } else {
        enqueueSnackbar(
          "Could not fetch products. Check that the backend is running, reachable and returns valid JSON.",
          { action: (snackbarId) => action(snackbarId), variant: "error" }
        );
      }
    }
  };

  const FilterButton = styled(IconButton)({
    "@media screen and (min-width:768px)": {
      display: "none",
    },
  });

  const manageSearchData = (event) => {
    if (event.target.value) {
      setSearchData((prevValue) => event.target.value);
    } else {
      setError(false);
      setSearchProducts((prevProducts) => []);
      setFilterOverSearch((prevProducts) => []);
      setFilteredProducts((prevProducts) => []);
    }
    return searchData;
  };

  const performSearch = () => {
    if (searchData.length) {
      const searchResult = products.filter((product) => {
        return Object.values(product)
          .join("")
          .toLowerCase()
          .includes(searchData.toLowerCase());
      });
      if (searchResult.length) {
        setError(false);
        setSearchProducts((prevResult) => searchResult);
      } else {
        setError(true);
      }
      return searchResult;
    }
  };

  const addToCart = (id) => {
    if (cartProducts.some((item) => item.id === id)) {
      enqueueSnackbar(
        "Product already in cart,click on the Cart Page Icon to update the quantity",
        {
          action: (snackbarId) => action(snackbarId),
          variant: "warning",
        }
      );
    } else {
      const filterCartItems = products.filter(
        (product) => product.id === id && product.quantity >= 1
      );

      let cartItems = filterCartItems.map((items) => ({
        ...items,
        quantity: 1,
      }));

      if (cartItems.length) {
        setCartProducts((prevProducts) => [...prevProducts, ...cartItems]);
        enqueueSnackbar("Product Added To Cart", {
          variant: "success",
          autoHideDuration: 1000,
        });
      } else {
        enqueueSnackbar("Product Not Available", {
          action: (snackbarId) => action(snackbarId),
          variant: "error",
        });
      }
    }
  };

  const performFiltering = () => {
    if (!searchProducts.length) {
      let items = [...products];

      if (colorFilter.length) {
        items = items.filter((item) => colorFilter.includes(item.color));
        isItemAvailable(items);
      }

      if (genderFilter.length) {
        items = items.filter((item) => genderFilter.includes(item.gender));
        isItemAvailable(items);
      }

      if (typeFilter.length) {
        items = items.filter((item) => typeFilter.includes(item.type));
        isItemAvailable(items);
      }

      setFilteredProducts(items);
      return items;
    }

    if (searchProducts.length) {
      let items = [...searchProducts];
      if (colorFilter.length) {
        items = items.filter((item) => colorFilter.includes(item.color));
        isItemAvailable(items);
      }

      if (genderFilter.length) {
        items = items.filter((item) => genderFilter.includes(item.gender));
        isItemAvailable(items);
      }

      if (typeFilter.length) {
        items = items.filter((item) => typeFilter.includes(item.type));
        isItemAvailable(items);
      }
      setFilterOverSearch(items);
      return items;
    }
  };

  const isItemAvailable = (items) => {
    if (!items.length) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleFilters = (e) => {
    const { value, checked, name } = e.target;

    if (name === "color" && checked) {
      setColorFilter((prevColor) => [...prevColor, value]);
    } else if (name === "color" && !checked) {
      let filterAfterUnchecking = colorFilter.filter((item) => item !== value);
      setColorFilter(filterAfterUnchecking);
    }

    if (name === "gender" && checked) {
      setGenderFilter((prevGender) => [...prevGender, value]);
    } else if (name === "gender" && !checked) {
      let filterAfterUnchecking = genderFilter.filter((item) => item !== value);
      setGenderFilter(filterAfterUnchecking);
    }
    if (name === "type" && checked) {
      setTypeFilter((prevType) => [...prevType, value]);
    } else if (name === "type" && !checked) {
      let filterAfterUnchecking = typeFilter.filter((item) => item !== value);
      setTypeFilter(filterAfterUnchecking);
    }
  };

  const handlePriceSlider = (event, newValue) => {
    setSliderValue(newValue);
    const { name } = event.target;

    if (
      !searchProducts.length &&
      !filteredProducts.length &&
      !filterOverSearch &&
      newValue.length
    ) {
      const filterData = products.filter(
        (product) =>
          product.price >= newValue[0] && product.price <= newValue[1]
      );
      if (filterData.length) {
        setError(false);
        setPriceSliderFilter((prevData) => filterData);
      } else {
        setError(true);
      }
      return filterData;
    }

    if (!searchProducts.length && filteredProducts.length && newValue.length) {
      console.log("here");
      const filterData = filteredProducts.filter(
        (product) =>
          product.price >= newValue[0] && product.price <= newValue[1]
      );
      console.log(filterData);
      if (filterData.length) {
        setError(false);
        setPriceChangeOverFilter((prevData) => filterData);
      } else {
        setError(true);
      }
      return filterData;
    }

    if (searchProducts.length && !filteredProducts.length && newValue.length) {
      const filterData = searchProducts.filter(
        (product) =>
          product[name] >= newValue[0] && product[name] <= newValue[1]
      );
      if (filterData.length) {
        setError(false);
        setPriceChangeOverFilter((prevProducts) => {
          return [...filterData];
        });
      } else {
        setError(true);
      }
    }

    if (filterOverSearch.length && newValue.length) {
      console.log(filterOverSearch);
      const filterData = filterOverSearch.filter(
        (product) =>
          product[name] >= newValue[0] && product[name] <= newValue[1]
      );

      if (filterData.length) {
        setError(false);
        setPriceChangeOverFilter((prevProducts) => {
          return [...filterData];
        });
      } else {
        setError(true);
      }
    }
  };

  const showMobileFilters = () => {
    if (!mobileFiltersView) {
      document.getElementById("toggleFilters").style.display = "block";
      setMobileFiltersView(true);
    } else {
      document.getElementById("toggleFilters").style.display = "none";
      setMobileFiltersView(false);
    }
  };

  let productsContainer = (
    <Box className="products-container">
      <Grid container spacing={2}>
        {mobileFilterMatches && (
          <Grid item className="filtersMobileView" id="toggleFilters" xs={12}>
            <FiltersView
              colorFiltersData={colorFiltersData}
              genderFiltersData={genderFiltersData}
              typeFiltersData={typeFiltersData}
              handleFilters={handleFilters}
              sliderValue={sliderValue}
              handlePriceSlider={handlePriceSlider}
            />
          </Grid>
        )}
        <Grid item className="filtersDesktopView" sm={4}>
          <FiltersView
            colorFiltersData={colorFiltersData}
            genderFiltersData={genderFiltersData}
            typeFiltersData={typeFiltersData}
            handleFilters={handleFilters}
            sliderValue={sliderValue}
            handlePriceSlider={handlePriceSlider}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box className="productsContainer">
            <Box className="searchBar">
              <Stack direction="row" spacing={0.5}>
                <TextField
                  label="Search For Products"
                  onChange={(event) => {
                    manageSearchData(event);
                  }}
                  variant="standard"
                  fullWidth={true}
                />
                <IconButton
                  aria-label="search"
                  onClick={() => {
                    performSearch();
                  }}
                >
                  <PageviewIcon fontSize="large" sx={{ marginTop: "0.5rem" }} />
                </IconButton>
                <FilterButton
                  className="filterIcon"
                  value={mobileFiltersView}
                  onClick={(e) => {
                    showMobileFilters();
                  }}
                  aria-label="filterIcon"
                >
                  <FilterAltIcon
                    fontSize="large"
                    sx={{ marginTop: "0.5rem" }}
                  />
                </FilterButton>
              </Stack>
            </Box>
            <Box className="productsView">
              <ProductsView
                error={error}
                isLoading={isLoading}
                filterOverSearch={filterOverSearch}
                searchProducts={searchProducts}
                filteredProducts={filteredProducts}
                priceSliderFilter={priceSliderFilter}
                priceChangeOverFilter={priceChangeOverFilter}
                products={products}
                addToCart={addToCart}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  return <div>{productsContainer}</div>;
};

export default Products;
