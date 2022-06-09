import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

export interface IUser {
  email: string;
  name: string;
}

export const MyAccount = () => {
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const [userData, setUserData] = useState<IUser>({ email: "", name: "" });
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // dispatch(getUserDataRequest());
  }, []);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, name: e.target.value });
  };

  const handleUpdateUserData = () => {
    // dispatch(updateUserDataRequest());
  };

  return (
    <div className="container-fluid">
      <NavLink to={"/month"} className="btn btn-outline-primary w-auto">
        {"<< Back"}
      </NavLink>

      <div className="w-50 mx-auto border rounded">
        <h3 className="text-center text-primary">My Account</h3>

        <Form
          className="my-2 p-2"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleUpdateUserData();
          }}
        >
          <div className="d-flex justify-content-center my-2">
            <Form.Label className="">{"Name: "}</Form.Label>
            <Form.Control
              className="w-auto mx-3"
              required={true}
              disabled={false}
              type={"text"}
              value={userData.name}
              onChange={handleChangeName}
            />
          </div>

          <div className="d-flex justify-content-center my-2">
            <Form.Label className="">{"Email: "}</Form.Label>
            <Form.Control
              className="w-auto mx-3"
              required={true}
              disabled={true}
              type={"email"}
              value={userData.email}
            />
          </div>

          <div className="d-flex justify-content-center">
            <input
              type={"submit"}
              value={"Save"}
              className={"btn btn-primary w-auto"}
            />
          </div>
        </Form>
      </div>
    </div>
  );
};
