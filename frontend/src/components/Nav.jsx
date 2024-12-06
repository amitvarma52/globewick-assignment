/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../store/store";

const Nav = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(userActions.delete());
    navigate("/"); 
  };

  const [login, setLogin] = useState(true);

  const handleVisibility = (e) => {
    e.preventDefault();
    setLogin(!login);
    navigate(login ? "/signup" : "/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="fs-1 navbar-brand" >
          Globewick
        </Link>
        {!user ? (
          <div>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleVisibility}
            >
              {login ? "Signup" : "Login"}
            </button>
          </div>
        ) : (
          <div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Log-out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
