import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { loginRequest } from "../store/ducks/currentUser/currentUser.middleware";
import { ILoginRequest } from "../store/ducks/currentUser/currentUser.types";
import "./Login.css";
import { userIsLoggedIn } from "../services/user.service";

export interface ILogin {
  email: string;
  password: string;
}

export const Login = () => {
  const [loginData, setLoginData] = useState<ILogin>({
    email: "",
    password: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.currentUser);

  useEffect(() => {
    if (userIsLoggedIn(currentUser)) navigate("/month");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setLoginData({ email: "", password: "" });
  };

  const handleLogin = () => {
    dispatch(loginRequest(loginData));
  };

  return (
    <div className="container-fluid">
      <div className="mx-auto border rounded my-mw-600">
        <h3 className="text-center text-primary">Login</h3>

        <Form
          className="my-2 p-2"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleLogin();
          }}
        >
          <div className="row my-2">
            <Form.Label className="col-12 col-md-4 my-text-right">
              {"Email: "}
            </Form.Label>
            <Form.Control
              className="col-12 col-md-8 w-auto mx-3"
              required={true}
              type={"email"}
              name={"email"}
              value={loginData.email}
              onChange={handleChange}
              autoFocus={true}
            />
          </div>

          <div className="row my-2">
            <Form.Label className="col-12 col-md-4 my-text-right">
              {"Password: "}
            </Form.Label>
            <Form.Control
              className="col-12 col-md-8 w-auto mx-3"
              required={true}
              type={"password"}
              name={"password"}
              value={loginData.password}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex justify-content-center">
            <input
              type={"reset"}
              value={"Clean"}
              onClick={handleReset}
              className={"btn btn-outline-primary w-auto mx-2"}
            />

            <input
              type={"submit"}
              value={"Login"}
              className={"btn btn-primary w-auto mx-2"}
            />
          </div>
        </Form>
      </div>
    </div>
  );
};
