import "./App.css";
import Header from "./components/Header";
import Products from "./components/Products";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShoppingCart from "./components/ShoppingCart";
import { useState } from "react";

function App() {
  const [cartProducts, setCartProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartBadge, setCartBadge] = useState(null);

  return (
    <div>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header cartBadge={cartBadge} />
        <Routes>
          <Route
            path="/"
            element={
              <Products
                products={products}
                setProducts={setProducts}
                cartProducts={cartProducts}
                setCartProducts={setCartProducts}
                setCartBadge={setCartBadge}
              />
            }
          ></Route>
          <Route
            path="/cart"
            element={
              <ShoppingCart
                products={products}
                cartProducts={cartProducts}
                setCartProducts={setCartProducts}
                setCartBadge={setCartBadge}
              />
            }
          ></Route>
        </Routes>{" "}
      </BrowserRouter>
    </div>
  );
}

export default App;
