import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";

const EmptyCart = () => {
  let emptyCart = (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert
        severity="warning"
        action={<Link to="/">Go To Products Page.</Link>}
      >
        <Typography variant="h6">
          No Products Added to Cart, Add Products From Products Page.
        </Typography>
      </Alert>
    </Stack>
  );
  return emptyCart;
};

export default EmptyCart;
