import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";

export const MyAccount = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // dispatch(getUserDataRequest());
  }, []);

  return (
    <div className="row my-2">
      <Form.Label className="col-2">{"Creator: "}</Form.Label>
      <Form.Control
        className="col-10 w-auto mx-3"
        required={true}
        disabled={true}
        type={"email"}
        // value={creatorEmail ?? ""}
        // isValid={showValidation === true && isValid === true ? true : false}
        // isInvalid={
        //   showValidation === true && isValid === false ? true : false
        // }
      />
    </div>
  );
};
