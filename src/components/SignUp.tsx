import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Form } from "react-bootstrap";
import { signUpRequestApi } from "../services/userApi.service";

export interface ISignUpData {
  name: string;
  email: string;
  password: string;
  confPassword: string;
}

export interface SignUpSuccess {
  userId: number;
}

export interface SignUpFailure {
  message: string;
}

const emptySignUpData: ISignUpData = {
  name: "",
  email: "",
  password: "",
  confPassword: "",
};

export const SignUp = () => {
  const [signUpData, setSignUpData] = useState<ISignUpData>(emptySignUpData);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setSignUpData(emptySignUpData);
  };

  const handleSignUp = async () => {
    if (!passwordsAreEqual()) {
      alert("Passwords are not equal.");
      return;
    }

    const res = await signUpRequestApi(signUpData);

    //@ts-ignore
    if (res.message) {
      //@ts-ignore
      alert(`Error to sign up: ${res.message}`);
      return;
    }

    navigate("/login");
  };

  const passwordsAreEqual = (): boolean => {
    return signUpData.password === signUpData.confPassword;
  };

  return (
    <div className="container-fluid">
      <NavLink to={"/home"} className="btn btn-outline-primary w-auto">
        {"<< Back"}
      </NavLink>

      <div className="mx-auto border rounded my-mw-600">
        <h3 className="text-center text-primary">Sign Up</h3>

        <Form
          className="my-2 p-2"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSignUp();
          }}
        >
          <div className="row my-2">
            <Form.Label className="col-12 col-md-4 my-text-right">
              {"Name: "}
            </Form.Label>
            <Form.Control
              className="col-12 col-md-8 w-auto mx-3"
              required={true}
              type={"text"}
              name={"name"}
              value={signUpData.name}
              onChange={handleChange}
              autoFocus={true}
            />
          </div>

          <div className="row my-2">
            <Form.Label className="col-12 col-md-4 my-text-right">
              {"Email: "}
            </Form.Label>
            <Form.Control
              className="col-12 col-md-8 w-auto mx-3"
              required={true}
              type={"email"}
              name={"email"}
              value={signUpData.email}
              onChange={handleChange}
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
              value={signUpData.password}
              onChange={handleChange}
            />
          </div>

          <div className="row my-2">
            <Form.Label className="col-12 col-md-4 my-text-right">
              {"Confirme Password: "}
            </Form.Label>
            <Form.Control
              className="col-12 col-md-8 w-auto mx-3"
              required={true}
              type={"password"}
              name={"confPassword"}
              value={signUpData.confPassword}
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
              value={"Sign Up"}
              className={"btn btn-primary w-auto mx-2"}
            />
          </div>
        </Form>
      </div>
    </div>
  );
};
