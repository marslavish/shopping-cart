import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import productsList from "./components/products";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import "./styles/main.css";

function App() {
  const [isUpdated, setIsUpdated] = useState(false);

  const [totalQty, setTotalQty] = useState(0);

  const checkQtyUpdate = () => setIsUpdated(!isUpdated);

  const getProducts = () => {
    let products = [];
    let allProducts = JSON.parse(JSON.stringify(productsList));
    allProducts.forEach((product) => {
      let productQty = localStorage.getItem(product.id);
      if (productQty) {
        product.qty = productQty;
        products.push(product);
      }
    });
    return products;
  };

  const calculateTotalQty = () => {
    let products = getProducts();
    let totalQty = products.reduce((total, pdt) => total + Number(pdt.qty), 0);
    setTotalQty(totalQty);
  };

  useEffect(calculateTotalQty, [isUpdated]);

  return (
    <Router>
      <div>
        <Nav quantity={totalQty} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/shop">
            <Shop checkQtyUpdate={checkQtyUpdate} />
          </Route>
          <Route path="/cart">
            <Cart checkQtyUpdate={checkQtyUpdate} getProducts={getProducts} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
