import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActions } from "@mui/material";
import { Button } from "@mui/material";

const ProductCard = ({ product, addToCart }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={product.imageURL}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body1" fontWeight={600} color="text.secondary">
          Rs {product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          className="button"
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => {
            addToCart(product.id);
          }}
        >
          ADD TO CART
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
