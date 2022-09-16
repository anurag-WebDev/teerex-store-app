import { Box, Grid } from "@mui/material";
import { SentimentDissatisfied } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import ProductCard from "./ProductCard";
import "./ProductsView.css";

const ProductsView = ({
  error,
  isLoading,
  filterOverSearch,
  searchProducts,
  filteredProducts,
  priceSliderFilter,
  priceChangeOverFilter,
  products,
  addToCart,
}) => {
  let productsList;
  if (error) {
    productsList = (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} className="loading">
          <SentimentDissatisfied />
          <p>No Products Found</p>
        </Grid>
      </Box>
    );
  } else if (isLoading) {
    productsList = (
      <Box sx={{ flexGrow: 1 }} className="loading">
        <CircularProgress />
        <p>Loading products....</p>
      </Box>
    );
  } else if (priceChangeOverFilter.length) {
    productsList = (
      <Grid container spacing={2}>
        {priceChangeOverFilter.map((product, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <ProductCard product={product} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    );
  } else if (filterOverSearch.length) {
    productsList = (
      <Grid container spacing={2}>
        {filterOverSearch.map((product) => (
          <Grid item xs={12} sm={4} key={product.id}>
            <ProductCard product={product} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    );
  } else if (searchProducts.length) {
    productsList = (
      <Grid container spacing={2}>
        {searchProducts.map((product) => (
          <Grid item xs={12} sm={4} key={product.id}>
            <ProductCard product={product} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    );
  } else if (filteredProducts.length) {
    productsList = (
      <Grid container spacing={2}>
        {filteredProducts.map((product, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <ProductCard product={product} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    );
  } else if (priceSliderFilter.length) {
    productsList = (
      <Grid container spacing={2}>
        {priceSliderFilter.map((product, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <ProductCard product={product} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    );
  } else {
    productsList = (
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={4} key={product.id}>
            <ProductCard product={product} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    );
  }
  return productsList;
};

export default ProductsView;
