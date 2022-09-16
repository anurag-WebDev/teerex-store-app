import { Box, Grid, Stack, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";

import "./Header.css";

const Header = ({ cartBadge }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box className="header">
          <Box className="header-Title">
            <Button onClick={() => window.location.reload()}>
              <Typography variant="h4" fontFamily="fantasy">
                TeeRex Store
              </Typography>
            </Button>
          </Box>
          <Box className="header-Products">
            <Stack direction="row" spacing={5} sx={{ alignItems: "center" }}>
              <Typography variant="h5">
                <Link to="/">Products</Link>
              </Typography>
              <Link
                to={{
                  pathname: "/cart",
                }}
              >
                <Badge badgeContent={cartBadge} color="primary">
                  <ShoppingCartIcon fontSize="large" padding="1rem" />
                </Badge>
              </Link>
            </Stack>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Header;
