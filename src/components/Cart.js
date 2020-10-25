import React, { useState, useEffect } from "react";

const CartItem = (props) => {
  const {
    title,
    price,
    qty,
    url,
    id,
    handleDeleteClick,
    checkUpdate,
    checkQtyUpdate,
  } = props;
  const [itemTotal, setItemTotal] = useState(0);
  const [quantity, setQuantity] = useState(qty);

  const handleInputChange = (e) => {
    checkUpdate();
    checkQtyUpdate();
    setQuantity(e.target.value);
    localStorage.setItem(id, e.target.value);
  };

  const increment = () => {
    checkUpdate();
    checkQtyUpdate();
    setQuantity(Number(quantity) + 1);
    localStorage.setItem(id, Number(quantity) + 1);
  };

  const decrement = () => {
    checkUpdate();
    checkQtyUpdate();
    setQuantity(Number(quantity) - 1);
    localStorage.setItem(id, Number(quantity) - 1);
  };

  useEffect(() => {
    setItemTotal("$" + (price.slice(1) * quantity).toFixed(2));
  }, [price, quantity]);

  return (
    <div className="row align-items-center mb-3 mx-auto cart-item-container">
      <img src={url} alt="t-shirt" className="col-sm-2 col-md-1 cart-img" />
      <div className="col-sm-4 col-md-4 px-md-3 px-sm-2">
        <div className="cart-item-title mb-3">{title}</div>
        <div className="cart-item-price text-muted">{price}</div>
      </div>
      <div className="col-sm-3 col-md-3 d-flex justify-content-center cart-quantity-container">
        <button
          onClick={decrement}
          disabled={!quantity}
          className="btn btn-light cart-decrement-btn"
        >
          &#45;
        </button>
        <input
          type="number"
          className="form-control cart-quantity-input-field"
          id="qty"
          name="qty"
          value={quantity}
          onChange={handleInputChange}
        />
        <button
          onClick={increment}
          className="btn btn-light cart-increment-btn"
        >
          &#43;
        </button>
      </div>
      <div className="col-sm-2 col-md-2 cart-item-total text-center">
        {itemTotal}
      </div>
      <div className="col-sm-1 col-md-2 text-center">
        <button
          className="btn btn-outline-dark cart-delete-btn"
          onClick={() => handleDeleteClick(id)}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default function Cart({ checkQtyUpdate, getProducts }) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [total, setTotal] = useState("$0.00");
  const [isUpdated, setIsUpdated] = useState(false);

  const checkUpdate = () => setIsUpdated(!isUpdated);

  const handleDeleteClick = (id) => {
    checkUpdate();
    checkQtyUpdate();
    setSelectedProducts((prevProducts) => {
      return prevProducts.filter((product) => product.id !== id);
    });
    localStorage.removeItem(id);
  };

  const calculateTotal = () => {
    let products = getProducts();
    let totalPrice = products
      .reduce((total, pdt) => total + pdt.price.slice(1) * pdt.qty, 0)
      .toFixed(2);
    setTotal("$" + totalPrice);
  };

  const getSelectedProducts = () => setSelectedProducts(getProducts());

  useEffect(getSelectedProducts, []);

  useEffect(calculateTotal, [isUpdated]);

  return (
    <div>
      <div className="container mt-3">
        <div className="display-4 my-order">My order</div>
        <div>
          {selectedProducts.map((product) => {
            return (
              <CartItem
                title={product.title}
                price={product.price}
                qty={product.qty}
                url={product.url}
                key={product.id}
                id={product.id}
                checkUpdate={checkUpdate}
                checkQtyUpdate={checkQtyUpdate}
                handleDeleteClick={handleDeleteClick}
              />
            );
          })}
        </div>
        <div className="d-flex justify-content-between mx-auto mt-5 total-price">
          <p className="h4">Total</p>
          <p className="h4">{total}</p>
        </div>
        <button className="btn btn-dark btn-block mx-auto mt-2 mb-5 checkout-btn">
          Checkout
        </button>
      </div>
    </div>
  );
}
