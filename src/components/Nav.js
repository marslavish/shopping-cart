import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav({ quantity }) {
  return (
    <ul className="nav row mt-3 d-flex align-items-center">
      <li className="nav-item col-4 pl-5 pb-2">
        <NavLink to="/" className="nav-link home" activeClassName="acitve">
          Home.
        </NavLink>
      </li>
      <li className="nav-item col-5">
        <NavLink to="/shop" className="nav-link" activeClassName="acitve">
          Shop
        </NavLink>
      </li>
      <li className="nav-item col-3 pl-md-5">
        <NavLink to="/cart" className="nav-link" activeClassName="acitve">
          Cart<span className="px-1 ml-1">{quantity}</span>
        </NavLink>
      </li>
    </ul>
  );
}
