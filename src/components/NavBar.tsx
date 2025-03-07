import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../reducers/userReducer";
import { Link, navigate } from "@reach/router";
import { Row, Col, Button } from "react-bootstrap";
import { User } from "../types";
import faker from "faker";

export default function Navbar() {
  const user = useSelector(selectUser) as User;
  const dispatch = useDispatch();

  const logout = () => {
    axios.post("/auth/logout");
    dispatch(setUser(null));
    navigate("/");
  };

  const getName = () => {
    if (user.is_admin) {
      return "Admin " + user.name;
    } else if (user.is_ta) {
      return "TA " + user.name;
    } else if (user.is_instructor) {
      return "Instructor " + user.name;
    }

    return user.name;
  };

  return (
    <div className="dash-navbar">
      <Row className="align-items-center">
        <Col>
          <img
            src="https://cdn.fakercloud.com/avatars/silv3rgvn_128.jpg"
            className="b"
            alt="profile"
          />
        </Col>
        <Col>
          <h3 className="text-right">Welcome, {getName()} </h3>
          <p className="text-right">
            <Link to="/dashboard">
              <Button variant="primary">Dashboard</Button>
            </Link>
            <Button variant="danger" onClick={logout}>
              Logout
            </Button>
          </p>
        </Col>
      </Row>
    </div>
  );
}
