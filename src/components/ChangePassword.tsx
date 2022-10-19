import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { changePasswordRequest } from "../services/user.service";

export interface IChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface IChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confNewPassword: string;
}

const emptyChangePasswordData: IChangePasswordData = {
  currentPassword: "",
  newPassword: "",
  confNewPassword: "",
};

export const ChangePassword = () => {
  const [changePasswordData, setChangePasswordData] =
    useState<IChangePasswordData>(emptyChangePasswordData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangePasswordData({
      ...changePasswordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setChangePasswordData(emptyChangePasswordData);
  };

  const handleChangePassword = async () => {
    if (!passwordsAreEqual()) {
      alert("Passwords are not equal.");
      return;
    }

    const changePasswordRequestData: IChangePasswordRequest = {
      currentPassword: changePasswordData.currentPassword,
      newPassword: changePasswordData.newPassword,
    };

    const passwordChanged = await changePasswordRequest(
      changePasswordRequestData
    );

    if (passwordChanged) handleReset();
  };

  const passwordsAreEqual = (): boolean => {
    return (
      changePasswordData.newPassword === changePasswordData.confNewPassword
    );
  };

  return (
    <Form
      className="my-2 p-2"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleChangePassword();
      }}
    >
      <div className="row my-2">
        <Form.Label className="col-12 col-md-4 my-text-right">
          {"Current Password: "}
        </Form.Label>
        <Form.Control
          className="col-12 col-md-8 w-auto mx-3"
          required={true}
          type={"password"}
          name={"currentPassword"}
          value={changePasswordData.currentPassword}
          onChange={handleChange}
        />
      </div>

      <div className="row my-2">
        <Form.Label className="col-12 col-md-4 my-text-right">
          {"New Password: "}
        </Form.Label>
        <Form.Control
          className="col-12 col-md-8 w-auto mx-3"
          required={true}
          type={"password"}
          name={"newPassword"}
          value={changePasswordData.newPassword}
          onChange={handleChange}
        />
      </div>

      <div className="row my-2">
        <Form.Label className="col-12 col-md-4 my-text-right">
          {"Confirm New Password: "}
        </Form.Label>
        <Form.Control
          className="col-12 col-md-8 w-auto mx-3"
          required={true}
          type={"password"}
          name={"confNewPassword"}
          value={changePasswordData.confNewPassword}
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
          value={"Save new password"}
          className={"btn btn-primary w-auto mx-2"}
        />
      </div>
    </Form>
  );
};
