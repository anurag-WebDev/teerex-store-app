import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import "./ShoppingCart.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import EmptyCart from "./EmptyCart";
import ManageItemsQuantity from "./ManageItemsQuantity";
import { useEffect } from "react";

const ShoppingCart = ({
  products,
  cartProducts,
  setCartProducts,
  setCartBadge,
}) => {
  useEffect(() => {
    setCartBadge(Number(cartProducts.length));
  }, [cartProducts]);

  const { enqueueSnackbar } = useSnackbar();

  const getTotalCartValue = (items) => {
    let totalPrice = 0;
    items.map((item) => (totalPrice += item.quantity * item.price));
    return Number(totalPrice);
  };

  const handleQuantity = (id, quantity) => {
    if (quantity <= 0) {
      deleteItem(id);
      return;
    }
    const availableQuantity = products.some(
      (item) => item.id === id && item.quantity >= quantity
    );
    if (availableQuantity === true) {
      const updatedCartProducts = cartProducts.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      );
      setCartProducts((prevItems) => updatedCartProducts);
    } else {
      enqueueSnackbar("Maximum Order Quantity Reached", {
        variant: "warning",
        autoHideDuration: 1200,
      });
    }
  };

  const deleteItem = (id) => {
    const updatedItems = cartProducts.filter((item) => item.id !== id);
    // console.log(updatedItems);
    setCartProducts((prevItems) => updatedItems);
  };
  return (
    <Box>
      <Grid container spacing={2} className="cart-container">
        <Typography variant="h5">Shopping Cart</Typography>
        {cartProducts.length ? (
          <Grid item xs={12}>
            {cartProducts.map((item, index) => (
              <Box className="cart-items" key={index}>
                <Box className="image-container">
                  <img
                    src={item.imageURL}
                    alt={item.name}
                    width="100%"
                    height="100%"
                  />
                </Box>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                  padding="1rem"
                >
                  <Box display="flex" flexDirection="column" paddingX="1rem">
                    <Typography variant="h7" fontWeight={600}>
                      {item.name}
                    </Typography>

                    <Box>
                      <CurrencyRupeeIcon fontSize="small" />
                      <Typography variant="h7" fontWeight={600}>
                        {item.price}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <ManageItemsQuantity
                      value={item.quantity}
                      handleAdd={() => {
                        handleQuantity(item.id, item.quantity + 1);
                      }}
                      handleDelete={() => {
                        handleQuantity(item.id, item.quantity - 1);
                      }}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    onClick={() => {
                      deleteItem(item.id);
                    }}
                  >
                    Delete
                  </Button>
                </Stack>
              </Box>
            ))}
            <Box className="cart-value">
              <Typography variant="h6" fontWeight={600}>
                Total Cart Value:
              </Typography>{" "}
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  <CurrencyRupeeIcon fontSize="small" />{" "}
                  {getTotalCartValue(cartProducts)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ) : (
          <EmptyCart />
        )}
      </Grid>
    </Box>
  );
};

export default ShoppingCart;
