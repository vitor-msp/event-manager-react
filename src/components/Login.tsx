import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

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

  useEffect(() => {
    // dispatch(getUserDataRequest());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    // dispatch(loginRequest());
    navigate("/month");
  };

  return (
    <div className="container-fluid">
      <div className="w-50 mx-auto border rounded">
        <h3 className="text-center text-primary">Login</h3>

        <Form
          className="my-2 p-2"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleLogin();
          }}
        >
          <div className="d-flex justify-content-center my-2">
            <Form.Label className="">{"Email: "}</Form.Label>
            <Form.Control
              className="w-auto mx-3"
              required={true}
              type={"email"}
              name={"email"}
              value={loginData.email}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex justify-content-center my-2">
            <Form.Label className="">{"Password: "}</Form.Label>
            <Form.Control
              className="w-auto mx-3"
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
