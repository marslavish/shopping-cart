import React, { useState } from "react";
import products from "./products";

const ProductCard = (props) => {
  const { title, price, qty, url, id, checkQtyUpdate } = props;

  const [quantity, setQuantity] = useState(qty);

  const handleInputChange = (e) => setQuantity(e.target.value);

  const increment = () => setQuantity(Number(quantity) + 1);

  const decrement = () => setQuantity(Number(quantity) - 1);

  const handleAddToCartClick = () => {
    checkQtyUpdate();
    let currentQty = Number(localStorage.getItem(id)) || 0;
    localStorage.setItem(id, currentQty + Number(quantity));
    setQuantity(1);
  };

  return (
    <div className="product-container col-sm-5 mt-3">
      <img src={url} alt="t-shirt" className="product-img" />
      <p className="product-title">{title}</p>
      <p className="product-price">{price}</p>
      <div className="btn-container">
        <div className="d-flex align-items-center quantity-container">
          <button
            onClick={decrement}
            disabled={!quantity}
            className="btn btn-light decrement-btn"
          >
            &#45;
          </button>
          <input
            type="number"
            className="form-control quantity-input-field"
            id="qty"
            name="qty"
            value={quantity}
            onChange={handleInputChange}
          />
          <button onClick={increment} className="btn btn-light increment-btn">
            &#43;
          </button>
        </div>
        <button
          className="btn btn-dark add-to-cart-btn"
          onClick={handleAddToCartClick}
          disabled={!quantity}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default function Shop({ checkQtyUpdate }) {
  return (
    <div className="row justify-content-evenly">
      {products.map((product) => {
        return (
          <ProductCard
            id={product.id}
            key={product.id}
            qty={product.qty}
            url={product.url}
            title={product.title}
            price={product.price}
            checkQtyUpdate={checkQtyUpdate}
          />
        );
      })}
    </div>
  );
}
